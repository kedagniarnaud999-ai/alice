import React, { useEffect, useState } from 'react';
import { Question, QuestionOption } from '@/types/test';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOptions: string[]) => void;
  currentAnswer?: string[];
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  currentAnswer,
  disabled = false,
}) => {
  const [selected, setSelected] = useState<string[]>(currentAnswer ?? []);

  useEffect(() => {
    setSelected(currentAnswer ?? []);
  }, [currentAnswer, question.id]);

  const handleOptionChange = (optionId: string) => {
    if (disabled) {
      return;
    }

    if (question.type === 'single') {
      setSelected([optionId]);
      return;
    }

    const maxSelections = question.maxSelections ?? question.options.length;

    setSelected((previous) => {
      if (previous.includes(optionId)) {
        return previous.filter((id) => id !== optionId);
      }

      if (previous.length >= maxSelections) {
        return [...previous.slice(1), optionId];
      }

      return [...previous, optionId];
    });
  };

  const canSubmit = selected.length > 0;

  const handleSubmit = () => {
    if (!canSubmit || disabled) {
      return;
    }

    onAnswer(selected);
  };

  const isSelected = (optionId: string) => selected.includes(optionId);

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

        <fieldset className="space-y-3" disabled={disabled}>
          <legend className="sr-only">Choix de réponse</legend>
          {question.options.map((option) => (
            <OptionControl
              key={option.id}
              option={option}
              questionId={question.id}
              type={question.type}
              isSelected={isSelected(option.id)}
              onChange={() => handleOptionChange(option.id)}
              disabled={disabled}
            />
          ))}
        </fieldset>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || disabled}
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

interface OptionControlProps {
  option: QuestionOption;
  questionId: string;
  type: Question['type'];
  isSelected: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const OptionControl: React.FC<OptionControlProps> = ({
  option,
  questionId,
  type,
  isSelected,
  onChange,
  disabled = false,
}) => {
  const inputType = type === 'single' ? 'radio' : 'checkbox';

  return (
    <label
      className={`
        block w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all duration-200
        ${isSelected
          ? 'border-primary-500 bg-primary-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <input
          type={inputType}
          name={questionId}
          value={option.id}
          checked={isSelected}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <span className="mt-0.5 flex-shrink-0" aria-hidden="true">
          {isSelected ? (
            <CheckCircle2 className="w-6 h-6 text-primary-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </span>
        <span className={`flex-1 text-base leading-relaxed ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
          {option.text}
        </span>
      </div>
    </label>
  );
};
