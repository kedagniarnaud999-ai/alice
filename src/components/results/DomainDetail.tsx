import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, BookOpen, ChevronDown, ExternalLink, Layers, School } from 'lucide-react';
import { FunctionalDomainId, FunctionRoleId, ProfileResult } from '@/types/test';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChipFilter, ChipOption } from '@/components/ui/ChipFilter';
import { FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { specializationsForDomain } from '@/data/specializations';
import { domainOpenings } from '@/utils/domainFocus';
import {
  composeRationale,
  FunctionChoice,
  FunctionOption,
  MAX_RATIONALE_NOTE_CHARS,
  openingsForFunction,
  functionView,
} from '@/utils/functionFocus';
import {
  OccupationBand,
  OccupationMatch,
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
import { ChoiceReasonForm } from './ChoiceReasonForm';

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
  onChoose?: (domainId: FunctionalDomainId, choice?: FunctionChoice) => void;
  /** Même réserve : valider un métier depuis cette fiche n'existe que si l'étape d'après est branchée. */
  onChooseOccupation?: (occupationId: string, choice?: FunctionChoice) => void;
}

/**
 * La fiche d'un domaine de carrière : tout ce qu'il faut savoir avant de
 * s'engager, révélé par paliers. La description et les débouchés sont visibles
 * d'emblée parce qu'ils décident à eux seuls ; le reste attend un clic, pour que
 * le candidat lise au lieu de survoler.
 */
export const DomainDetail: React.FC<DomainDetailProps> = ({
  result,
  domainId,
  onBack,
  onChoose,
  onChooseOccupation,
}) => {
  const [bandFilter, setBandFilter] = useState<OccupationBand | 'all'>('all');
  const [openPanels, setOpenPanels] = useState<PanelKey[]>([]);
  const [functionId, setFunctionId] = useState<FunctionRoleId | null>(null);
  const [showOtherFunctions, setShowOtherFunctions] = useState(false);
  const [rationaleTags, setRationaleTags] = useState<string[]>([]);
  const [rationaleNote, setRationaleNote] = useState('');
  const domain = FUNCTIONAL_DOMAINS_BY_ID[domainId];
  const score = result.domains.find((entry) => entry.id === domainId);

  const { openings, total, blockedBy } = useMemo(
    () => domainOpenings(result, domainId),
    [result, domainId]
  );
  /** Répartition des débouchés du domaine sous les six fonctions, recommandation comprise. */
  const view = useMemo(() => functionView(result, domainId), [result, domainId]);
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

  /** Une fonction retenue restreint la liste : c'est tout ce que le filtre promet, pas un tri de plus. */
  const scoped = functionId ? openingsForFunction(view, functionId) : openings;
  const visible = scoped.filter((match) => bandFilter === 'all' || match.band === bandFilter);
  /** Les fiches qui exigent ce domaine, puis celles qui n'en font qu'un terrain : le domaine ouvre, il ne suffit pas. */
  const anchored = visible.filter((match) => match.cores.some((entry) => entry.id === domainId));
  const terrain = visible.filter((match) => !match.cores.some((entry) => entry.id === domainId));

  /** Ce qui part avec l'engagement : la fonction sous laquelle le candidat a rangé son choix, et sa raison s'il l'a dite. */
  const choice: FunctionChoice | undefined = functionId
    ? { functionId, rationale: composeRationale(rationaleTags, rationaleNote) }
    : undefined;

  /** Changer de fonction, ou la retirer : la raison portée sur l'ancienne ne suit pas. */
  const applyFunction = (id: FunctionRoleId | null) => {
    setFunctionId(id);
    setRationaleTags([]);
    setRationaleNote('');
  };

  /** Reprendre la même fonction, c'est encore la retirer. */
  const pickFunction = (id: FunctionRoleId) => applyFunction(functionId === id ? null : id);

  const toggleRationaleTag = (id: string) =>
    setRationaleTags((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]
    );

  const togglePanel = (key: PanelKey) =>
    setOpenPanels((current) =>
      current.includes(key) ? current.filter((entry) => entry !== key) : [...current, key]
    );

  const pickedFunction = functionId
    ? view.options.find((option) => option.id === functionId) ?? null
    : null;

  const renderFunction = (option: FunctionOption) => {
    const active = functionId === option.id;
    const blocked = option.openings.length === 0;
    const body = (
      <>
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium text-gray-900">{option.label}</span>
          <Badge variant={option.recommended ? 'primary' : 'default'} size="sm">
            {option.fit}%
          </Badge>
        </span>
        <span className="mt-1 block text-sm text-gray-600">{option.blurb}</span>
        <span className="mt-1 block text-xs text-gray-500">
          {option.closedReason ??
            `${option.openings.length} métier(s) de ce domaine travaillent sur cet axe.`}
        </span>
      </>
    );

    if (blocked) {
      /** Rien derrière : la ligne se lit, elle ne se clique pas. */
      return (
        <div key={option.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 opacity-80">
          {body}
        </div>
      );
    }

    return (
      <button
        key={option.id}
        type="button"
        aria-pressed={active}
        onClick={() => pickFunction(option.id)}
        className={`w-full rounded-lg border p-3 text-left transition-colors ${
          active ? 'border-primary-300 bg-primary-50' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        {body}
      </button>
    );
  };

  const renderOpening = (match: OccupationMatch) => {
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
            À consolider pour ce poste : {match.coreGaps.map((gap) => gap.label).join(', ')}.
          </p>
        )}
        {onChooseOccupation && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => onChooseOccupation(match.occupation.id, choice)}
          >
            Choisir ce métier
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

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

        {openings.length > 0 && (
          <Card padding="lg">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900">
                La fonction où vous vous rangez
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Le domaine dit où l’on travaillerait, la fonction dit dans quel service. Gardez-en une
                pour ne lire que les métiers de {domain.label} qui s’appuient dessus&nbsp;; passez cette
                étape si vous préférez voir toute la liste.
              </p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Les {view.recommended.length} fonctions qui vous correspondent le mieux ici
              </p>
              <div className="mt-2 space-y-2">{view.recommended.map(renderFunction)}</div>

              {view.others.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowOtherFunctions((current) => !current)}
                    aria-expanded={showOtherFunctions}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    {showOtherFunctions
                      ? 'Réduire les autres fonctions'
                      : `Voir les ${view.others.length} autres fonctions`}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showOtherFunctions ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {showOtherFunctions && (
                    <div className="mt-2 space-y-2">{view.others.map(renderFunction)}</div>
                  )}
                </>
              )}

              {pickedFunction && (
                <ChoiceReasonForm
                  subject={pickedFunction.label}
                  tagIds={rationaleTags}
                  note={rationaleNote}
                  maxNoteChars={MAX_RATIONALE_NOTE_CHARS}
                  onToggleTag={toggleRationaleTag}
                  onNote={setRationaleNote}
                />
              )}
            </CardContent>
          </Card>
        )}

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
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {pickedFunction ? (
                    <>
                      Les {scoped.length} métier(s) de ce domaine qui travaillent{' '}
                      <span className="font-medium text-gray-900">« {pickedFunction.label} »</span>.
                    </>
                  ) : (
                    <>
                      Les {openings.length} métiers que ce domaine vous ouvre, classés selon ce qu’ils
                      en exigent de vous. Choisissez celui que vous voulez viser : la suite vous
                      demandera sur quel axe vous appuyer.
                    </>
                  )}
                </p>
                {pickedFunction && (
                  <button
                    type="button"
                    onClick={() => applyFunction(null)}
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    Reprendre les {openings.length} métiers du domaine
                  </button>
                )}
                <ChipFilter
                  label="Portée"
                  options={BAND_FILTERS}
                  value={bandFilter}
                  onChange={(value) => setBandFilter(value as OccupationBand | 'all')}
                />

                {visible.length === 0 ? (
                  <p className="mt-4 text-sm text-gray-600">
                    Aucun débouché de ce domaine dans cette bande pour vous aujourd’hui. Changez de
                    filtre, ou revenez après avoir consolidé un domaine fragile.
                  </p>
                ) : (
                  <>
                    {anchored.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {anchored.length} métier(s) qui exigent ce domaine de vous
                        </p>
                        {anchored.map((match) => renderOpening(match))}
                      </div>
                    )}
                    {terrain.length > 0 && (
                      <div className="mt-5 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {terrain.length} autre(s) métier(s) du secteur, où ce domaine sert de terrain
                        </p>
                        {terrain.map((match) => renderOpening(match))}
                      </div>
                    )}
                  </>
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
                Cycle diplômant : les formations listées viennent de l’annuaire transmis à
                l’équipe, lien de l’école à l’appui. Les modules courts ci-dessous, eux, se
                suivent directement sur AliTché.
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
                          · {module.duration} · {MODULE_DIFFICULTY_LABELS[module.difficulty]}
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
          <Button size="lg" className="w-full" onClick={() => onChoose(domainId, choice)}>
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
            {opportunity.url ? (
              <a
                href={opportunity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1 font-medium text-primary-700 underline-offset-2 hover:underline"
              >
                {opportunity.label}
                <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <span className="font-medium">{opportunity.label}</span>
            )}
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
