import React from 'react';
import { Check } from 'lucide-react';
import {
  OccupationMatch,
  OCCUPATION_BAND_BADGE,
  OCCUPATION_BAND_LABEL,
} from '@/utils/occupationMatcher';
import { Badge } from '@/components/ui/Badge';
import { FunctionalDomainId } from '@/types/test';
import { MAX_TARGETED_OPENINGS } from '@/utils/focusSelection';

interface OccupationStepProps {
  domainId: FunctionalDomainId;
  matches: OccupationMatch[];
  selectedIds: string[];
  onToggle: (occupationId: string) => void;
}

/**
 * Les débouchés que la fiche du domaine montrait, en cases à cocher : la liste est
 * la même, la sélection ne peut donc pas porter sur une voie que la fiche a cachée.
 */
export const OccupationStep: React.FC<OccupationStepProps> = ({
  domainId,
  matches,
  selectedIds,
  onToggle,
}) => {
  const full = selectedIds.length >= MAX_TARGETED_OPENINGS;

  return (
    <div className="mt-3 space-y-2">
      {matches.map((match) => {
        const checked = selectedIds.includes(match.occupation.id);
        const locked = full && !checked;
        const core = match.cores.find((entry) => entry.id === domainId);

        return (
          <label
            key={match.occupation.id}
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
              onChange={() => onToggle(match.occupation.id)}
            />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-gray-900">{match.occupation.title}</span>
                <Badge variant={OCCUPATION_BAND_BADGE[match.band]} size="sm">
                  {OCCUPATION_BAND_LABEL[match.band]}
                </Badge>
              </span>
              <span className="mt-1 block text-sm text-gray-600">
                {core
                  ? `Vous en êtes à ${core.score}% sur ce domaine.`
                  : 'Ce domaine y sert de terrain, sur une autre compétence clé.'}
              </span>
            </span>
          </label>
        );
      })}

      {full && (
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <Check className="h-3.5 w-3.5 text-primary-600" />
          {MAX_TARGETED_OPENINGS} débouchés déjà retenus : décochez-en un pour en remplacer un autre.
        </p>
      )}
    </div>
  );
};
