import React from 'react';

export interface ChipOption {
  value: string;
  label: string;
}

interface ChipFilterProps {
  options: readonly ChipOption[];
  value: string;
  onChange: (value: string) => void;
  /** Le petit libellé de ligne, en majuscules discrètes : « Écoles et financements ». */
  label?: string;
}

/**
 * Des chips mono-sélection. Un clic ne quitte jamais l'écran : il change ce qui
 * est montré en dessous, ce qui garde l'écran sous la limite de trois éléments.
 */
export const ChipFilter: React.FC<ChipFilterProps> = ({ options, value, onChange, label }) => (
  <div className="mt-3 flex flex-wrap items-center gap-2">
    {label && (
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
    )}
    {options.map((option) => {
      const active = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={active}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            active
              ? 'border-primary-300 bg-primary-50 text-primary-700'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
