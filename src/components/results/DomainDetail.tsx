import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, BookOpen, ChevronDown, Layers, School } from 'lucide-react';
import { FunctionalDomainId, ProfileResult } from '@/types/test';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChipFilter, ChipOption } from '@/components/ui/ChipFilter';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { specializationsForDomain } from '@/data/specializations';
import { domainOpenings } from '@/utils/domainFocus';
import {
  OccupationBand,
  OCCUPATION_BAND_BADGE,
  OCCUPATION_BAND_LABEL,
} from '@/utils/occupationMatcher';
import { buildTrackForDomain } from '@/utils/pathwayEngine';
import {
  DEMO_OPPORTUNITY_NOTICE,
  isDemoOpportunity,
  opportunitiesForDomain,
  Opportunity,
  OpportunityKind,
  OPPORTUNITY_DELIVERY_LABEL,
} from '@/data/opportunities';
import { MODULE_DIFFICULTY_LABELS } from '@/data/modules';

/** Même plafond d'attention que l'écran de résultats : trois fiches à la fois. */
const OPENINGS_PER_SCREEN = 3;

type PanelKey = 'specializations' | 'training' | 'schools' | 'funding';

const PANELS: { key: PanelKey; label: string }[] = [
  { key: 'specializations', label: 'Les spécialisations' },
  { key: 'training', label: 'Les formations' },
  { key: 'schools', label: 'Les écoles et centres' },
  { key: 'funding', label: 'Les bourses et financements' },
];

const BAND_FILTERS: ChipOption[] = [
  { value: 'all', label: 'Tous' },
  { value: 'accessible', label: OCCUPATION_BAND_LABEL.accessible },
  { value: 'prochain_pas', label: OCCUPATION_BAND_LABEL.prochain_pas },
  { value: 'eloigne', label: OCCUPATION_BAND_LABEL.eloigne },
];

const KIND_ICON: Record<OpportunityKind, React.ComponentType<{ className?: string }>> = {
  etablissement: School,
  formation: BookOpen,
  bourse: Award,
};

interface DomainDetailProps {
  result: ProfileResult;
  domainId: FunctionalDomainId;
  onBack: () => void;
  /** Omise tant que l'entonnoir de ciblage n'est pas là : aucun bouton mort. */
  onChoose?: (domainId: FunctionalDomainId) => void;
}

/**
 * La fiche d'un domaine de carrière : tout ce qu'il faut savoir avant de
 * s'engager, révélé par paliers. La description et les débouchés sont visibles
 * d'emblée parce qu'ils décident à eux seuls ; le reste attend un clic, pour que
 * le candidat lise au lieu de survoler.
 */
