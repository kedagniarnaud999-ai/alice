import React from 'react';
import { AlertTriangle, TerminalSquare } from 'lucide-react';
import { supabaseConfig } from '@/config/env';
import { BrandMark } from '@/components/brand/BrandMark';

const MissingState = ({ vars }: { vars: string[] }) => (
  <>
    <p className="mt-1 text-slate-300">
      {vars.length === 2
        ? 'Aucune variable Supabase ne nous est parvenue.'
        : `La variable ${vars[0]} manque.`}{' '}
      Le site ne peut donc pas joindre votre projet Supabase.
    </p>
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/70">Variables attendues</p>
      <ul className="mt-3 space-y-2 font-mono text-sm text-slate-100">
        <li>VITE_SUPABASE_URL</li>
        <li>VITE_SUPABASE_ANON_KEY</li>
      </ul>
    </div>
  </>
);

const InvalidState = ({ reason }: { reason: string }) => (
  <>
    <p className="mt-1 text-slate-300">Les variables sont présentes mais exploitables seulement en partie.</p>
    <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
      {reason}
    </div>
  </>
);

export const ConfigErrorScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff_45%,_#f8fafc_100%)] px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/20 sm:p-10">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-white/10 px-4 py-3 backdrop-blur">
            <BrandMark className="h-12 w-12" />
            <div>
              <p className="text-xl font-semibold">AliTché</p>
              <p className="text-xs uppercase tracking-[0.24em] text-blue-100/80">
                Orientation . Formation . Emploi
              </p>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-medium text-amber-200">
            <AlertTriangle className="h-4 w-4" />
            Configuration incomplète
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Impossible de démarrer l&apos;authentification
          </h1>

          {supabaseConfig.status === 'missing' ? (
            <MissingState vars={supabaseConfig.vars} />
          ) : supabaseConfig.status === 'invalid' ? (
            <InvalidState reason={supabaseConfig.reason} />
          ) : null}
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-2xl shadow-slate-200/60 sm:p-8">
          <div className="flex items-center gap-2 text-slate-900">
            <TerminalSquare className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Comment rétablir la situation</h2>
          </div>

          <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                1
              </span>
              <span>
                Ouvrez le tableau de bord Supabase et vérifiez que le projet est bien actif. Un projet
                en pause sur le plan gratuit rend son domaine injoignable, ce qui produit exactement
                l&apos;erreur « Failed to fetch » côté navigateur.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                2
              </span>
              <span>
                Copiez le gabarit avec le point initial&nbsp;: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">cp .env.example .env.local</code>. Un
                fichier nommé <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">env.local</code> sans point est ignoré par Vite.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                3
              </span>
              <span>
                Renseignez l&apos;URL et la clé publique (Settings &gt; API), puis relancez{' '}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px]">npm run dev</code> : Vite ne recharge les variables qu&apos;au démarrage.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                4
              </span>
              <span>
                En production, les mêmes variables vivent dans Vercel (Settings &gt; Environment
                Variables) et nécessitent un nouveau déploiement pour être intégrées au bundle.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
