import { Project, Experience, Education, Skill, ContactInfo } from '@/types';

export const contactInfo: ContactInfo = {
  email: 'jess.c.zhou@gmail.com',
  linkedin: 'https://linkedin.com/in/jessicaz-',
  github: 'https://github.com/jjcyz',
  instagram: 'https://www.instagram.com/_jessicazhou/',
};

export const projects: Project[] = [
  {
    id: 'destination-ai',
    title: 'Destination AI: AI-Powered Route Planning',
    description: 'An intelligent route planning application that uses AI to optimize travel routes, suggest efficient paths, and provide real-time navigation recommendations for seamless journey planning.',
    longDescription: 'Developed a sophisticated route planning platform leveraging AI algorithms to analyze multiple factors including traffic patterns, distance optimization, and user preferences. Features intelligent pathfinding, real-time route adjustments, and personalized recommendations for optimal travel experiences.',
    image: '/images/coding.PNG',
    technologies: ['Javascript', 'React', 'Next.js', 'AI', 'Google Maps', 'OpenWeatherMap'],
    liveUrl: 'https://destination-ai.vercel.app/',
    iframeUrl: 'https://destination-ai.vercel.app/',
    featured: true,
    category: 'ai',
  },
  {
    id: 'arcsphere',
    title: 'ArcSphere: AI Agents Powered By Groq',
    description: 'Developed a modern web application using Groq\'s LLaMA 3 70B model, featuring a chat interface for users to interact with AI agents.',
    longDescription: 'Built a sophisticated AI chat application leveraging Groq\'s lightning-fast inference API. Implemented custom system prompts to define specific AI agent capabilities, created a responsive React interface with real-time messaging, and integrated advanced error handling for robust user experience.',
    image: '/images/coding.PNG',
    technologies: ['JavaScript', 'ReactJS', 'Vite', 'NodeJS', 'Groq'],
    liveUrl: 'https://arcsphere.vercel.app/',
    iframeUrl: 'https://arcsphere.vercel.app/',
    featured: true,
    category: 'ai',
  },
  {
    id: 'chatroom',
    title: 'Client-Server Chatroom Application',
    description: 'Developed a multi-threaded chat server in C++ using socket programming, supporting concurrent user connections with real-time message broadcasting.',
    longDescription: 'Implemented a high-performance chat server with sub-100ms message delivery latency. Features include concurrent user management, real-time message broadcasting, robust error handling, and efficient memory management for scalable communication.',
    image: '/images/coding.PNG',
    technologies: ['C++', 'Socket Programming', 'Multi-threading'],
    githubUrl: 'https://github.com/jjcyz/client-server-chat',
    featured: true,
    category: 'systems',
  },
  {
    id: 'blood-vessel-segmentation',
    title: 'Blood Vessel Segmentation',
    description: 'Developed a 3D U-Net architecture for precise pixel-wise classification of vasculature structures, automating kidney segmentation and reducing manual processing time by 85%.',
    longDescription: 'Created an innovative two-step training pipeline combining supervised pretraining with denoising techniques. Built an end-to-end pipeline processing TIFF scans and generating 3D segmentation masks, achieving state-of-the-art results in medical image analysis.',
    image: '/images/ml_paper_pipeline.PNG',
    technologies: ['Python', 'Tensorflow', 'PyTorch', 'Machine Learning'],
    paperUrl: 'https://openreview.net/forum?id=kl3kxvM4Nn#discussion',
    featured: true,
    category: 'research',
  },
  {
    id: 'vae-comparison',
    title: 'Variational Autoencoder (VAE) Comparison',
    description: 'Implemented and compared Bernoulli and Gaussian VAEs using PyTorch, achieving 90% reconstruction accuracy on the MNIST dataset with a compact 40-dimensional latent space.',
    longDescription: 'Built comprehensive visualization pipeline generating 6 different analysis outputs including loss comparisons and reconstruction quality metrics. Optimized model training through systematic hyperparameter tuning and implemented advanced data preprocessing techniques.',
    image: '/images/autonomousplanter.PNG',
    technologies: ['Python', 'PyTorch', 'Data Visualization'],
    githubUrl: 'https://github.com/jjcyz/bernoulli_gaussian_vae',
    featured: true,
    category: 'research',
  },
];

