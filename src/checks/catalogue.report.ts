import { FunctionalDomainId } from '@/types/test';
import { ALL_DOMAIN_IDS } from '@/data/domains';
import { MODULE_CATALOG } from '@/data/modules';
import { CROSS_OCCUPATIONS, OCCUPATIONS_BY_ID } from '@/data/occupations';
import { SPECIALIZATIONS } from '@/data/specializations';
import { OPPORTUNITIES, Opportunity, opportunitiesForOccupation } from '@/data/opportunities';

const count = (list: unknown[]): number => list.length;
const real = (o: Opportunity): boolean => o.source !== 'demo';

console.log('=== Volumétrie ===');
console.log(`modules ${count(MODULE_CATALOG)} · métiers ${count(CROSS_OCCUPATIONS)} · axes ${count(SPECIALIZATIONS)} · chances ${count(OPPORTUNITIES)}`);

const byKind: Record<string, { demo: number; fourni: number; verifie: number }> = {};
OPPORTUNITIES.forEach((o) => {
  byKind[o.kind] = byKind[o.kind] || { demo: 0, fourni: 0, verifie: 0 };
  byKind[o.kind][o.source] += 1;
});
console.log('\n=== Chances par type et source ===');
Object.entries(byKind).forEach(([kind, counts]) =>
  console.log(`  ${kind.padEnd(14)} demo ${counts.demo} · fourni ${counts.fourni} · verifie ${counts.verifie}`)
);
console.log(`  avec url : ${OPPORTUNITIES.filter((o) => o.url).length}/${OPPORTUNITIES.length}`);

console.log('\n=== Couverture par domaine ===');
ALL_DOMAIN_IDS.forEach((domain) => {
  const occupations = CROSS_OCCUPATIONS.filter((o) => (o.core[domain] ?? 0) > 0);
  const axes = SPECIALIZATIONS.filter((s) => s.domainId === domain);
  const modules = MODULE_CATALOG.filter((m) => m.domains?.includes(domain));
  const chances = OPPORTUNITIES.filter((o) => o.domainIds.includes(domain) && real(o));
  const served = occupations.filter(
    (o) => opportunitiesForOccupation(o).filter(real).length > 0
  ).length;
  console.log(
    `  ${domain.padEnd(18)} metiers ${String(occupations.length).padStart(2)} (chances ${served}) · axes ${axes.length} · modules ${String(modules.length).padStart(2)} · chances reelles ${String(chances.length).padStart(3)}`
  );
});

console.log('\n=== Metiers sans formation reelle ===');
const starved = CROSS_OCCUPATIONS.filter((o) => opportunitiesForOccupation(o).filter(real).length === 0);
starved.forEach((o) => console.log(`  ${o.id.padEnd(36)} ${o.title}`));
console.log(`  ${starved.length}/${CROSS_OCCUPATIONS.length} metiers`);

console.log('\n=== Axes : reachabilite des metiers ===');
const coveredByAxes = new Set(SPECIALIZATIONS.flatMap((s) => s.occupationIds));
const unreachable = CROSS_OCCUPATIONS.filter((o) => !coveredByAxes.has(o.id));
console.log(`  ${coveredByAxes.size} metiers atteignables par un axe, ${unreachable.length} hors axe`);
unreachable.forEach((o) => console.log(`    ${o.id}`));

const unknown = [...coveredByAxes].filter((id) => !OCCUPATIONS_BY_ID[id]);
console.log(`  ids d'occupation inconnus references par un axe : ${unknown.length}${unknown.length ? ' -> ' + unknown.join(', ') : ''}`);

console.log('\n=== Modules mobilises ===');
const usedByAxes = new Set(SPECIALIZATIONS.flatMap((s) => s.moduleIds));
const crossCutting = MODULE_CATALOG.filter((m) => !m.domains || m.domains.length === 0);
console.log(`  modules cites par un axe : ${usedByAxes.size}/${MODULE_CATALOG.length}`);
console.log(`  modules transverses (sans domaine) : ${crossCutting.length}`);

console.log('\n=== Chances jamais atteignables ===');
const reachableIds = new Set(
  CROSS_OCCUPATIONS.flatMap((o) => opportunitiesForOccupation(o).map((c) => c.id))
);
const domainReachable = new Set(
  OPPORTUNITIES.filter((o) => o.domainIds.some((d) => ALL_DOMAIN_IDS.includes(d as FunctionalDomainId)))
    .map((o) => o.id)
);
const orphan = OPPORTUNITIES.filter((o) => !reachableIds.has(o.id) && !domainReachable.has(o.id));
console.log(`  par un metier : ${reachableIds.size}/${OPPORTUNITIES.length} · orphelines au sens strict : ${orphan.length}`);
const noDomain = OPPORTUNITIES.filter((o) => o.domainIds.length === 0);
console.log(`  sans aucun domaine (donc invisibles partout) : ${noDomain.length}`);

console.log('\n=== Rattachement des chances reelles ===');
const reels = OPPORTUNITIES.filter(real);
console.log(
  `  avec occupationIds non vide : ${reels.filter((o) => o.occupationIds.length > 0).length}/${reels.length}`
);
console.log(
  `  reperees par le seul domaine : ${reels.filter((o) => o.occupationIds.length === 0).length}/${reels.length}`
);

console.log('\n=== Profondeur par metier (chances reelles affichees) ===');
const depth = CROSS_OCCUPATIONS.map((o) => ({
  id: o.id,
  title: o.title,
  total: opportunitiesForOccupation(o).filter(real).length,
  formations: opportunitiesForOccupation(o, 'formation').filter(real).length,
  etablissements: opportunitiesForOccupation(o, 'etablissement').filter(real).length,
})).sort((a, b) => a.total - b.total);
depth.forEach((d) =>
  console.log(
    `  ${String(d.total).padStart(3)} (formations ${String(d.formations).padStart(2)}, etablissements ${String(
      d.etablissements
    ).padStart(2)})  ${d.title}`
  )
);

console.log('\n=== Chances reelles par domaine et par sorte ===');
ALL_DOMAIN_IDS.forEach((domain) => {
  const lines = OPPORTUNITIES.filter((o) => real(o) && o.domainIds.includes(domain));
  const n = (kind: string): number => lines.filter((o) => o.kind === kind).length;
  console.log(
    `  ${domain.padEnd(18)} etablissements ${String(n('etablissement')).padStart(2)} · formations ${String(
      n('formation')
    ).padStart(2)} · bourses ${String(n('bourse')).padStart(2)}`
  );
});

console.log('\n=== Liens ===');
const hosts = new Map<string, number>();
OPPORTUNITIES.filter((o) => o.url).forEach((o) => {
  const host = new URL(o.url as string).host;
  hosts.set(host, (hosts.get(host) ?? 0) + 1);
});
console.log(`  ${hosts.size} hotes distincts pour ${OPPORTUNITIES.filter((o) => o.url).length} urls`);
[...hosts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .forEach(([host, n]) => console.log(`    ${String(n).padStart(3)} ${host}`));
