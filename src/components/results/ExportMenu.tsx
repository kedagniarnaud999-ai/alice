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
      text: `J'ai decouvert mon profil professionnel : ${result.profileType}`,
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
      alert('Lien copie dans le presse-papier !');
    }
  };

  const handleDownloadText = () => {
    const content = `
MON PROFIL ALITCHE
==================

Profil : ${result.profileType}
${result.profileDescription}

TALENTS NATURELS
${result.naturalTalents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

MOTIVATIONS
${result.motivationDrivers.map((m, i) => `${i + 1}. ${m}`).join('\n')}

CENTRES D'INTERET
${result.primaryInterests.map((interest, idx) => `${idx + 1}. ${interest}`).join('\n')}

POSITIONNEMENT CARRIERE
${result.careerStage}

FAISABILITE
${result.feasibilityAssessment}

PROCHAINES ACTIONS
${result.nextActions.map((action, i) => `${i + 1}. ${action}`).join('\n')}

---
Genere par AliTché - ${new Date().toLocaleDateString('fr-FR')}
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
        Telecharger
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
