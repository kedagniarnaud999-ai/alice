import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { postesPourFiche } from '@/data/postesNommes';

/**
 * Les postes que la base du fondateur nomme derrière une fiche.
 *
 * Une fiche n'est pas un poste : « gestionnaire de projet » se décline en chef de
 * projet WASH ou en chef de projet agroalimentaire, et ce sont ces titres que les
 * gens cherchent sur un contrat de travail. La liste se déplie — jamais elle ne
 * prend de place avant que quelqu'un la demande, et elle ne se clique pas : elle
 * renseigne, elle ne choisit rien.
 */
export const PostesNommes: React.FC<{ occupationId: string }> = ({ occupationId }) => {
  const { postes, approximation } = postesPourFiche(occupationId);
  const [open, setOpen] = useState(false);
  if (postes.length === 0) return null;

  return (
    <div className="mt-3">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 text-left text-sm font-medium text-primary-700 underline-offset-2 hover:underline"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
        {open
          ? 'Masquer les postes de ce métier'
          : `Les ${postes.length} poste(s) que ce métier recouvre`}
      </button>
      {open && (
        <>
          <ul className="mt-1.5 space-y-1 border-l-2 border-primary-200 pl-3">
            {postes.map((poste) => (
              <li key={poste.code} className="text-sm text-gray-700">
                {poste.libelle}
              </li>
            ))}
          </ul>
          {approximation && (
            <p className="mt-1.5 text-xs text-gray-500">
              Ces postes sont rangés là par approximation : le lien se défend, il n’est pas strict.
            </p>
          )}
        </>
      )}
    </div>
  );
};
