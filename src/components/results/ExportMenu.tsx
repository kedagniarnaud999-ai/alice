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
      title: 'Mon Profil Ali Ce',
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
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleDownloadText = () => {
    const content = `
MON PROFIL ALI CE
================

Profil : ${result.profileType}
${result.profileDescription}

TALENTS NATURELS
${result.naturalTalents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

MOTIVATIONS
${result.motivationDrivers.map((m, i) => `${i + 1}. ${m}`).join('\n')}

CENTRES D'INTÉRÊT
${result.primaryInterests.map((i, idx) => `${idx + 1}. ${i}`).join('\n')}

POSITIONNEMENT CARRIÈRE
${result.careerStage}

FAISABILITÉ
${result.feasibilityAssessment}

PROCHAINES ACTIONS
${result.nextActions.map((a, i) => `${i + 1}. ${a}`).join('\n')}

---
Généré par Ali Ce - ${new Date().toLocaleDateString('fr-FR')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profil-ali-ce-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        <Printer className="w-4 h-4" />
        Imprimer
      </Button>
      <Button
        onClick={handleDownloadText}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Télécharger
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </Button>
    </div>
  );
};
