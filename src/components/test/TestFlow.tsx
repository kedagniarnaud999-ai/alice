import React, { useEffect, useMemo, useState } from 'react';
import { TestResponse, ProfileResult, Question } from '@/types/test';
import { QuestionCard } from './QuestionCard';
import { SectionHeader } from './SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, Save, CheckCircle, ArrowRight } from 'lucide-react';
import { storageManager } from '@/utils/storageManager';
import { TestAnalyzer, getVisibleQuestions } from '@/utils/testAnalyzer';
import { profileService } from '@/services/profile.api';

interface TestFlowProps {
  onComplete: (responses: TestResponse[], result?: ProfileResult) => void;
}

interface PendingProgress {
  currentIndex: number;
  responses: TestResponse[];
}

/** Keep only answers that belong to the currently-visible question set. */
function pruneToVisible(responses: TestResponse[]): TestResponse[] {
  const visibleIds = new Set(getVisibleQuestions(responses).map((q) => q.id));
  return responses.filter((r) => visibleIds.has(r.questionId) && r.selectedOptions.length > 0);
}

export const TestFlow: React.FC<TestFlowProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [pending, setPending] = useState<PendingProgress | null>(null);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const savedProgress = storageManager.loadTestProgress();
    if (savedProgress && savedProgress.responses.length > 0) {
      setPending(savedProgress);
    }
  }, []);

  useEffect(() => {
    if (responses.length > 0) {
      storageManager.saveTestProgress(currentIndex, responses);
      setShowSavedMessage(true);
      const timer = setTimeout(() => setShowSavedMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, responses]);

  const visibleQuestions = useMemo(() => getVisibleQuestions(responses), [responses]);
  const safeIndex = Math.min(currentIndex, Math.max(visibleQuestions.length - 1, 0));
  const currentQuestion: Question | undefined = visibleQuestions[safeIndex];
  const totalQuestions = visibleQuestions.length;
  const isLastQuestion = safeIndex === totalQuestions - 1;
  const previousQuestion = safeIndex > 0 ? visibleQuestions[safeIndex - 1] : null;

  const finish = async (finalResponses: TestResponse[]) => {
    storageManager.clearTestProgress();
    setIsSaving(true);
    setSaveError(null);

    const analyzer = new TestAnalyzer(finalResponses);
    const result = analyzer.analyze();

    try {
      try {
        await profileService.saveTestResponses(finalResponses);
        await profileService.saveProfile(result);
      } catch (error) {
        console.error('Erreur sauvegarde backend:', error);
        setSaveError("Résultat conservé localement pour l'instant");
      }
      storageManager.saveProfileResult(result);
      onComplete(finalResponses, result);
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      setSaveError('Une erreur est survenue. Réessayez.');
      storageManager.saveProfileResult(result);
      onComplete(finalResponses, result);
    } finally {
      setIsSaving(false);
    }
  };

  const goToNext = (nextResponses: TestResponse[]) => {
    const pruned = pruneToVisible(nextResponses);
    setResponses(pruned);
    setCurrentIndex((index) => index + 1);
  };

  const handleAnswer = (selectedOptions: string[]) => {
    if (!currentQuestion) return;
    const updated = responses.filter((r) => r.questionId !== currentQuestion.id);
    updated.push({ questionId: currentQuestion.id, selectedOptions });

    if (isLastQuestion) {
      const finalResponses = pruneToVisible(updated);
      finish(finalResponses);
    } else {
      goToNext(updated);
    }
  };

  const handleSkip = () => {
    if (isLastQuestion) {
      finish(responses);
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const resumeSaved = () => {
    if (!pending) return;
    setResponses(pending.responses);
    setCurrentIndex(pending.currentIndex);
    setPending(null);
  };

  const restartFresh = () => {
    storageManager.clearTestProgress();
    setPending(null);
    setResponses([]);
    setCurrentIndex(0);
  };

  if (pending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="mx-auto max-w-2xl">
          <Card padding="lg" className="border border-primary-200 bg-white">
            <h2 className="text-xl font-semibold text-gray-900">Reprendre votre test ?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Nous avons retrouvé une progression sauvegardée ({pending.responses.length} réponse
              {pending.responses.length > 1 ? 's' : ''}). Reprenez où vous étiez, ou repartez de zéro.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={resumeSaved} size="md" className="flex items-center gap-2">
                Reprendre où j’en étais
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={restartFresh} variant="ghost" size="md">
                Recommencer depuis le début
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const currentResponse = responses.find((r) => r.questionId === currentQuestion.id);
  const showSectionHeader =
    currentQuestion.section && (!previousQuestion || previousQuestion.section !== currentQuestion.section);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <ProgressBar current={safeIndex + 1} total={totalQuestions} className="flex-1" />
            <div className="ml-4 flex items-center gap-2">
              {isSaving && (
                <div className="text-sm text-blue-600 animate-pulse">Sauvegarde...</div>
              )}
              {showSavedMessage && !isSaving && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Save className="w-4 h-4" />
                  <span>Sauvegardé</span>
                </div>
              )}
              {saveError && (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{saveError}</span>
                </div>
              )}
            </div>
          </div>

          {safeIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-gray-600"
              disabled={isSaving}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retour
            </Button>
          )}
        </div>

        {showSectionHeader && currentQuestion.section && currentQuestion.sectionDescription && (
          <SectionHeader
            title={currentQuestion.section}
            description={currentQuestion.sectionDescription}
          />
        )}

        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswer={currentResponse?.selectedOptions}
          disabled={isSaving}
        />

        {currentQuestion.optional && (
          <div className="mt-3 flex justify-center">
            <Button variant="ghost" size="sm" onClick={handleSkip} disabled={isSaving}>
              Cette question ne me concerne pas — passer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
