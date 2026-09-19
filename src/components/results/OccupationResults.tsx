import React, { useMemo, useState } from 'react';
import { ArrowRight, Award, BookOpen, Briefcase, Layers, School, TrendingUp } from 'lucide-react';
import { ProfileResult } from '@/types/test';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { matchOccupations, OccupationBand, OccupationMatch } from '@/utils/occupationMatcher';
import { buildTrackForOccupation } from '@/utils/pathwayEngine';
import {
  isDemoOpportunity,
  opportunitiesForOccupation,
  Opportunity,
  OpportunityKind,
} from '@/data/opportunities';
import { CrossOccupation } from '@/data/occupations';

const CARDS_PER_SCREEN = 3;
const OPPORTUNITIES_PER_CARD = 4;

const KIND_LABEL: Record<OpportunityKind, string> = {
  etablissement: 'Établissement',
  formation: 'Formation',
  bourse: 'Bourse',
};

const KIND_PLURAL: Record<OpportunityKind, string> = {
  etablissement: 'Établissements',
  formation: 'Formations',
  bourse: 'Bourses',
};

const KIND_ICON: Record<OpportunityKind, React.ComponentType<{ className?: string }>> = {
  etablissement: School,
  formation: BookOpen,
  bourse: Award,
};

const DELIVERY_LABEL: Record<NonNullable<Opportunity['delivery']>, string> = {
  presentiel: 'en présentiel',
  distanciel: 'à distance',
  hybride: 'en hybride',
};

const BAND_LABEL: Record<OccupationBand, string> = {
  accessible: 'Dans votre portée',
  prochain_pas: 'Prochain pas',
  eloigne: 'À construire',
};

const BAND_BADGE: Record<OccupationBand, 'success' | 'warning' | 'default'> = {
  accessible: 'success',
  prochain_pas: 'warning',
  eloigne: 'default',
};

const INTRO: Record<OccupationBand, string> = {
  accessible:
    'Ces métiers se tiennent à l’intersection de vos domaines prioritaires : ils exigent les deux à la fois, et c’est ce qui vous correspond.',
  prochain_pas:
    'Aucun métier d’intersection n’est encore assez étayé dans vos réponses. Voici les plus proches, avec le domaine à consolider.',
  eloigne:
    'Vos domaines prioritaires ne se recoupent pas encore assez pour un métier à deux jambes. Le plus proche est celui-ci.',
};

interface OccupationResultsProps {
  result: ProfileResult;
  onSelect: (occupationId: string) => void;
  /** Libellé du bouton de sélection : le destin change entre l'invité et le membre. */
  selectLabel?: string;
}