export const DomainDetail: React.FC<DomainDetailProps> = ({ result, domainId, onBack, onChoose }) => {
  const [bandFilter, setBandFilter] = useState<OccupationBand | 'all'>('all');
  const [openPanels, setOpenPanels] = useState<PanelKey[]>([]);
  const domain = FUNCTIONAL_DOMAINS_BY_ID[domainId];
  const score = result.domains.find((entry) => entry.id === domainId);

  const { openings, total, blockedBy } = useMemo(
    () => domainOpenings(result, domainId),
    [result, domainId]
  );
  /** La cause d'une fiche sans débouché s'affiche en noms de domaines, pas en clés. */
  const blockedLabels = blockedBy.map((id) => FUNCTIONAL_DOMAINS_BY_ID[id].label);

  const specializations = specializationsForDomain(domainId);
  const modules = buildTrackForDomain(domainId)?.modules ?? [];
  const externalFormations = opportunitiesForDomain(domainId, 'formation');
  const schools = opportunitiesForDomain(domainId, 'etablissement');
  const funding = opportunitiesForDomain(domainId, 'bourse');
  const offersWithDemo = [externalFormations, schools, funding].some((list) =>
    list.some(isDemoOpportunity)
  );

  const visible = openings.filter((match) => bandFilter === 'all' || match.band === bandFilter);
  const shown = visible.slice(0, OPENINGS_PER_SCREEN);

  const togglePanel = (key: PanelKey) =>
    setOpenPanels((current) =>
      current.includes(key) ? current.filter((entry) => entry !== key) : [...current, key]
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-3 w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à mes domaines
        </Button>

        <Card padding="lg">
          <CardContent>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{domain.label}</h1>
                <p className="mt-1 text-sm font-medium text-primary-700">{domain.tagline}</p>
              </div>
              {score && <Badge variant="primary" size="md">{score.normalized}%</Badge>}
            </div>
            <p className="mt-4 leading-relaxed text-gray-700">{domain.description}</p>
            {score && score.reasons.length > 0 && (
              <p className="mt-3 text-sm text-gray-600">
                Ce que vos réponses montrent ici : {score.reasons.join(' · ')}
              </p>
            )}
          </CardContent>
        </Card>

        <Card padding="lg">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-900">Les débouchés de ce domaine</h2>

            {openings.length === 0 ? (
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {blockedLabels.length > 0 ? (
                  <>
                    Les {total} métiers croisés de ce domaine exigent aussi{' '}
                    {blockedLabels.length > 1 ? 'des domaines' : 'un domaine'} que vos réponses écartent
                    ({blockedLabels.join(', ')}). Ce sont bien des débouchés de ce domaine, mais ils ne
                    s’ouvrent pas à vous aujourd’hui.
                  </>
                ) : (
                  'Aucun métier croisé n’est encore relié à ce domaine : la description et les formations ci-dessous restent valables.'
                )}
              </p>
            ) : (
              <>
                <p className="mt-1 text-sm text-gray-600">
                  {openings.length} métier(s) que ce domaine porte, les croisements les plus exigés
                  d’abord.
                </p>
                <ChipFilter
                  label="Portée"
                  options={BAND_FILTERS}
                  value={bandFilter}
                  onChange={(value) => setBandFilter(value as OccupationBand | 'all')}
                />

                <div className="mt-4 space-y-3">
                  {shown.length === 0 ? (
                    <p className="text-sm text-gray-600">
                      Aucun débouché de ce domaine dans cette bande pour vous aujourd’hui. Changez de
                      filtre, ou revenez après avoir consolidé un domaine fragile.
                    </p>
                  ) : (
                    shown.map((match) => {
                      const core = match.cores.find((entry) => entry.id === domainId);
                      return (
                        <div key={match.occupation.id} className="rounded-lg border border-gray-200 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <h3 className="font-semibold text-gray-900">{match.occupation.title}</h3>
                            <Badge variant={OCCUPATION_BAND_BADGE[match.band]} size="sm">
                              {OCCUPATION_BAND_LABEL[match.band]}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-gray-600">{match.occupation.context}</p>
                          <p className="mt-2 flex items-start gap-2 text-sm text-gray-700">
                            <Layers className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                            <span>
                              {core
                                ? `Ce métier exige ce domaine de vous : vous êtes à ${core.score}%.`
                                : 'Ce métier utilise ce domaine comme terrain, sur une autre compétence clé.'}
                            </span>
                          </p>
                          {match.coreGaps.length > 0 && (
                            <p className="mt-1 text-xs text-gray-500">
                              À consolider pour ce poste :{' '}
                              {match.coreGaps.map((gap) => gap.label).join(', ')}.
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {visible.length > shown.length && (
                  <p className="mt-3 text-xs text-gray-500">
                    + {visible.length - shown.length} autre(s) débouché(s) dans ce filtre.
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Voir aussi</p>
          <div className="flex flex-wrap gap-2">
            {PANELS.map((panel) => {
              const open = openPanels.includes(panel.key);
              return (
                <Button
                  key={panel.key}
                  variant={open ? 'primary' : 'outline'}
                  size="sm"
                  aria-expanded={open}
                  onClick={() => togglePanel(panel.key)}
                >
                  {panel.label}
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </Button>
              );
            })}
          </div>
        </div>

        {openPanels.includes('specializations') && (
          <Card padding="lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900">Les spécialisations du domaine</h2>
              <p className="mt-1 text-sm text-gray-600">
                Des axes de compétences où se concentrer, pas des intitulés de diplôme : chacun se
                travaille avec les modules et les métiers déjà listés ici.
              </p>
              <div className="mt-4 space-y-3">
                {specializations.map((specialization) => (
                  <div key={specialization.id} className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900">{specialization.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{specialization.note}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {specialization.occupationIds.length} débouché(s) visé(s) ·{' '}
                      {specialization.moduleIds.length} module(s) AliTché
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {openPanels.includes('training') && (
          <Card padding="lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900">Se former dans ce domaine</h2>
              <p className="mt-1 text-sm text-gray-600">
                Cycle diplômant : non renseigné, AliTché ne catalogue pas encore les cursus. Voici les
                offres reliées au domaine, et ce que vous pouvez faire tout de suite chez nous.
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Formations externes
              </p>
              <OpportunityList
                opportunities={externalFormations}
                kind="formation"
                empty="Aucune formation externe n’est encore reliée à ce domaine."
              />

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Modules courts disponibles dans AliTché
              </p>
              {modules.length === 0 ? (
                <p className="mt-2 text-sm text-gray-600">
                  Aucun module n’est encore rattaché à ce domaine.
                </p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {modules.map((module) => (
                    <li key={module.id} className="flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">{module.title}</span>
                        <span className="text-xs text-gray-500">
                          {' '}
                          · {module.duration} · {MODULE_DIFFICULTY_LABELS[module.difficulty]} ·{' '}
                          {module.isFree ? 'gratuit' : 'payant'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}

        {openPanels.includes('schools') && (
          <Card padding="lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900">Écoles et centres</h2>
              <OpportunityList
                opportunities={schools}
                kind="etablissement"
                empty="Aucun établissement n’est encore relié à ce domaine : l’annuaire vérifié est en cours."
              />
            </CardContent>
          </Card>
        )}

        {openPanels.includes('funding') && (
          <Card padding="lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900">Bourses et financements</h2>
              <OpportunityList
                opportunities={funding}
                kind="bourse"
                empty="Aucune bourse n’est encore reliée à ce domaine."
              />
            </CardContent>
          </Card>
        )}

        {offersWithDemo && (
          <p className="text-xs text-gray-500">
            Sélection non filtrée par pays : les offres affichées couvrent l’ensemble des marchés
            AliTché. {DEMO_OPPORTUNITY_NOTICE}
          </p>
        )}

        {onChoose && (
          <Button size="lg" className="w-full" onClick={() => onChoose(domainId)}>
            Choisir ce domaine et cibler mon parcours
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

const OpportunityList: React.FC<{
  opportunities: Opportunity[];
  kind: OpportunityKind;
  empty: string;
}> = ({ opportunities, kind, empty }) => {
  const KindIcon = KIND_ICON[kind];
  if (opportunities.length === 0) {
    return <p className="mt-2 text-sm text-gray-600">{empty}</p>;
  }
  return (
    <ul className="mt-2 space-y-2">
      {opportunities.map((opportunity) => (
        <li key={opportunity.id} className="flex items-start gap-2">
          <KindIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
          <div className="text-sm text-gray-700">
            <span className="font-medium">{opportunity.label}</span>
            <span className="text-xs text-gray-500">
              {opportunity.delivery
                ? ` · ${OPPORTUNITY_DELIVERY_LABEL[opportunity.delivery]}`
                : ''}
              {opportunity.country !== 'multi' ? ` · ${opportunity.country}` : ''}
            </span>
            {isDemoOpportunity(opportunity) && (
              <Badge variant="warning" size="sm" className="ml-2 align-middle">
                Démo
              </Badge>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