export const experiences: Experience[] = [
  {
    id: 'campus-partner-perplexity',
    title: 'Campus Partner',
    company: 'Perplexity AI',
    location: 'Vancouver, CA',
    startDate: '2025-09',
    endDate: 'present',
    description: [
      'Represent Perplexity AI on campus and promote AI-powered search technology to students',
      'Organize and host workshops and events to demonstrate Perplexity\'s capabilities in research and academic work',
      'Build relationships with academic departments and student organizations to increase AI adoption',
    ],
    technologies: ['AI', 'Community Building', 'Event Management'],
  },
  {
    id: 'vp-technology-bolt',
    title: 'VP of Technology',
    company: 'UBC Data Analytics (BOLT)',
    location: 'Vancouver, CA',
    startDate: '2025-09',
    endDate: 'present',
    description: [
      'Lead the technical direction and strategy for UBC\'s premier data analytics student organization',
      'Oversee development of data science projects and technical workshops for 200+ members',
      'Manage technical infrastructure and ensure smooth operation of club events and competitions',
      'Mentor junior members in data analytics and technical project development',
    ],
    technologies: ['Data Analytics', 'Python', 'Leadership', 'JavaScript', 'React'],
  },
  {
    id: 'software-developer-ux-hub',
    title: 'Software Developer',
    company: 'UBC UX Hub',
    location: 'Vancouver, CA',
    startDate: '2025-09',
    endDate: 'present',
    description: [
      'Develop user-centered web applications and digital tools for the UBC UX Hub community',
      'Collaborate with UX designers to implement responsive and accessible user interfaces',
      'Build and maintain the organization\'s website and internal tools using modern web technologies',
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'UX/UI Design', 'Web Development'],
  },
  {
    id: 'events-logistics-lead-gdsc',
    title: 'Events and Logistics Lead',
    company: 'Google Developer Student Club',
    location: 'Vancouver, CA',
    startDate: '2025-09',
    endDate: 'present',
    description: [
      'Plan and coordinate technical workshops, hackathons, and developer events for 300+ student members',
      'Manage event logistics including venue booking, speaker coordination, and resource allocation',
      'Collaborate with Google and industry partners to bring technology workshops to campus',
      'Lead a team of volunteers to ensure smooth execution of developer events and competitions',
    ],
    technologies: ['Event Management', 'Project Management', 'Leadership', 'Community Building'],
  },
  {
    id: 'software-engineer-intern',
    title: 'Software Engineer Intern',
    company: 'Polymuse',
    location: 'Vancouver, CA',
    startDate: '2025-05',
    endDate: '2025-09',
    description: [
      'Early startup work in AR and AI - coming soon ',
    ],
    technologies: ['JavaScript', 'React', 'Google Cloud Platform', 'Firebase'],
  },
  {
    id: 'researcher-blood-vessel',
    title: 'Research',
    company: 'Tsinghua University',
    location: 'Beijing, CN',
    startDate: '2024-09',
    endDate: '2025-01',
    description: [
      'Developed a 3D U-Net architecture for precise pixel-wise classification of vasculature structures',
      'Implemented an innovative two-step training pipeline with supervised pretraining and denoising techniques',
      'Built an end-to-end pipeline processing TIFF scans and generating 3D segmentation masks',
    ],
    technologies: ['Python', 'Tensorflow', 'PyTorch', 'Machine Learning'],
  },
  {
    id: 'student-mentor',
    title: 'Student Mentor',
    company: 'University of British Columbia',
    location: 'Vancouver, CA',
    startDate: '2023-11',
    endDate: '2023-12',
    description: [
      'Career guidance and academics',
    ],
    technologies: ['Leadership', 'Communication', 'Mentoring'],
  },
];

export const education: Education[] = [
  {
    id: 'ubc-bucs',
    institution: 'University of British Columbia',
    degree: 'Combined Major in Computer Science and Business (BUCS)',
    location: 'Vancouver, CA',
    startDate: '2022-09',
    endDate: '2026-04',
    description: 'Data Structure \& Algorithms, Relational Databases, Data Analytics, Computer Architecture, Business Strategy',
  },
  {
    id: 'tsinghua-exchange',
    institution: 'Tsinghua University',
    degree: 'Exchange Studies at SEM & Department of Computer Science and Technology',
    location: 'Beijing, CN',
    startDate: '2024-02',
    endDate: '2025-01',
    description: 'ML/AI, Computer Systems, Distributed Database Systems, Financial Technologies',
  },
];

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'C/C++', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  { name: 'R', category: 'languages' },
  { name: 'HTML/CSS', category: 'languages' },

  // Frameworks & Libraries
  { name: 'ReactJS', category: 'frameworks' },
  { name: 'NodeJS', category: 'frameworks' },
  { name: 'TailwindCSS', category: 'frameworks' },
  { name: 'PyTorch', category: 'frameworks' },
  { name: 'TensorFlow', category: 'frameworks' },
  { name: 'Next.js', category: 'frameworks' },

  // Cloud & Infrastructure
  { name: 'AWS', category: 'cloud' },
  { name: 'Google Cloud Platform', category: 'cloud' },
  { name: 'Docker', category: 'cloud' },
  { name: 'Firebase', category: 'cloud' },

  // Databases
  { name: 'MongoDB', category: 'databases' },
  { name: 'MySQL', category: 'databases' },

  // AI
  { name: 'AI Agents', category: 'ai' },
  { name: 'Context Engineering', category: 'ai' },
  { name: 'Automations', category: 'ai' },

  // Tools & Technologies
  { name: 'Git', category: 'tools' },
  { name: 'Pytest', category: 'tools' },

  // Certifications (not inlcuded)
  { name: 'AWS Cloud Solutions Architect', category: 'certifications' },
  { name: 'Google Cloud Essentials', category: 'certifications' },
  { name: 'SAP Cloud Application Programming Model', category: 'certifications' },
  { name: 'SAP Commerce Cloud and SAP S/4 HANA Cloud Integrations', category: 'certifications' },
];
