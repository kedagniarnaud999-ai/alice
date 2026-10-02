import React, { useState } from 'react';
import { ChevronDown, MessageSquareText } from 'lucide-react';
import { CHOICE_RATIONALES } from '@/data/functions';

interface ChoiceReasonFormProps {
  /** Le choix que la question suit, tel que le candidat vient de le poser. */
  subject: string;
  tagIds: string[];
  note: string;
  onToggleTag: (id: string) => void;
  onNote: (value: string) => void;
  /** Plafond de la note libre : au-delà, la phrase partagée avec le choix serait tronquée. */
  maxNoteChars: number;
}

/**
 * Le « pourquoi ce choix ? » facultatif. Il reste replié et ne bloque jamais :
 * une question de plus sur le chemin d'un candidat décidé coûterait plus de
 * réponses que l'on en tirer. Ce qu'il rapporte, lui, se paie cash — « le test
 * n'a pas vu ce côté de moi » est la seule phrase qui dit au formulaire
 * d'orientation où il se trompe.
 */
export const ChoiceReasonForm: React.FC<ChoiceReasonFormProps> = ({
  subject,
  tagIds,
  note,
  onToggleTag,
  onNote,
  maxNoteChars,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
      >
        <MessageSquareText className="h-4 w-4" />
        {open ? 'Refermer la question' : 'Pourquoi ce choix ? (facultatif)'}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <fieldset className="mt-2 rounded-lg border border-gray-200 p-3">
          <legend className="px-1 text-xs font-medium uppercase tracking-wide text-gray-500">
            Pourquoi « {subject} » ?
          </legend>
          <p className="text-xs text-gray-600">
            Cochez ce qui vous ressemble, ajoutez une phrase si vous voulez. Rien n’est obligatoire
            ici : ces réponses servent à corriger le questionnaire, pas à vous noter.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {CHOICE_RATIONALES.map((entry) => {
              const picked = tagIds.includes(entry.id);
              return (
                <button
                  key={entry.id}
                  type="button"
                  aria-pressed={picked}
                  onClick={() => onToggleTag(entry.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    picked
                      ? 'border-primary-300 bg-primary-50 font-medium text-primary-800'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>

          <textarea
            value={note}
            maxLength={maxNoteChars}
            rows={2}
            onChange={(event) => onNote(event.target.value)}
            placeholder="Autre chose ? En une phrase."
            aria-label="Précision libre sur le choix de fonction"
            className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm text-gray-800 focus:border-primary-400 focus:outline-none"
          />
        </fieldset>
      )}
    </div>
  );
};
