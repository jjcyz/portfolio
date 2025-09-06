import { Project, Experience, Education, Skill, ContactInfo } from '@/types';

export const contactInfo: ContactInfo = {
  email: 'jess.c.zhou@gmail.com',
  linkedin: 'https://linkedin.com/in/jessicaz-',
  github: 'https://github.com/jjcyz',
  instagram: 'https://www.instagram.com/_jessicazhou/',
};

export const projects: Project[] = [
  {
    id: 'arcsphere',
    title: 'ArcSphere: AI Agents Powered By Groq',
    description: 'Developed a modern web application using Groq\'s LLaMA 3 70B model, featuring a chat interface for users to interact with AI agents.',
    longDescription: 'Built a sophisticated AI chat application leveraging Groq\'s lightning-fast inference API. Implemented custom system prompts to define specific AI agent capabilities, created a responsive React interface with real-time messaging, and integrated advanced error handling for robust user experience.',
    image: '/images/arcsphere-preview.jpg',
    technologies: ['JavaScript', 'ReactJS', 'Vite', 'HTML5/CSS', 'NodeJS', 'Groq API'],
    githubUrl: 'https://github.com/jjcyz/arcsphere',
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
    title: 'Blood Vessel Segmentation using ML',
    description: 'Developed a 3D U-Net architecture for precise pixel-wise classification of vasculature structures, automating kidney segmentation and reducing manual processing time by 85%.',
    longDescription: 'Created an innovative two-step training pipeline combining supervised pretraining with denoising techniques. Built an end-to-end pipeline processing TIFF scans and generating 3D segmentation masks, achieving state-of-the-art results in medical image analysis.',
    image: '/images/ml_paper_pipeline.PNG',
    technologies: ['Python', 'PyTorch', 'Machine Learning'],
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
    technologies: ['Python', 'PyTorch', 'Deep Learning', 'Data Visualization'],
    githubUrl: 'https://github.com/jjcyz/bernoulli_gaussian_vae',
    featured: true,
    category: 'research',
  },
];

export const experiences: Experience[] = [
  {
    id: 'researcher-blood-vessel',
    title: 'Researcher',
    company: 'Blood Vessel Segmentation using Machine Learning',
    location: 'Beijing, CN',
    startDate: '2024-09',
    endDate: '2025-01',
    description: [
      'Developed a 3D U-Net architecture for precise pixel-wise classification of vasculature structures',
      'Implemented an innovative two-step training pipeline with supervised pretraining and denoising techniques',
      'Built an end-to-end pipeline processing TIFF scans and generating 3D segmentation masks',
    ],
    technologies: ['Python', 'PyTorch', '3D U-Net', 'Medical Imaging'],
  },
  {
    id: 'software-developer-vae',
    title: 'Software Developer',
    company: 'Variational Autoencoder (VAE) Comparison Project',
    location: 'Beijing, CN',
    startDate: '2024-10',
    endDate: '2024-11',
    description: [
      'Implemented and compared Bernoulli and Gaussian VAEs using PyTorch on MNIST dataset',
      'Built comprehensive visualization pipeline generating 6 different analysis outputs',
      'Optimized model training through systematic hyperparameter tuning',
    ],
    technologies: ['Python', 'PyTorch', 'VAE', 'Data Visualization'],
  },
  {
    id: 'student-mentor',
    title: 'Student Mentor',
    company: 'University of British Columbia',
    location: 'Vancouver, CA',
    startDate: '2023-11',
    endDate: '2023-12',
    description: [
      'Mentored 20+ CS and Business students through technical career guidance and academics',
      'Spearheaded the organization of the largest China Forum in Canada, reaching 62M+ viewers',
      'Established partnerships with 30+ top global universities for event collaborations',
    ],
    technologies: ['Leadership', 'Event Management', 'Mentoring'],
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
    description: 'Focus on the intersection of technology and business, with coursework in software engineering, machine learning, and business strategy.',
  },
  {
    id: 'tsinghua-exchange',
    institution: 'Tsinghua University',
    degree: 'Exchange Studies at SEM & Department of Computer Science and Technology',
    location: 'Beijing, CN',
    startDate: '2024-02',
    endDate: '2025-01',
    description: 'Enhanced global perspective of technology and business with focus on ML/AI and Financial Technologies.',
  },
];

export const skills: Skill[] = [
  // Programming Languages
  { name: 'Python', category: 'languages', proficiency: 'expert' },
  { name: 'Java', category: 'languages', proficiency: 'advanced' },
  { name: 'C/C++', category: 'languages', proficiency: 'advanced' },
  { name: 'JavaScript', category: 'languages', proficiency: 'advanced' },
  { name: 'TypeScript', category: 'languages', proficiency: 'intermediate' },
  { name: 'MySQL', category: 'languages', proficiency: 'intermediate' },
  { name: 'R Programming', category: 'languages', proficiency: 'intermediate' },
  { name: 'HTML5/CSS3', category: 'languages', proficiency: 'advanced' },

  // Frameworks & Libraries
  { name: 'ReactJS', category: 'frameworks', proficiency: 'advanced' },
  { name: 'NodeJS', category: 'frameworks', proficiency: 'intermediate' },
  { name: 'PyTorch', category: 'frameworks', proficiency: 'advanced' },
  { name: 'TensorFlow', category: 'frameworks', proficiency: 'intermediate' },

  // Tools & Technologies
  { name: 'Google Cloud Platform', category: 'tools', proficiency: 'intermediate' },
  { name: 'Pytest', category: 'tools', proficiency: 'intermediate' },
  { name: 'Git', category: 'tools', proficiency: 'advanced' },
  { name: 'GitHub', category: 'tools', proficiency: 'advanced' },
  { name: 'Visual Studio Code', category: 'tools', proficiency: 'advanced' },
  { name: 'IntelliJ', category: 'tools', proficiency: 'intermediate' },

  // Certifications
  { name: 'Google Cloud Essentials', category: 'certifications', proficiency: 'expert' },
  { name: 'SAP Cloud Application Programming Model', category: 'certifications', proficiency: 'expert' },
  { name: 'SAP Commerce Cloud and SAP S/4 HANA Cloud Integrations', category: 'certifications', proficiency: 'expert' },
];
