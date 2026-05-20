import React, { useEffect } from 'react';

interface AliTcheLandingProps {
  onStartTest: () => void;
  hasCompletedTest: boolean;
  onViewResults: () => void;
}

export const AliTcheLanding: React.FC<AliTcheLandingProps> = ({ 
  onStartTest, 
  hasCompletedTest,
  onViewResults 
}) => {
  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('shadow-md');
          header.classList.remove('shadow-sm');
        } else {
          header.classList.remove('shadow-md');
          header.classList.add('shadow-sm');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-sm shadow-primary/5 h-20">
        <nav className="flex justify-between items-center h-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-stack-md">
            <img 
              alt="Logo AliTché" 
              className="h-12 w-auto" 
              src="https://lh3.googleusercontent.com/aida/ADBb0uhfemC7rJh1iSkz5DvHOjf-q2SaiPsFEzSaBAc5AnEixBBStxo9FsCwdtsHi_hCtV-N-02i_KZGL4bUlf4V-HHMCx-uIZsj3ntWAPER7wLDvSrgziChDywBzXyf9RnKi2ZtE1ri839XsUDcHRxfA9JZQP54L9whL50eg3ePbBq2iqaILUSsfyDFZA0-MWVSJH-ET5kffl-eESlzYNuEfuAz5YpfNLBanNYbvia-FeWuN5b5JujCdCx2sLA"
            />
            <span className="font-headline-md text-headline-md font-bold text-primary hidden md:block">
              AliTché
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-gutter">
            <a 
              className="text-primary font-bold border-b-2 border-secondary font-body-md text-body-md px-2 py-1 relative active-nav-indicator" 
              href="#"
            >
              Orientation
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" 
              href="#"
            >
              Career Paths
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" 
              href="#"
            >
              Schools
            </a>
            <a 
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" 
              href="#"
            >
              Mentors
            </a>
          </div>
          
          <div className="flex items-center gap-stack-md">
            <button className="hidden sm:block text-primary hover:bg-surface-subtle transition-all duration-200 px-stack-md py-stack-sm rounded-full font-label-md">
              Log In
            </button>
            <button 
              onClick={hasCompletedTest ? onViewResults : onStartTest}
              className="bg-primary text-on-primary hover:opacity-90 active:scale-95 transition-all px-stack-lg py-stack-sm rounded-full font-label-md shadow-lg shadow-primary/20"
            >
              {hasCompletedTest ? 'Voir Résultats' : 'Sign Up'}
            </button>
          </div>
        </nav>
      </header>

      <main className="pt-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative hero-gradient overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg lg:py-24 grid lg:grid-cols-2 gap-stack-lg items-center">
            <div className="z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-stack-sm bg-surface-container-highest px-stack-md py-stack-sm rounded-full mb-stack-lg">
                <span className="material-symbols-outlined text-primary text-[18px]">explore</span>
                <span className="text-label-md text-primary">
                  Une expérience claire pour mieux vous situer
                </span>
              </div>
              
              <h1 className="font-display-lg text-display-lg text-primary leading-tight mb-stack-md">
                Donnez une direction <span className="text-secondary-container">plus nette</span> à votre parcours.
              </h1>
              
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-xl mx-auto lg:mx-0">
                AliTché aide les étudiants, jeunes diplômés et professionnels à mieux comprendre leur profil, 
                à clarifier leurs points d'appui et à identifier des prochaines étapes réalistes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-stack-md justify-center lg:justify-start">
                <button 
                  onClick={onStartTest}
                  className="bg-primary text-on-primary px-stack-lg py-4 rounded-full font-label-md flex items-center justify-center gap-2 hover:shadow-xl transition-all shadow-primary/25"
                >
                  Découvrir mon profil
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="border-2 border-primary text-primary px-stack-lg py-4 rounded-full font-label-md hover:bg-surface-subtle transition-all">
                  Accéder à mon espace
                </button>
              </div>
              
              <div className="flex flex-wrap gap-gutter mt-stack-lg justify-center lg:justify-start text-on-surface-variant opacity-75">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-success-emerald text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-label-sm">Parcours guidé</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-success-emerald text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-label-sm">Résultats utiles</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-success-emerald text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="text-label-sm">Progression visible</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img 
                  alt="Group of students" 
                  className="w-full h-auto object-cover aspect-[4/3]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXqg6UpKNqnoxQKXilU_arF5PeiOJV5ojJGacWIXTJ_6kzi7Xmwj33JryAEahNmrDRlhW66-JbDlorKgXroGCaghwGg-rAXmHgRraTXn1bq-yAsCLpOTAQ22ZxyqLuLp2SSIO0_bKHPjtVXtw93j8yVoe8O6MBLauTt0lHqw23EtKu1vhxhJ0QScjOQ-g0SHQoxwa-H_LNYbUvp-Ldu5bVbr6AV_Wqh2XEwLemynCfZ0-vgE1BWIaCwPkFi_ChN3IVZlcqslXCQ2Y"
                />
              </div>
              
              {/* Floating Card Element */}
              <div className="absolute -bottom-8 -left-8 bg-surface p-stack-md rounded-xl shadow-xl border border-outline-variant max-w-[240px] hidden md:block">
                <div className="flex items-center gap-stack-sm mb-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  </div>
                  <span className="text-label-md font-bold">Progression</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-container w-3/4 h-full"></div>
                </div>
                <p className="text-label-sm text-on-surface-variant mt-2">
                  Votre lecture de profil est prête à 75%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-24 bg-surface-bright">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
                Une approche centrée sur l'humain
              </h2>
              <div className="h-1 w-20 bg-secondary-container mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-gutter">
              {/* Card 1 */}
              <div className="bg-white p-stack-lg rounded-xl border border-outline-variant card-hover group">
                <div className="w-16 h-16 bg-primary-container/10 rounded-xl flex items-center justify-center mb-stack-lg group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-[32px]">person_search</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">
                  Une lecture plus humaine
                </h3>
                <p className="text-on-surface-variant font-body-md">
                  Des formulations simples, concrètes et professionnelles pour mieux comprendre 
                  votre situation actuelle et vos besoins.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-stack-lg rounded-xl border border-outline-variant card-hover group">
                <div className="w-16 h-16 bg-primary-container/10 rounded-xl flex items-center justify-center mb-stack-lg group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-[32px]">school</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">
                  Une orientation utile
                </h3>
                <p className="text-on-surface-variant font-body-md">
                  Le parcours relie votre profil, vos motivations et vos prochaines étapes au lieu 
                  de rester dans des concepts purement théoriques.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-stack-lg rounded-xl border border-outline-variant card-hover group">
                <div className="w-16 h-16 bg-primary-container/10 rounded-xl flex items-center justify-center mb-stack-lg group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-[32px]">account_balance_wallet</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">
                  Une perspective durable
                </h3>
                <p className="text-on-surface-variant font-body-md">
                  Vous pouvez ensuite retrouver vos modules, vos résultats et votre progression 
                  dans un même espace personnel sécurisé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-label-md text-secondary uppercase tracking-widest font-bold">
                  Comment ça se passe
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary mt-stack-sm mb-stack-lg">
                  Un parcours simple, lisible et progressif
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
                  Commencez par un diagnostic guidé, obtenez une lecture claire de votre profil 
                  puis poursuivez avec des recommandations et des modules adaptés.
                </p>
                <button 
                  onClick={onStartTest}
                  className="bg-primary text-on-primary px-stack-lg py-4 rounded-full font-label-md flex items-center gap-2 hover:shadow-xl transition-all group"
                >
                  Lancer le parcours
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
                </button>
              </div>
              
              <div className="space-y-stack-lg relative">
                <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-primary/10"></div>
                
                {/* Step 1 */}
                <div className="flex gap-stack-lg relative z-10 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary text-[24px]">quiz</span>
                  </div>
                  <div className="pt-2">
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                      ÉTAPE 01
                    </span>
                    <h4 className="font-headline-md text-headline-md text-primary mt-2">
                      Vous répondez à un parcours guidé
                    </h4>
                    <p className="text-on-surface-variant mt-2">
                      Quelques minutes pour mieux faire ressortir vos talents, vos intérêts et vos moteurs.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex gap-stack-lg relative z-10 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary text-[24px]">analytics</span>
                  </div>
                  <div className="pt-2">
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                      ÉTAPE 02
                    </span>
                    <h4 className="font-headline-md text-headline-md text-primary mt-2">
                      Vous recevez une lecture de votre profil
                    </h4>
                    <p className="text-on-surface-variant mt-2">
                      Un rendu clair qui vous aide à mieux comprendre ce qui vous correspond vraiment.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex gap-stack-lg relative z-10 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="material-symbols-outlined text-primary text-[24px]">flag</span>
                  </div>
                  <div className="pt-2">
                    <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-sm font-bold">
                      ÉTAPE 03
                    </span>
                    <h4 className="font-headline-md text-headline-md text-primary mt-2">
                      Vous poursuivez avec des repères concrets
                    </h4>
                    <p className="text-on-surface-variant mt-2">
                      Des pistes, des actions et une progression que vous pouvez retrouver ensuite dans votre espace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <span className="text-secondary-container font-bold tracking-widest uppercase text-label-sm">
              Déjà inscrit ?
            </span>
            <h2 className="font-display-lg text-display-lg mt-stack-sm mb-stack-lg">
              Retrouvez simplement votre espace personnel
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-stack-lg opacity-90">
              Accédez à votre profil, à vos résultats et à votre progression pour reprendre là où vous en étiez.
            </p>
            <button className="bg-white text-primary px-12 py-4 rounded-full font-label-md hover:bg-primary-fixed transition-all shadow-xl">
              Me connecter
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low w-full pt-16 pb-8 border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  alt="AliTché Logo" 
                  className="h-12 w-auto" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhfemC7rJh1iSkz5DvHOjf-q2SaiPsFEzSaBAc5AnEixBBStxo9FsCwdtsHi_hCtV-N-02i_KZGL4bUlf4V-HHMCx-uIZsj3ntWAPER7wLDvSrgziChDywBzXyf9RnKi2ZtE1ri839XsUDcHRxfA9JZQP54L9whL50eg3ePbBq2iqaILUSsfyDFZA0-MWVSJH-ET5kffl-eESlzYNuEfuAz5YpfNLBanNYbvia-FeWuN5b5JujCdCx2sLA"
                />
                <span className="font-headline-md text-headline-md font-bold text-primary">
                  AliTché
                </span>
              </div>
              <p className="text-on-surface-variant font-body-md">
                Donnez une direction plus nette à votre parcours.
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-white shadow-sm border border-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined text-[20px]">hub</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-white shadow-sm border border-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-label-md text-primary uppercase tracking-wider mb-6">Plateforme</h5>
              <ul className="space-y-4 text-on-surface-variant font-body-md">
                <li><a className="hover:text-primary transition-colors" href="#">Orientation</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Métiers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Écoles</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Mentors</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-label-md text-primary uppercase tracking-wider mb-6">Support</h5>
              <ul className="space-y-4 text-on-surface-variant font-body-md">
                <li><a className="hover:text-primary transition-colors" href="#">Centre d'aide</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-label-md text-primary uppercase tracking-wider mb-6">LÉGAL</h5>
              <ul className="space-y-4 text-on-surface-variant font-body-md">
                <li><a className="hover:text-primary transition-colors" href="#">Mentions Légales</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Confidentialité</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">CGU</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-label-sm text-on-surface-variant opacity-70">
              © 2024 AliTché. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span>Français (France)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
