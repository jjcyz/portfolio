// Mapping of skill names to Simple Icons slugs
// Using Simple Icons CDN: https://cdn.simpleicons.org/{icon-slug}/{color}
export const skillIconMap: Record<string, string> = {
  // Programming Languages
  'Python': 'python',
  'Java': 'java',
  'C/C++': 'cplusplus',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'R': 'r',
  'HTML/CSS': 'html5',

  // Frameworks & Libraries
  'ReactJS': 'react',
  'React': 'react',
  'NodeJS': 'nodedotjs',
  'Node.js': 'nodedotjs',
  'TailwindCSS': 'tailwindcss',
  'PyTorch': 'pytorch',
  'TensorFlow': 'tensorflow',
  'Next.js': 'nextdotjs',

  // Cloud & DevOps
  'AWS': 'amazonaws',
  'GCP': 'googlecloud',
  'Docker': 'docker',

  // Databases
  'MongoDB': 'mongodb',
  'MySQL': 'mysql',
  'Supabase': 'supabase',

  // AI
  'AI Development': 'openai',

  // Tools & Technologies
  'Git': 'git',
  'Git & GitHub': 'github',
  'Github Actions': 'githubactions',
  'Jira': 'jira',
  'Confluence': 'confluence',
  'Vercel': 'vercel',
};

// Get icon URL for a skill
export const getSkillIconUrl = (skillName: string, color: string = '9333EA'): string => {
  const iconSlug = skillIconMap[skillName] || 'code';
  return `https://cdn.simpleicons.org/${iconSlug}/${color}`;
};

