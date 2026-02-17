import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const modules = [
  {
    title: 'Construire un CV percutant pour l\'Afrique',
    description: 'Apprenez à créer un CV qui se démarque sur le marché africain francophone. Découvrez les formats préférés, les sections essentielles et les erreurs à éviter.',
    duration: '2 heures',
    difficulty: 'Débutant',
    category: 'Employabilité',
    skills: ['Rédaction CV', 'Personal Branding', 'Communication'],
    format: 'Vidéo',
    isFree: true,
    order: 1,
  },
  {
    title: 'Optimiser votre profil LinkedIn',
    description: 'Transformez votre profil LinkedIn en outil de networking professionnel puissant. Attirez les recruteurs et développez votre réseau.',
    duration: '1.5 heures',
    difficulty: 'Débutant',
    category: 'Employabilité',
    skills: ['LinkedIn', 'Networking', 'Personal Branding'],
    format: 'Interactif',
    isFree: true,
    order: 2,
  },
  {
    title: 'Introduction au Développement Web',
    description: 'Découvrez les bases du HTML, CSS et JavaScript. Créez votre première page web interactive et comprenez comment fonctionne le web.',
    duration: '4 semaines',
    difficulty: 'Débutant',
    category: 'Technologie',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    format: 'Vidéo',
    isFree: true,
    order: 3,
  },
  {
    title: 'Marketing Digital pour Débutants',
    description: 'Maîtrisez les fondamentaux du marketing digital, des réseaux sociaux et du content marketing. Lancez vos premières campagnes.',
    duration: '3 semaines',
    difficulty: 'Débutant',
    category: 'Business',
    skills: ['Marketing Digital', 'Réseaux Sociaux', 'Content Marketing', 'SEO'],
    format: 'Vidéo',
    isFree: true,
    order: 4,
  },
  {
    title: 'Excel pour Professionnels',
    description: 'De la saisie de données aux tableaux croisés dynamiques, devenez efficace avec Excel. Automatisez vos tâches et analysez vos données.',
    duration: '2 semaines',
    difficulty: 'Intermédiaire',
    category: 'Gestion',
    skills: ['Excel', 'Analyse de données', 'Productivité'],
    format: 'Interactif',
    isFree: true,
    order: 5,
  },
  {
    title: 'Design Thinking & Innovation',
    description: 'Apprenez à résoudre des problèmes de manière créative avec la méthodologie du Design Thinking. Innovez et proposez des solutions centrées utilisateur.',
    duration: '3 semaines',
    difficulty: 'Intermédiaire',
    category: 'Créativité',
    skills: ['Design Thinking', 'Innovation', 'Problem Solving', 'Créativité'],
    format: 'Projet',
    isFree: false,
    order: 6,
  },
  {
    title: 'Communication Professionnelle Efficace',
    description: 'Développez vos compétences de communication orale et écrite en milieu professionnel. Faites passer vos messages avec impact.',
    duration: '2 semaines',
    difficulty: 'Débutant',
    category: 'Éducation',
    skills: ['Communication', 'Présentation', 'Écoute Active', 'Rédaction'],
    format: 'Vidéo',
    isFree: true,
    order: 7,
  },
  {
    title: 'Entrepreneuriat : De l\'idée au lancement',
    description: 'Transformez votre idée en projet entrepreneurial viable. Business model, financement, stratégie de lancement.',
    duration: '6 semaines',
    difficulty: 'Intermédiaire',
    category: 'Business',
    skills: ['Entrepreneuriat', 'Business Plan', 'Pitch', 'Gestion', 'Finance'],
    format: 'Projet',
    isFree: false,
    order: 8,
  },
  {
    title: 'Analyse de Données avec Python',
    description: 'Découvrez l\'analyse de données avec Python, Pandas et Matplotlib. Manipulez, analysez et visualisez vos données.',
    duration: '5 semaines',
    difficulty: 'Intermédiaire',
    category: 'Technologie',
    skills: ['Python', 'Pandas', 'Data Analysis', 'Visualisation'],
    format: 'Projet',
    isFree: true,
    order: 9,
  },
  {
    title: 'Gestion de Projet Agile',
    description: 'Maîtrisez les méthodes agiles (Scrum, Kanban) pour gérer vos projets efficacement. Devenez un chef de projet moderne.',
    duration: '4 semaines',
    difficulty: 'Intermédiaire',
    category: 'Gestion',
    skills: ['Gestion de Projet', 'Agile', 'Scrum', 'Organisation', 'Leadership'],
    format: 'Vidéo',
    isFree: false,
    order: 10,
  },
  {
    title: 'UI/UX Design avec Figma',
    description: 'Créez des interfaces utilisateur professionnelles avec Figma. Prototypez vos idées et collaborez en équipe.',
    duration: '4 semaines',
    difficulty: 'Débutant',
    category: 'Créativité',
    skills: ['UI Design', 'UX Design', 'Figma', 'Prototypage'],
    format: 'Projet',
    isFree: true,
    order: 11,
  },
  {
    title: 'Techniques de Formation et Pédagogie',
    description: 'Apprenez à transmettre vos connaissances efficacement. Concevez des formations engageantes et évaluez les apprentissages.',
    duration: '3 semaines',
    difficulty: 'Intermédiaire',
    category: 'Éducation',
    skills: ['Pédagogie', 'Formation', 'Animation', 'Évaluation'],
    format: 'Vidéo',
    isFree: true,
    order: 12,
  },
  {
    title: 'Développement Mobile avec React Native',
    description: 'Créez des applications mobiles iOS et Android avec React Native. Un code, deux plateformes.',
    duration: '6 semaines',
    difficulty: 'Avancé',
    category: 'Technologie',
    skills: ['React Native', 'Mobile Development', 'JavaScript', 'API'],
    format: 'Projet',
    isFree: false,
    order: 13,
  },
  {
    title: 'Stratégie de Contenu & Copywriting',
    description: 'Rédigez du contenu qui convertit. Storytelling, SEO, persuasion : les secrets du copywriting efficace.',
    duration: '3 semaines',
    difficulty: 'Intermédiaire',
    category: 'Business',
    skills: ['Copywriting', 'Content Strategy', 'SEO', 'Storytelling'],
    format: 'Vidéo',
    isFree: false,
    order: 14,
  },
  {
    title: 'Leadership & Management d\'Équipe',
    description: 'Développez vos compétences de leader. Motivez, inspirez et gérez efficacement votre équipe.',
    duration: '4 semaines',
    difficulty: 'Intermédiaire',
    category: 'Gestion',
    skills: ['Leadership', 'Management', 'Motivation', 'Communication'],
    format: 'Vidéo',
    isFree: false,
    order: 15,
  },
];

async function main() {
  console.log('🌱 Starting seed...');

  console.log('🗑️  Cleaning existing data...');
  await prisma.learningModule.deleteMany();

  console.log('📚 Creating learning modules...');
  for (const module of modules) {
    await prisma.learningModule.create({
      data: module,
    });
  }

  console.log(`✅ Created ${modules.length} learning modules`);
  console.log('✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
