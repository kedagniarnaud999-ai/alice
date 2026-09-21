import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { Specialization, SPECIALIZATIONS_BY_ID } from '@/data/specializations';
import { CrossOccupation, OCCUPATIONS_BY_ID } from '@/data/occupations';
import { domainOpenings } from '@/utils/domainFocus';
import {
  MAX_TARGETED_OPENINGS,
  specializationsInPlay,
  toggleOccupation,
  toggleSpecialization,
  validateFocus,
} from '@/utils/focusSelection';
import { ProfileResult, Targeting } from '@/types/test';
import { OccupationStep } from './OccupationStep';
import { SpecializationStep } from './SpecializationStep';

interface FocusFlowProps {
  result: ProfileResult;
  draft: Targeting;
  onChange: (draft: Targeting) => void;
  /** Retour à la fiche du domaine phare : relire avant de changer d'avis. */
  onBack: () => void;
  onConfirm: (draft: Targeting) => void;
  /** Le destin change entre le membre et l'invité : le bouton doit le dire. */
  confirmLabel?: string;
  /** Sortie de secours : le parcours sur les domaines du test, sans ciblage. */
  onBuildOnDomains: () => void;
}

/**
 * L'engagement. Le domaine est déjà choisi, les débouchés et l'axe le sont à
 * moitié : tout arrive pré-coché, et « Ajuster » suffit pour reprendre. Un écran,
 * une décision, et le bouton du parcours nommé pour ce qu'il fait.
 */
export const FocusFlow: React.FC<FocusFlowProps> = ({
  result,
  draft,
  onChange,
  onBack,
  onConfirm,
  confirmLabel = 'Démarrer mon parcours ciblé',
  onBuildOnDomains,
}) => {
  const [adjusting, setAdjusting] = useState(false);
  const domain = FUNCTIONAL_DOMAINS_BY_ID[draft.flagshipDomainId];

  const { openings } = useMemo(
    () => domainOpenings(result, draft.flagshipDomainId),
    [result, draft.flagshipDomainId]
  );
  const inPlay = specializationsInPlay(draft.flagshipDomainId, draft.occupationIds);
  const blocking = validateFocus(draft, result);

  const pickedOpenings = draft.occupationIds
    .map((id) => OCCUPATIONS_BY_ID[id])
    .filter((occupation): occupation is CrossOccupation => Boolean(occupation));
  const pickedSpecializations = draft.specializationIds
    .map((id) => SPECIALIZATIONS_BY_ID[id])
    .filter((specialization): specialization is Specialization => Boolean(specialization));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Étape 2 sur 3 · {domain.label}
          </p>
          <Button variant="ghost" size="sm" onClick={onBack} className="mt-1 -ml-3 w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Changer de domaine
          </Button>
        </div>

        <Card padding="lg">
          <CardHeader>
            <CardTitle>Votre parcours ciblé</CardTitle>
            <p className="text-sm text-gray-600">
              {draft.occupationIds.length > 0
                ? `${draft.occupationIds.length} débouché(s) sur ${openings.length} que ce domaine vous ouvre, ${
                    draft.specializationIds.length
                  } axe(s) où s'appuyer.`
                : `Ce domaine vous ouvre ${openings.length} débouché(s). Choisissez la ou les portes d'entrée.`}
            </p>
            <button
              type="button"
              onClick={() => setAdjusting((current) => !current)}
              aria-expanded={adjusting}
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {adjusting ? 'Résumer ma sélection' : 'Ajuster mes débouchés et mon axe'}
            </button>
          </CardHeader>

          <CardContent>
            {!adjusting && (
              <ul className="space-y-2 text-sm text-gray-700">
                {pickedOpenings.map((occupation) => (
                  <li key={occupation.id} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                    {occupation.title}
                  </li>
                ))}
                {pickedSpecializations.map((specialization) => (
                  <li key={specialization.id} className="flex items-start gap-2 text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                    Axe : {specialization.label}
                  </li>
                ))}
                {pickedOpenings.length === 0 && (
                  <li className="text-gray-600">Rien de retenu pour l’instant.</li>
                )}
              </ul>
            )}

            {adjusting && (
              <>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Les débouchés de ce domaine — {MAX_TARGETED_OPENINGS} au plus
                </p>
                <OccupationStep
                  domainId={draft.flagshipDomainId}
                  matches={openings}
                  selectedIds={draft.occupationIds}
                  onToggle={(occupationId) => onChange(toggleOccupation(draft, occupationId))}
                />

                {inPlay.length > 0 && (
                  <>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      L’axe où vous appuyer
                    </p>
                    <SpecializationStep
                      specializations={inPlay}
                      selectedIds={draft.specializationIds}
                      onToggle={(specializationId) =>
                        onChange(toggleSpecialization(draft, specializationId))
                      }
                    />
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div>
          <Button
            size="lg"
            className="w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={Boolean(blocking)}
            onClick={() => onConfirm(draft)}
          >
            {confirmLabel}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          {blocking && (
            <p role="status" className="mt-2 text-sm text-amber-700">
              {blocking}
            </p>
          )}
          <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={onBuildOnDomains}>
            Pour l’instant, construire sur mes domaines
          </Button>
        </div>
      </div>
    </div>
  );
};
