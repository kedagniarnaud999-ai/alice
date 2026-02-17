import React, { useState, useEffect } from 'react';
import { TestResponse } from '@/types/test';
import { orientationQuestions } from '@/data/questions';
import { QuestionCard } from './QuestionCard';
import { SectionHeader } from './SectionHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Save } from 'lucide-react';
import { storageManager } from '@/utils/storageManager';

interface TestFlowProps {
  onComplete: (responses: TestResponse[]) => void;
}

export const TestFlow: React.FC<TestFlowProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    const savedProgress = storageManager.loadTestProgress();
    if (savedProgress && savedProgress.responses.length > 0) {
      const shouldResume = window.confirm(
        'Vous avez une progression sauvegardée. Voulez-vous reprendre où vous vous êtes arrêté ?'
      );
      if (shouldResume) {
        setCurrentIndex(savedProgress.currentIndex);
        setResponses(savedProgress.responses);
      } else {
        storageManager.clearTestProgress();
      }
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

  const currentQuestion = orientationQuestions[currentIndex];
  const totalQuestions = orientationQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const currentResponse = responses.find(r => r.questionId === currentQuestion.id);

  const previousQuestion = currentIndex > 0 ? orientationQuestions[currentIndex - 1] : null;
  const showSectionHeader = currentQuestion.section && 
    (!previousQuestion || previousQuestion.section !== currentQuestion.section);

  const handleAnswer = (selectedOptions: string[]) => {
    const newResponse: TestResponse = {
      questionId: currentQuestion.id,
      selectedOptions,
    };

    const updatedResponses = responses.filter(r => r.questionId !== currentQuestion.id);
    updatedResponses.push(newResponse);
    setResponses(updatedResponses);

    if (isLastQuestion) {
      storageManager.clearTestProgress();
      onComplete(updatedResponses);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <ProgressBar
              current={currentIndex + 1}
              total={totalQuestions}
              className="flex-1"
            />
            {showSavedMessage && (
              <div className="ml-4 flex items-center gap-2 text-sm text-green-600">
                <Save className="w-4 h-4" />
                <span>Sauvegardé</span>
              </div>
            )}
          </div>
          
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-gray-600"
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
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswer={currentResponse?.selectedOptions}
        />
      </div>
    </div>
  );
};
