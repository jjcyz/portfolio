import { Project, Experience, Education } from '@/types';

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jessica Zhou',
    jobTitle: 'Software Engineer',
    description: 'Computer Science and Business student at UBC, specializing in AI/ML and software development',
    url: 'https://jjcyz.github.io/portfolio/',
    image: 'https://jjcyz.github.io/portfolio/images/profile.jpg',
    sameAs: [
      'https://linkedin.com/in/jessicaz-',
      'https://github.com/jjcyz',
      'https://www.instagram.com/_jessicazhou/',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vancouver',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of British Columbia',
        url: 'https://www.ubc.ca/',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Tsinghua University',
        url: 'https://www.tsinghua.edu.cn/',
      },
    ],
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Software Development',
      'Computer Science',
      'Business',
      'Python',
      'React',
      'PyTorch',
    ],
  };
}

export function generateProjectStructuredData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'Person',
      name: 'Jessica Zhou',
    },
    dateCreated: '2024',
    genre: project.category,
    keywords: project.technologies.join(', '),
    ...(project.githubUrl && {
      codeRepository: project.githubUrl,
    }),
    ...(project.liveUrl && {
      url: project.liveUrl,
    }),
    ...(project.paperUrl && {
      url: project.paperUrl,
    }),
  };
}

export function generateExperienceStructuredData(experience: Experience) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OrganizationRole',
    roleName: experience.title,
    worksFor: {
      '@type': 'Organization',
      name: experience.company,
    },
    startDate: experience.startDate,
    endDate: experience.endDate,
    location: {
      '@type': 'Place',
      name: experience.location,
    },
    description: experience.description.join(' '),
  };
}

export function generateEducationStructuredData(education: Education) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    educationalLevel: education.degree,
    recognizedBy: {
      '@type': 'Organization',
      name: education.institution,
    },
    validFrom: education.startDate,
    validUntil: education.endDate,
    about: education.description,
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jessica Zhou Portfolio',
    description: 'Personal portfolio showcasing software engineering projects, AI/ML research, and professional experience',
    url: 'https://jjcyz.github.io/portfolio/',
    author: {
      '@type': 'Person',
      name: 'Jessica Zhou',
    },
    inLanguage: 'en-US',
    copyrightYear: '2025',
  };
}
