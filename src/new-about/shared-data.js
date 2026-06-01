// shared-data.js — All content data for both realities
// This ensures content parity: same info, different presentation.

export const bio = {
  name: 'Vedhant Bidari',
  greeting: 'Hi, I\'m Vedhant Bidari!',
  tagline: 'Creative Technologist & Web Developer',
  shortBio: 'I\'m Vedhant Bidari — a developer, designer, and relentless builder who thrives at the intersection of technology and creativity.',
  longBio: 'From crafting pixel-perfect interfaces to engineering robust full-stack systems, I approach every project with the same philosophy: Build with purpose, ship with precision. Whether it\'s a late-night debugging session or an early-morning brainstorm, I\'m driven by the art of turning complex problems into elegant, impactful solutions.',
  introBio: 'I am a B.Tech Computer Science student from VIT-AP University passionate about building digital experiences that matter. Blending creativity with code to craft seamless, interactive, and impactful web solutions.',
  roles: ['Full Stack Developer', 'Tech Enthusiast'],
  university: 'VIT-AP University',
  degree: 'B.Tech Computer Science',
  avatar: '/images/vedhant-about.jpeg',
  heroOff: '/images/hero-off.webp',
  heroOn: '/images/hero-on.webp',
  email: 'vedhantvarnika123@gmail.com',
  resumeUrl: '/resume.pdf',
};

export const journey = [
  {
    year: '2025',
    title: 'Hackathon Champion',
    desc: 'Won multiple hackathons and coding competitions',
    icon: 'trophy',
    level: 'WORLD 3-1',
  },
  {
    year: '2023',
    title: 'Learning & Building',
    desc: 'Mastered modern web technologies and frameworks',
    icon: 'graduation',
    level: 'WORLD 2-1',
  },
  {
    year: '2023',
    title: 'Started Coding Journey',
    desc: 'Began exploring web development and programming',
    icon: 'code',
    level: 'WORLD 1-1',
  },
];

export const achievements = [
  { title: 'Hackathon Special Recognition', event: 'Postathon Hackathon 25', place: '1st Place', emoji: '🏆', tier: 'gold' },
  { title: 'Runner Up', event: 'Vitaura 25 - Hackathon', place: '2nd Place', emoji: '🥈', tier: 'silver' },
  { title: 'Best Project', event: 'Nuclear Reactor Anomaly Detection System', place: 'Top 10', emoji: '🎯', tier: 'bronze' },
  { title: 'Interested in', event: 'Web Dev & Basketball', place: 'Hobby', emoji: '⭐', tier: 'special' },
  { title: 'Creative Solution', event: 'Problem Solving Comp', place: 'Top 3', emoji: '💡', tier: 'bronze' },
  { title: 'Capture the Flag', event: 'Hit the Hitler', place: 'Top 4', emoji: '🏆', tier: 'bronze' },
  { title: 'Want to Learn', event: 'Hacking', place: 'Kali Linux', emoji: '🚀', tier: 'special' },
];

export const skillCategories = [
  {
    title: 'Frontend Development',
    icon: 'code',
    color: '#cc5500',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'TypeScript'],
    retroIcon: '⚔️',
    retroLabel: 'ATTACK',
  },
  {
    title: 'Backend & APIs',
    icon: 'database',
    color: '#ffbf00',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
    retroIcon: '🛡️',
    retroLabel: 'DEFENSE',
  },
  {
    title: 'Crazy Stuff',
    icon: 'palette',
    color: '#ff6b35',
    skills: ['Basic Level Hacking', 'Kali Linux', 'Cryptography', 'Phishing', 'Github'],
    retroIcon: '🔮',
    retroLabel: 'MAGIC',
  },
];

export const socialLinks = [
  { label: 'Email', value: 'Vedhant B', link: 'mailto:vedhantvarnika123@gmail.com', color: '#cc5500', icon: 'mail', retroChar: '📧' },
  { label: 'GitHub', value: '@vedhant26', link: 'https://github.com/Vedhant26', color: '#6e40c9', icon: 'github', retroChar: '👾' },
  { label: 'LinkedIn', value: 'Vedhant Bidari', link: 'https://www.linkedin.com/in/vedhant-bidari/', color: '#0077b5', icon: 'linkedin', retroChar: '🏢' },
  { label: 'Instagram', value: '@vedhant_26', link: 'https://instagram.com/vedhant_26', color: '#e4405f', icon: 'instagram', retroChar: '📸' },
];

export const galleryImages = [
  { src: '/images/lorenzo-piloto1.jpeg', alt: 'Action shot 1' },
  { src: '/images/lorenzo-piloto2.jpeg', alt: 'Action shot 2' },
  { src: '/images/lofan/vbb.jpeg', alt: 'Fan moment 2' },
  { src: '/images/lorenzo-piloto7.jpeg', alt: 'Action shot 3' },
  { src: '/images/lorenzo-podio3.jpeg', alt: 'Podium celebration 1' },
  { src: '/images/dasdas.jpeg', alt: 'Podium celebration 2' },
];

export const footerLinks = [
  { icon: 'github', link: 'https://github.com/Vedhant26' },
  { icon: 'linkedin', link: 'https://www.linkedin.com/in/vedhant-bidari/' },
  { icon: 'twitter', link: 'https://twitter.com/' },
  { icon: 'instagram', link: 'https://instagram.com/vedhant_26' },
];
