'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-black/15 rounded-2xl p-12"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-purple-700 text-lg sm:text-xl mb-6 font-medium"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
          >
            <span className="gradient-text">Jessica Zhou</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-700 mb-8 font-light"
          >
            Full-stack developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            <span className="text-purple-700">Based in Vancouver, BC, Canada.</span>
          </motion.p>


          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-50 rounded-md"
              aria-label="Scroll to about section"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown size={24} className="text-purple-700" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
