import React, { useState } from 'react';
import { Question, QuestionOption } from '@/types/test';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOptions: string[]) => void;
  currentAnswer?: string[];
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  currentAnswer = [],
}) => {
  const [selected, setSelected] = useState<string[]>(currentAnswer);

  const handleOptionClick = (optionId: string) => {
    if (question.type === 'single') {
      setSelected([optionId]);
    } else {
      const maxSelections = question.maxSelections || question.options.length;
      
      if (selected.includes(optionId)) {
        setSelected(selected.filter(id => id !== optionId));
      } else {
        if (selected.length >= maxSelections) {
          const newSelected = [...selected.slice(1), optionId];
          setSelected(newSelected);
        } else {
          setSelected([...selected, optionId]);
        }
      }
    }
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onAnswer(selected);
    }
  };

  const isSelected = (optionId: string) => selected.includes(optionId);
  const canSubmit = selected.length > 0;

  return (
    <Card padding="lg" className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 leading-relaxed">
            {question.text}
          </h2>
          {question.type === 'multiple' && question.maxSelections && (
            <p className="mt-2 text-sm text-gray-500">
              Sélectionnez jusqu'à {question.maxSelections} réponse{question.maxSelections > 1 ? 's' : ''} 
              {selected.length > 0 && ` (${selected.length}/${question.maxSelections} sélectionnée${selected.length > 1 ? 's' : ''})`}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              isSelected={isSelected(option.id)}
              onClick={() => handleOptionClick(option.id)}
            />
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            size="lg"
            className="min-w-[200px]"
          >
            Continuer
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface OptionButtonProps {
  option: QuestionOption;
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-all duration-200
        ${isSelected
          ? 'border-primary-500 bg-primary-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {isSelected ? (
            <CheckCircle2 className="w-6 h-6 text-primary-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </div>
        <span className={`flex-1 text-base leading-relaxed ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
          {option.text}
        </span>
      </div>
    </button>
  );
};
