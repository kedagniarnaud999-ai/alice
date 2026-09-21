import React from 'react';
import { ProfileResult } from '@/types/test';
import { Button } from '@/components/ui/Button';
import { Download, Share2, Printer } from 'lucide-react';

interface ExportMenuProps {
  result: ProfileResult;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ result }) => {
  const handleExportPDF = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Mon Profil AliTché',
      text: `J'ai découvert mon profil professionnel : ${result.profileType}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const handleDownloadText = () => {
    const content = `
MON PROFIL ALITCHÉ
==================

Profil : ${result.profileType}
${result.profileDescription}

TALENTS NATURELS
${result.naturalTalents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

MOTIVATIONS
${result.motivationDrivers.map((m, i) => `${i + 1}. ${m}`).join('\n')}

CENTRES D'INTÉRÊT
${result.primaryInterests.map((interest, idx) => `${idx + 1}. ${interest}`).join('\n')}

POSITIONNEMENT CARRIÈRE
${result.careerStage}

FAISABILITÉ
${result.feasibilityAssessment}

PROCHAINES ACTIONS
${result.nextActions.map((action, i) => `${i + 1}. ${action}`).join('\n')}

DOMAINES DE CARRIÈRE RECOMMANDÉS
${(result.domains ?? [])
  .filter((d) => !d.excluded && d.rank > 0)
  .sort((a, b) => a.rank - b.rank)
  .map((d) => `${d.rank}. ${d.label} (${d.normalized}%)`)
  .join('\n')}

ÉCARTÉS
${(result.domains ?? []).filter((d) => d.excluded).map((d) => d.label).join(', ') || 'Aucun'}

---
Généré par AliTché - ${new Date().toLocaleDateString('fr-FR')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `profil-alitche-${Date.now()}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={handleExportPDF}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Printer className="h-4 w-4" />
        Imprimer
      </Button>
      <Button
        onClick={handleDownloadText}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Télécharger
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Partager
      </Button>
    </div>
  );
};