export const OccupationResults: React.FC<OccupationResultsProps> = ({
  result,
  onSelect,
  selectLabel = 'Choisir ce métier et construire mon parcours',
}) => {
  const [kindFilter, setKindFilter] = useState<OpportunityKind | 'all'>('all');
  const { matches, excluded } = useMemo(
    () =>
      matchOccupations({
        situation: result.situation,
        domains: result.domains,
        functionSignals: result.functionSignals,
      }),
    [result]
  );

  const inScope = matches.filter((match) => match.band === 'accessible');
  const near = matches.filter((match) => match.band === 'prochain_pas');
  // Bande basse : un seul métier, pour nommer l'écart plutôt que de laisser un écran vide.
  const shown =
    inScope.length || near.length
      ? [...inScope, ...near].slice(0, CARDS_PER_SCREEN)
      : matches.slice(0, 1);
  const tone: OccupationBand = inScope.length ? 'accessible' : near.length ? 'prochain_pas' : 'eloigne';

  return (
    <Card padding="lg">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary-600" />
          <CardTitle>Les métiers à votre intersection</CardTitle>
        </div>
        <p className="text-sm text-gray-600">{INTRO[tone]}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Écoles et financements
          </span>
          {(['all', 'etablissement', 'formation', 'bourse'] as const).map((kind) => {
            const active = kindFilter === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => setKindFilter(kind)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? 'border-primary-300 bg-primary-50 text-primary-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {kind === 'all' ? 'Toutes' : KIND_PLURAL[kind]}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        {shown.length === 0 ? (
          <p className="text-sm text-gray-600">
            Vous avez écarté la plupart des domaines : reprenez le test ou laissez-en revenir un pour
            rouvrir le catalogue de métiers.
          </p>
        ) : (
          <div className="space-y-4">
            {shown.map((match) => (
              <OccupationCard
                key={match.occupation.id}
                match={match}
                isSelected={result.selectedOccupationId === match.occupation.id}
                onSelect={onSelect}
                selectLabel={selectLabel}
                kindFilter={kindFilter}
              />
            ))}
          </div>
        )}

        {shown.some((match) => visibleOpportunities(match.occupation, kindFilter).some(isDemoOpportunity)) && (
          <p className="mt-5 text-xs text-gray-500">
            Les offres marquées « Démo » sont des familles d’établissements, de formations et de
            bourses, pas des annonces : elles valident l’affichage en attendant l’annuaire vérifié des
            partenaires AliTché, qui les remplacera offre par offre.
          </p>
        )}

        {excluded.length > 0 && (
          <p className="mt-5 text-xs text-gray-500">
            {excluded.length} métier(s) retiré(s) parce qu’ils reposent sur un domaine que vous avez
            exclu : {excluded.slice(0, 3).map((match) => match.occupation.title).join(', ')}
            {excluded.length > 3 ? '…' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const visibleOpportunities = (
  occupation: CrossOccupation,
  kindFilter: OpportunityKind | 'all'
): Opportunity[] =>
  opportunitiesForOccupation(occupation, kindFilter === 'all' ? undefined : kindFilter);

/**
 * Le rang seul empilerait quatre établissements avant la première bourse : on
 * parcourt la liste classée en servant une famille à la fois, pour que l'écran
 * dise tout de suite où se former ET comment financer.
 */
const foregroundOpportunities = (ranked: Opportunity[]): Opportunity[] => {
  const queues = (['etablissement', 'formation', 'bourse'] as OpportunityKind[]).map((kind) =>
    ranked.filter((opportunity) => opportunity.kind === kind)
  );
  const picked: Opportunity[] = [];
  let round = 0;
  while (picked.length < OPPORTUNITIES_PER_CARD && queues.some((queue) => queue.length > 0)) {
    const next = queues[round % queues.length].shift();
    if (next) picked.push(next);
    round += 1;
  }
  return picked;
};

const OccupationCard: React.FC<{
  match: OccupationMatch;
  isSelected: boolean;
  onSelect: (occupationId: string) => void;
  selectLabel: string;
  kindFilter: OpportunityKind | 'all';
}> = ({ match, isSelected, onSelect, selectLabel, kindFilter }) => {
  const { occupation, band, cores, coreGaps, bestSector } = match;
  const track = buildTrackForOccupation(occupation);
  const covered = new Set((track?.modules ?? []).flatMap((module) => module.skills));
  const gaps = occupation.skills.filter((skill) => !covered.has(skill));
  const opportunities = visibleOpportunities(occupation, kindFilter);
  const shownOpportunities = foregroundOpportunities(opportunities);

  return (
    <div
      className={`rounded-lg border p-4 ${
        isSelected ? 'border-primary-400 bg-primary-50/60 ring-1 ring-primary-300' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{occupation.title}</h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">{occupation.context}</p>
        </div>
        <Badge variant={BAND_BADGE[band]} size="sm">
          {BAND_LABEL[band]}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {cores.map((core) => (
          <span
            key={core.id}
            className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
          >
            <Layers className="h-3.5 w-3.5" />
            {core.label} · {core.score}%
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-700">
        {bestSector && (
          <p className="flex items-start gap-2">
            <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
            <span>
              Terrain le plus porteur pour vous : <strong>{bestSector.label}</strong>
            </span>
          </p>
        )}
        {coreGaps.length > 0 && (
          <p className="flex items-start gap-2">
            <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
            <span>À consolider avant de viser ce poste : {coreGaps.map((gap) => gap.label).join(', ')}.</span>
          </p>
        )}
        {gaps.length > 0 && (
          <p>
            <span className="font-medium">Compétences à développer :</span> {gaps.join(', ')}.
          </p>
        )}
        <p>
          <span className="font-medium">Filières :</span> {occupation.studyPaths.join(' · ')}
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Où se former, comment financer
        </p>
        {shownOpportunities.length === 0 ? (
          <p className="mt-2 text-xs text-gray-500">
            {kindFilter === 'all'
              ? 'Aucune offre n’est encore reliée à ce métier.'
              : 'Aucune offre de cette famille n’est encore reliée à ce métier.'}
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {shownOpportunities.map((opportunity) => {
              const KindIcon = KIND_ICON[opportunity.kind];
              return (
                <li key={opportunity.id} className="flex items-start gap-2">
                  <KindIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">{opportunity.label}</span>
                    <span className="text-xs text-gray-500">
                      {' '}
                      · {KIND_LABEL[opportunity.kind]}
                      {opportunity.delivery ? ` · ${DELIVERY_LABEL[opportunity.delivery]}` : ''}
                      {opportunity.country !== 'multi' ? ` · ${opportunity.country}` : ''}
                    </span>
                    {isDemoOpportunity(opportunity) && (
                      <Badge variant="warning" size="sm" className="ml-2 align-middle">
                        Démo
                      </Badge>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {opportunities.length > shownOpportunities.length && (
          <p className="mt-2 text-xs text-gray-500">
            + {opportunities.length - shownOpportunities.length} autre(s) offre(s) reliée(s) à ce métier.
          </p>
        )}
      </div>

      <Button
        onClick={() => onSelect(occupation.id)}
        variant={isSelected ? 'secondary' : 'primary'}
        size="sm"
        className="mt-4"
      >
        {isSelected ? 'Reconstruire mon parcours sur ce métier' : selectLabel}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
