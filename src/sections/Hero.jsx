
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';

export default function Hero() {
  return (
      <Reveal amount={0.2}>

      <div className="h-screen flex flex-col justify-center items-start px-10 relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
      >
        Hey, I'm <span className="text-accent">Aryaan</span><br />Full‑Stack Developer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-2xl text-gray-300 text-lg md:text-xl"
      >
        I build immersive digital experiences with React, Django, and a sprinkle of AI magic.
      </motion.p>
      <motion.a
        href="#projects"
        whileHover={{ scale: 1.05 }}
        className="mt-10 inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-lg shadow-lg"
      >
        View Projects
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-br from-accent/40 via-emerald-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
    </div>
      </Reveal>

  );
}
