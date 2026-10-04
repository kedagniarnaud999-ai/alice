import { ALL_DOMAIN_IDS, FUNCTIONAL_DOMAINS_BY_ID } from '@/data/domains';
import { MODULE_CATALOG } from '@/data/modules';
import { CROSS_OCCUPATIONS } from '@/data/occupations';
import { SPECIALIZATIONS } from '@/data/specializations';
import { OPPORTUNITIES, opportunitiesForOccupation, Opportunity } from '@/data/opportunities';
import { orientationQuestions } from '@/data/questions';
import {
  METIER_PAR_FICHE,
  REFERENTIEL_DOMAINES,
  REFERENTIEL_FONCTIONS,
  REFERENTIEL_METIERS,
  REFERENTIEL_SPECIALISATIONS,
} from '@/data/referentiel';
import { postesPourFiche } from '@/data/postesNommes';
import { getVisibleQuestions } from '@/utils/testAnalyzer';
import type { CareerSituation, FunctionalDomainId, TestResponse } from '@/types/test';

/**
 * Tâche S2.5 — ce qui contient AliTché se mesure ici, et nulle part ailleurs.
 *
 * `docs/CONTENU-PRODUIT.md` répète ces nombres pour un lecteur humain. Dès qu'un
 * catalogue bouge sans que la fiche bouge, la fiche ment : le contrôle rougit.
 * Il rougit aussi si un autre document du dépôt écrit un chiffre qui ne se trouve
 * dans aucune mesure ci-dessous.
 */

const failures: string[] = [];

const SITUATIONS: CareerSituation[] = ['bachelier', 'jeune_diplome', 'reconversion', 'professionnel'];
const FICHE = '../../docs/CONTENU-PRODUIT.md';
const DEBUT = 'COMPTEURS : début';
const FIN = 'COMPTEURS : fin';

