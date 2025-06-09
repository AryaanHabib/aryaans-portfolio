
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Experience & Education' },
  // { id: 'contact', label: 'Contact' },
];

export default function Sidebar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const offsets = links.map(link => {
        const el = document.getElementById(link.id);
        if (!el) return { id: link.id, top: 0 };
        return { id: link.id, top: el.getBoundingClientRect().top };
      });
      const current = offsets.find(o => o.top >= -200) || offsets[offsets.length - 1];
      setActive(current.id);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside className="fixed h-screen w-64 bg-secondary p-6 shadow-xl flex flex-col justify-between">
      <div>
        <div className="text-3xl font-bold mb-12 tracking-wide">Aryaan&nbsp;Habib</div>
        <nav className="space-y-6">
          {links.map(link => (
            <motion.a
              key={link.id}
              href={'#' + link.id}
              whileHover={{ scale: 1.05, x: 4 }}
              className={`block text-lg font-medium transition ${
                active === link.id ? 'text-accent' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
      <div className="flex gap-4 text-2xl text-gray-400">
        <a href="https://github.com/AryaanHabib" target="_blank" rel="noreferrer"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/aryaan-habib-1040b8226/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      </div>
    </aside>
  );
}
