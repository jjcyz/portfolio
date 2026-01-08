'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Heart, Mail } from 'lucide-react';
import { contactInfo } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Email',
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
    },
    {
      name: 'GitHub',
      href: contactInfo.github,
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: contactInfo.linkedin,
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      href: contactInfo.instagram!,
      icon: Instagram,
    },
  ];

  return (
    <footer className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Glow Elements - Matching page style */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-pink-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-300/8 to-pink-300/8 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center py-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Jessica Zhou</h3>
            <p className="text-slate-700 text-sm">
              Full-Stack Software Engineer
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  {...(link.name !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-700 hover:text-purple-700 transition-colors duration-200"
                  aria-label={link.name === 'Email' ? 'Send email' : `Visit ${link.name} profile`}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-slate-600 text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <Heart size={16} className="text-red-500" /> by Jessica Zhou
            </p>
            <p className="text-slate-500 text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/30"
        >
          <div className="text-center">
            <p className="text-slate-700 text-xs">
              Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
