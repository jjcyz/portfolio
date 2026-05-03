'use client';

import { Github, Linkedin, Instagram, Heart, Mail } from 'lucide-react';
import { contactInfo } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Email', href: `mailto:${contactInfo.email}`, icon: Mail },
    { name: 'GitHub', href: contactInfo.github, icon: Github },
    { name: 'LinkedIn', href: contactInfo.linkedin, icon: Linkedin },
    { name: 'Instagram', href: contactInfo.instagram!, icon: Instagram },
  ];

  return (
    <footer className="py-16 sm:py-20 border-t border-neutral-200/80 bg-[#F9F9F7]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap justify-center gap-6 py-12">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                {...(link.name !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-neutral-600 hover:text-[#3B5CCC] transition-colors duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B5CCC]"
                aria-label={link.name === 'Email' ? 'Send email' : `Visit ${link.name} profile`}
              >
                <IconComponent size={24} />
              </a>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-neutral-600 text-sm flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-500 shrink-0" aria-hidden /> by Jessica Zhou
          </p>
          <p className="text-neutral-500 text-xs mt-1">© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
