import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../utils/projects';
import Reveal from '../components/Reveal';

const container = {               // staggers children
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};
const item = {                     // each card animates
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function Projects() {
    const [filter, setFilter] = useState('All');
    const techs = ['All', ...new Set(projectsData.flatMap(p => p.tech))];
    const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.tech.includes(filter));

    return (
        <Reveal amount={0.2}>

        <motion.div
            className="container mx-auto px-8 py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }}
        >
            <motion.h2
                className="text-4xl font-bold mb-8"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
                Projects
            </motion.h2>

            {/* filter chips */}
            <motion.div className="flex flex-wrap gap-3 mb-10" variants={{ hidden: {}, visible: { opacity: 1 } }}>
                {techs.map(t => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-4 py-1 rounded-full text-sm ${
                            filter === t ? 'bg-accent text-primary' : 'bg-primary text-gray-300'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </motion.div>

            {/* animated grid */}
            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {filtered.map(p => (
                    <motion.div key={p.name} variants={item}>
                        <ProjectCard project={p} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
</Reveal>

);
}
