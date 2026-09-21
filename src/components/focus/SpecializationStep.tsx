import React from 'react';
import { Specialization } from '@/data/specializations';
import { MAX_TARGETED_SPECIALIZATIONS } from '@/utils/focusSelection';

interface SpecializationStepProps {
  specializations: Specialization[];
  selectedIds: string[];
  onToggle: (specializationId: string) => void;
}

/**
 * L'axe où se concentrer, sous les débouchés retenus. Rien ici n'est un diplôme :
 * ce sont nos propres axes de compétence, reliés aux séances AliTché qui les
 * travaillent — c'est ce lien qui les rend choisissables.
 */
export const SpecializationStep: React.FC<SpecializationStepProps> = ({
  specializations,
  selectedIds,
  onToggle,
}) => {
  const full = selectedIds.length >= MAX_TARGETED_SPECIALIZATIONS;

  return (
    <div className="mt-3 space-y-2">
      {specializations.map((specialization) => {
        const checked = selectedIds.includes(specialization.id);
        const locked = full && !checked;

        return (
          <label
            key={specialization.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
              checked
                ? 'border-primary-300 bg-primary-50'
                : locked
                  ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
                  : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 flex-shrink-0 accent-primary-600"
              checked={checked}
              disabled={locked}
              onChange={() => onToggle(specialization.id)}
            />
            <span className="min-w-0 flex-1">
              <span className="font-medium text-gray-900">{specialization.label}</span>
              <span className="mt-1 block text-sm leading-6 text-gray-600">{specialization.note}</span>
              <span className="mt-1 block text-xs text-gray-500">
                {specialization.moduleIds.length} séance(s) AliTché pour cet axe
              </span>
            </span>
          </label>
        );
      })}

      {full && (
        <p className="text-xs text-gray-500">
          {MAX_TARGETED_SPECIALIZATIONS} axes déjà retenus : c'est déjà deux parcours à mener.
        </p>
      )}
    </div>
  );
};