/** Les documents vivants du dépôt : `hors-usage-*` décrit un état périmé, il n'est pas tenu. */
const documents = Object.fromEntries(
  [
    ...Object.entries(
      import.meta.glob('../../docs/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
        string,
        string
      >
    ),
    // La fiche d'identité du dépôt nomme des nombres du produit : elle est tenue comme les documents.
    ...Object.entries(
      import.meta.glob('../../README.md', { query: '?raw', import: 'default', eager: true }) as Record<
        string,
        string
      >
    ),
  ].filter(([chemin]) => !chemin.includes('hors-usage'))
);

const reelle = (o: Opportunity): boolean => o.source !== 'demo';

/** Les questions réellement proposées à qui déclare telle situation. */
function branchFor(situation: CareerSituation): TestResponse[] {
  const gate = orientationQuestions.find((q) => q.id === 'q_situation');
  const option = gate?.options.find((o) => o.sets?.situation === situation);
  return option ? [{ questionId: 'q_situation', selectedOptions: [option.id] }] : [];
}

const metiersDe = (domain: FunctionalDomainId) =>
  CROSS_OCCUPATIONS.filter((o) => (o.core[domain] ?? 0) > 0);
const terrainsDe = (domain: FunctionalDomainId) =>
  CROSS_OCCUPATIONS.filter((o) => o.sectors.includes(domain));
const axesDe = (domain: FunctionalDomainId) => SPECIALIZATIONS.filter((s) => s.domainId === domain);
const modulesDe = (domain: FunctionalDomainId) =>
  MODULE_CATALOG.filter((m) => m.domains?.includes(domain));
const chancesReellesDe = (domain: FunctionalDomainId) =>
  OPPORTUNITIES.filter((o) => o.domainIds.includes(domain) && reelle(o));

const fichesCouvertes = new Set(SPECIALIZATIONS.flatMap((s) => s.occupationIds));
const parDomaine = ALL_DOMAIN_IDS.map((domain) => ({
  domain,
  metiers: metiersDe(domain).length,
  terrains: terrainsDe(domain).length,
  axes: axesDe(domain).length,
  modules: modulesDe(domain).length,
  chances: chancesReellesDe(domain).length,
}));

const min = (values: number[]): number => Math.min(...values);
const max = (values: number[]): number => Math.max(...values);

const lotsControles = [...new Set(OPPORTUNITIES.map((o) => o.verifiedAt).filter((d): d is string => !!d))].sort();
const etapes = [...new Set(orientationQuestions.map((q) => q.stage))].sort();

const branches = SITUATIONS.map((s) => getVisibleQuestions(branchFor(s)).length);

// ——— Le référentiel reçu du fondateur ———
//
// Ses 14 domaines, ses 11 fonctions, ses 84 métiers génériques et ses 113 spécialisations
// ne portent aucun score : ils nomment et documentent. Sa base corrigée distingue elle-même
// les métiers transversaux (46) de ceux qu'un domaine qualifie (38), et ne dit plus rien
// d'approximatif ligne à ligne. Ce qui est à nous dans ce fichier —
// le domaine de carrière qui héberge chacun de ses domaines, la répartition de ses fonctions
// sur nos six axes, et le rang de nos 45 fiches sous ses métiers génériques — se vérifie ici.

const codesDomaines = REFERENTIEL_DOMAINES.map((d) => d.code);
const codesFonctions = REFERENTIEL_FONCTIONS.map((f) => f.code);
const codesGeneriques = REFERENTIEL_METIERS.map((m) => m.code);
const codesSpecialisations = REFERENTIEL_SPECIALISATIONS.map((s) => s.code);
const generiqueParCode = new Map(REFERENTIEL_METIERS.map((m) => [m.code, m]));
const generiquesTransversaux = REFERENTIEL_METIERS.filter((m) => !m.qualifieParDomaine).length;
const generiquesQualifies = REFERENTIEL_METIERS.filter((m) => m.qualifieParDomaine).length;
const fichesClassees = Object.keys(METIER_PAR_FICHE);
const rangsApproximatifs = fichesClassees.filter((id) => METIER_PAR_FICHE[id].approximatif).length;
const competencesMin = min(REFERENTIEL_SPECIALISATIONS.map((s) => s.competences.length));
const competencesMax = max(REFERENTIEL_SPECIALISATIONS.map((s) => s.competences.length));

const compteurs: { cle: string; valeur: number }[] = [
  { cle: 'questions', valeur: orientationQuestions.length },
  ...SITUATIONS.map((s, i) => ({ cle: `questions.${s}`, valeur: branches[i] })),
  { cle: 'questions.par.situation.min', valeur: min(branches) },
  { cle: 'questions.par.situation.max', valeur: max(branches) },
  ...etapes.map((stage) => ({
    cle: `questions.stage.${stage}`,
    valeur: orientationQuestions.filter((q) => q.stage === stage).length,
  })),
  { cle: 'domaines', valeur: ALL_DOMAIN_IDS.length },
  { cle: 'situations', valeur: SITUATIONS.length },
  { cle: 'metiers', valeur: CROSS_OCCUPATIONS.length },
  { cle: 'metiers.sans.axe', valeur: CROSS_OCCUPATIONS.length - fichesCouvertes.size },
  {
    cle: 'metiers.avec.chance.reelle',
    valeur: CROSS_OCCUPATIONS.filter((o) => opportunitiesForOccupation(o).some(reelle)).length,
  },
  { cle: 'axes', valeur: SPECIALIZATIONS.length },
  { cle: 'axes.par.domaine.min', valeur: min(parDomaine.map((d) => d.axes)) },
  { cle: 'axes.par.domaine.max', valeur: max(parDomaine.map((d) => d.axes)) },
  { cle: 'axes.metiers.min', valeur: min(SPECIALIZATIONS.map((s) => s.occupationIds.length)) },
  { cle: 'axes.metiers.max', valeur: max(SPECIALIZATIONS.map((s) => s.occupationIds.length)) },
  { cle: 'axes.modules.min', valeur: min(SPECIALIZATIONS.map((s) => s.moduleIds.length)) },
  { cle: 'axes.modules.max', valeur: max(SPECIALIZATIONS.map((s) => s.moduleIds.length)) },
  { cle: 'modules', valeur: MODULE_CATALOG.length },
  { cle: 'modules.transversaux', valeur: MODULE_CATALOG.filter((m) => !m.domains?.length).length },
  { cle: 'chances', valeur: OPPORTUNITIES.length },
  { cle: 'chances.reelles', valeur: OPPORTUNITIES.filter(reelle).length },
  { cle: 'chances.demo', valeur: OPPORTUNITIES.filter((o) => !reelle(o)).length },
  { cle: 'chances.controlees', valeur: OPPORTUNITIES.filter((o) => o.verifiedAt).length },
  { cle: 'chances.avec.url', valeur: OPPORTUNITIES.filter((o) => o.url).length },
  ...lotsControles.map((date) => ({
    cle: `chances.controlees.${date}`,
    valeur: OPPORTUNITIES.filter((o) => o.verifiedAt === date).length,
  })),
  { cle: 'chances.etablissement', valeur: OPPORTUNITIES.filter((o) => o.kind === 'etablissement').length },
  { cle: 'chances.formation', valeur: OPPORTUNITIES.filter((o) => o.kind === 'formation').length },
  { cle: 'chances.bourse', valeur: OPPORTUNITIES.filter((o) => o.kind === 'bourse').length },
  { cle: 'paires.coeur', valeur: CROSS_OCCUPATIONS.reduce((n, o) => n + Object.values(o.core).filter((w) => (w ?? 0) > 0).length, 0) },
  { cle: 'paires.terrain', valeur: CROSS_OCCUPATIONS.reduce((n, o) => n + o.sectors.length, 0) },
  { cle: 'referentiel.domaines', valeur: REFERENTIEL_DOMAINES.length },
  { cle: 'referentiel.fonctions', valeur: REFERENTIEL_FONCTIONS.length },
  { cle: 'referentiel.metiers.generiques', valeur: REFERENTIEL_METIERS.length },
  { cle: 'referentiel.metiers.generiques.transversaux', valeur: generiquesTransversaux },
  { cle: 'referentiel.metiers.generiques.qualifies.par.domaine', valeur: generiquesQualifies },
  { cle: 'referentiel.specialisations', valeur: REFERENTIEL_SPECIALISATIONS.length },
  { cle: 'referentiel.fiches.classees', valeur: fichesClassees.length },
  { cle: 'referentiel.fiches.classees.approximatives', valeur: rangsApproximatifs },
];

const blocAttendu = compteurs.map((c) => `${c.cle} = ${c.valeur}`).join('\n');
const tableAttendue = parDomaine
  .map(
    (d) =>
      `| ${d.domain} | ${FUNCTIONAL_DOMAINS_BY_ID[d.domain].label} | ${d.metiers} | ${d.terrains} | ${d.axes} | ${d.modules} | ${d.chances} |`
  )
  .join('\n');

// ——— 1. La fiche unique existe, et ses nombres sont les nombres mesurés ———

const fiche = documents[FICHE];

if (!fiche) {
  failures.push(
    `docs/CONTENU-PRODUIT.md est absent. Voici le bloc de compteurs à y poser :\n\n${blocAttendu}\n\nEt le tableau par domaine :\n\n${tableAttendue}`
  );
} else {
  const lignes = fiche.split(/\r?\n/);
  const debut = lignes.findIndex((l) => l.includes(DEBUT));
  const fin = lignes.findIndex((l) => l.includes(FIN));

  if (debut === -1 || fin === -1 || fin < debut) {
    failures.push(
      `docs/CONTENU-PRODUIT.md n'a pas son bloc de compteurs entre « ${DEBUT} » et « ${FIN} ». Voici le bloc attendu :\n\n${blocAttendu}`
    );
  } else {
    const ecrits = new Map<string, number>();
    lignes.slice(debut + 1, fin).forEach((ligne) => {
      const m = /^([a-z0-9_.-]+) = (\d+)$/.exec(ligne.trim());
      if (m) ecrits.set(m[1], Number(m[2]));
    });

    compteurs.forEach(({ cle, valeur }) => {
      if (!ecrits.has(cle)) {
        failures.push(`docs/CONTENU-PRODUIT.md ne dit rien de « ${cle} » — la mesure donne ${valeur}`);
      } else if (ecrits.get(cle) !== valeur) {
        failures.push(
          `docs/CONTENU-PRODUIT.md écrit « ${cle} = ${ecrits.get(cle)} » alors que le catalogue donne ${valeur}`
        );
      }
    });

    ecrits.forEach((valeur, cle) => {
      if (!compteurs.some((c) => c.cle === cle)) {
        failures.push(
          `docs/CONTENU-PRODUIT.md écrit « ${cle} = ${valeur} » : cette ligne ne correspond à aucune mesure (supprime-la, ou ajoute la mesure dans src/checks/contenu.check.ts)`
        );
      }
    });
  }

  const lignesTableau = lignes
    .filter((l) => l.trim().startsWith('|'))
    .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
  const cellules = lignesTableau
    .filter((cells) => ALL_DOMAIN_IDS.includes(cells[0] as FunctionalDomainId))
    .map((cells) => ({ domain: cells[0], label: cells[1], numbers: cells.slice(2) }));

  ALL_DOMAIN_IDS.forEach((domain) => {
    const attendue = parDomaine.find((d) => d.domain === domain);
    const ecrite = cellules.find((c) => c.domain === domain);
    if (!attendue || !ecrite) return;
    const attendu = [String(attendue.metiers), String(attendue.terrains), String(attendue.axes), String(attendue.modules), String(attendue.chances)];
    if (ecrite.numbers.length !== attendu.length) {
      failures.push(
        `La ligne « ${domain} » du tableau de docs/CONTENU-PRODUIT.md donne ${ecrite.numbers.length} nombre(s) sur ${attendu.length} attendus (${attendu.join(' | ')})`
      );
      return;
    }
    if (ecrite.numbers.join('|') !== attendu.join('|')) {
      failures.push(
        `docs/CONTENU-PRODUIT.md écrit « ${domain} | ${ecrite.numbers.join(' | ')} » là où la mesure donne ${attendu.join(' | ')} (métiers | terrains | axes | modules | chances)`
      );
    }
    if (ecrite.label !== FUNCTIONAL_DOMAINS_BY_ID[domain].label) {
      failures.push(
        `docs/CONTENU-PRODUIT.md nomme le domaine « ${domain} » « ${ecrite.label} » là où le produit l'affiche « ${FUNCTIONAL_DOMAINS_BY_ID[domain].label} »`
      );
    }
  });

  ALL_DOMAIN_IDS.forEach((domain) => {
    if (!cellules.some((c) => c.domain === domain)) {
      failures.push(`docs/CONTENU-PRODUIT.md n'a pas de ligne « ${domain} » dans son tableau par domaine`);
    }
  });
}

// ——— 2. Ailleurs dans docs/, un chiffre doit se retrouver dans la mesure ———
//
// Le mot « lignes » reste hors du scan : il dit aussi la longueur d'un fichier ou
// le nombre de cartes posées dans ClickUp, et rien de tout cela n'est le catalogue.

function valeurDe(cle: string): number {
  const trouve = compteurs.find((c) => c.cle === cle);
  if (!trouve) throw new Error(`Compteur interne absent : ${cle}`);
  return trouve.valeur;
}

const admissibles: Record<string, number[]> = {
  questions: compteurs.filter((c) => c.cle === 'questions' || c.cle.startsWith('questions.')).map((c) => c.valeur),
  modules: [valeurDe('modules'), valeurDe('modules.transversaux'), valeurDe('axes.modules.min'),
    valeurDe('axes.modules.max'), ...parDomaine.map((d) => d.modules)],
  domaines: [valeurDe('domaines'), valeurDe('referentiel.domaines')],
  metiers: [valeurDe('metiers'), valeurDe('metiers.sans.axe'), valeurDe('metiers.avec.chance.reelle'),
    valeurDe('axes.metiers.min'), valeurDe('axes.metiers.max'), valeurDe('paires.coeur'), valeurDe('paires.terrain'),
    valeurDe('referentiel.metiers.generiques'), valeurDe('referentiel.specialisations'),
    ...parDomaine.map((d) => d.metiers), ...parDomaine.map((d) => d.terrains)],
  axes: [valeurDe('axes'), valeurDe('axes.par.domaine.min'), valeurDe('axes.par.domaine.max'),
    ...parDomaine.map((d) => d.axes)],
};

/** Chiffres écrits dans docs/ pour autre chose que le catalogue : à assumer nommément. */
const HORS_CATALOGUE: { fichier: string; nombre: number; mot: string; raison: string }[] = [
  {
    fichier: 'BACKLOG.md',
    nombre: 23,
    mot: 'questions',
    raison:
      "la ligne IND02-F01 du backlog de référence écrit « 23 questions structurées en 6 sections » : ce chiffre est le sien, recopié tel quel, et non une mesure de mon catalogue",
  },
];

const MOTS = ['questions', 'question', 'modules', 'module', 'domaines', 'domaine', 'métiers', 'metiers', 'metier', 'axes', 'axe'];
const REGEX = new RegExp(`\\b(\\d{1,3})\\s+(${MOTS.join('|')})\\b`, 'g');

/** Le mot écrit dans le document -> la famille de mesures qui doit le porter. */
const CATEGORIES: Record<string, string> = {
  questions: 'questions',
  question: 'questions',
  modules: 'modules',
  module: 'modules',
  domaines: 'domaines',
  domaine: 'domaines',
  métiers: 'metiers',
  metiers: 'metiers',
  metier: 'metiers',
  axes: 'axes',
  axe: 'axes',
};

Object.keys(documents)
  .sort()
  .forEach((chemin) => {
    if (chemin === FICHE) return;
    const fichier = chemin.split('/').pop() ?? chemin;
    const corps = documents[chemin];
    let m: RegExpExecArray | null;
    REGEX.lastIndex = 0;
    while ((m = REGEX.exec(corps)) !== null) {
      const nombre = Number(m[1]);
      const mot = m[2];
      const cle = CATEGORIES[mot];
      const assume = HORS_CATALOGUE.some((e) => e.fichier === fichier && e.nombre === nombre && e.mot === mot);
      if (assume) continue;
      const liste = admissibles[cle] ?? [];
      if (!liste.includes(nombre)) {
        const avant = corps.slice(Math.max(0, m.index - 70), m.index).replace(/\r?\n/g, ' ');
        failures.push(
          `${fichier} écrit « ${m[0]} » : ce chiffre ne correspond à aucune mesure. Contexte : « …${avant.trim()}${m[0]} »`
        );
      }
    }
  });

HORS_CATALOGUE.forEach((e) => {
  const chemin = Object.keys(documents).find((c) => c.endsWith(`/${e.fichier}`));
  const corps = chemin ? documents[chemin] : undefined;
  if (!corps || !new RegExp(`\\b${e.nombre}\\s+${e.mot}\\b`).test(corps)) {
    failures.push(
      `src/checks/contenu.check.ts assume « ${e.nombre} ${e.mot} » dans ${e.fichier} (${e.raison}) alors que ce chiffre n'y apparaît plus : retire cette ligne.`
    );
  }
});

// ——— 3. Le référentiel reçu tient debout, et nos promesses dessus aussi ———
//
// Ce fichier ne se contente pas de recopier la base du fondateur : il ajoute trois
// choses qui viennent de nous (le domaine hôte, les poids d'axes, le rang de nos
// fiches). Chacune peut casser sans que rien d'autre ne le dise. C'est ici que ça
// se dit.

const uniques = (codes: string[]): string[] =>
  codes.filter((code, index) => codes.indexOf(code) !== index);

[['domaines', codesDomaines], ['fonctions', codesFonctions], ['métiers génériques', codesGeneriques],
  ['spécialisations', codesSpecialisations]].forEach(([niveau, codes]) => {
  const doublons = uniques(codes as string[]);
  if (doublons.length > 0) {
    failures.push(`Le référentiel donne deux fois le code « ${doublons.join(' », « ')} » au niveau ${niveau}`);
  }
});

const codesDomaine = new Set(codesDomaines);
const codesFonction = new Set(codesFonctions);
REFERENTIEL_SPECIALISATIONS.forEach((s) => {
  if (!codesDomaine.has(s.domaine)) failures.push(`${s.code} renvoie au domaine « ${s.domaine} », qui n'existe pas`);
  if (!codesFonction.has(s.fonction)) failures.push(`${s.code} renvoie à la fonction « ${s.fonction} », qui n'existe pas`);
  const parent = generiqueParCode.get(s.parent);
  if (!parent) {
    failures.push(`${s.code} se range sous le métier générique « ${s.parent} », qui n'existe pas`);
    return;
  }
  if (!s.definition.trim() || !s.formation.trim() || !s.debouches.trim() || s.competences.length === 0) {
    failures.push(`${s.code} (${s.libelle}) a une fiche incomplète : définition, compétences, formation et débouchés sont dus`);
  }
  if (parent.fonction !== s.fonction) {
    failures.push(
      `${s.code} se range sous ${s.parent} (${parent.libelle}) dont la fonction est ${parent.fonction}, alors que la ligne déclare ${s.fonction} : sa base corrigée ne laisse plus de lien approximatif, l'une des deux déclarations est fausse`
    );
  }
});

// Un métier que sa « Portée » dit qualifié par un domaine ne doit rien spécialiser d'un autre.
const domainesParGeneriqueQualifie = new Map<string, Set<string>>();
REFERENTIEL_SPECIALISATIONS.forEach((s) => {
  const generique = generiqueParCode.get(s.parent);
  if (!generique || !generique.qualifieParDomaine) return;
  const ensemble = domainesParGeneriqueQualifie.get(s.parent) ?? new Set<string>();
  ensemble.add(s.domaine);
  domainesParGeneriqueQualifie.set(s.parent, ensemble);
});
domainesParGeneriqueQualifie.forEach((domaines, code) => {
  if (domaines.size > 1) {
    failures.push(
      `${code} (${generiqueParCode.get(code)?.libelle}) est dit qualifié par un domaine mais spécialise ${domaines.size} domaines : ${[...domaines].join(', ')}`
    );
  }
});
const idsFiches = CROSS_OCCUPATIONS.map((o) => o.id);
const classees = new Set(fichesClassees);
idsFiches.forEach((id) => {
  if (!classees.has(id)) failures.push(`La fiche « ${id} » n'est rangée sous aucun métier générique du référentiel`);
});
fichesClassees.forEach((id) => {
  if (!idsFiches.includes(id)) {
    failures.push(`METIER_PAR_FICHE classe « ${id} » : cette fiche n'est plus au catalogue, retire son rang`);
  }
  if (!codesGeneriques.includes(METIER_PAR_FICHE[id].code)) {
    failures.push(`La fiche « ${id} » se range sous « ${METIER_PAR_FICHE[id].code} », qui n'est pas un métier générique du référentiel`);
  }
});

REFERENTIEL_FONCTIONS.forEach((f) => {
  const somme = Number(f.axes.reduce((a, x) => a + x.poids, 0).toFixed(6));
  if (f.axes.length === 0 || somme !== 1) {
    failures.push(
      `La fonction ${f.code} (${f.libelle}) répartit son poids sur ${f.axes.length} axe(s) pour une somme de ${somme} : il faut 1, sinon son signal s'éteint ou gonfle dans le score`
    );
  }
});

/**
 * `src/data/postesNommes.ts` est la projection que lisent les écrans : des intitulés
 * et rien d'autre. Elle est recopiée du référentiel pour que le paquet livré n'embarque
 * pas les définitions et les formations, donc elle peut cesser d'y ressembler sans que
 * le référentiel bouge. Ici se dit le seul cas où la duplication est pardonnable : tant
 * que les deux tables concordent.
 */
let projeteCount = 0;
CROSS_OCCUPATIONS.forEach((fiche) => {
  const rang = METIER_PAR_FICHE[fiche.id];
  if (!rang) return;
  const attendu = REFERENTIEL_SPECIALISATIONS.filter((s) => s.parent === rang.code)
    .sort((a, b) => a.code.localeCompare(b.code));
  const projete = postesPourFiche(fiche.id);
  if (projete.postes.length > 0) projeteCount += 1;
  const approximationAttendue = attendu.length > 0 && rang.approximatif;

  attendu.forEach((s, index) => {
    const ligne = projete.postes[index];
    if (!ligne) {
      failures.push(
        `${s.code} (${s.libelle}) se range sous ${rang.code} donc derrière « ${fiche.id} », mais la projection n'a que ${projete.postes.length} poste(s) pour cette fiche`
      );
    } else if (ligne.code !== s.code || ligne.libelle !== s.libelle) {
      failures.push(
        `La projection écrit « ${ligne.code} ${ligne.libelle} » à la place de « ${s.code} ${s.libelle} » sous ${rang.code} : \`postesNommes.ts\` a dérivé du référentiel`
      );
    }
  });
  if (projete.postes.length > attendu.length) {
    failures.push(
      `La projection donne ${projete.postes.length} poste(s) à « ${fiche.id} », le référentiel n'en donne que ${attendu.length}`
    );
  }
  if (projete.approximation !== approximationAttendue) {
    failures.push(
      `« ${fiche.id} » est dit en approximation ${projete.approximation} dans la projection alors que le rang et ses postes disent ${approximationAttendue}`
    );
  }
});

console.log(
  `Contenu du produit — ${compteurs.length} compteurs comparés au catalogue, ${Object.keys(documents).length - 1} documents scannés, ${parDomaine.length} lignes de tableau relu, ${codesSpecialisations.length} spécialisations du référentiel relues, ${codesGeneriques.length} métiers génériques (${generiquesTransversaux} transversaux, ${generiquesQualifies} qualifiés par domaine), ${fichesClassees.length} fiches rangées (${rangsApproximatifs} rangs approximatifs), compétences de ${competencesMin} à ${competencesMax} par spécialisation, ${projeteCount} fiche(s) avec postes nommés dans la projection`
);

if (failures.length > 0) {
  console.error(`\n${failures.length} contrôle(s) en échec :`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  throw new Error('Le contenu écrit du produit ne correspond plus au catalogue.');
}

console.log('\nTous les contrôles passent.');
