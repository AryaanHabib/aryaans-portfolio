import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';

const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
    return (
        <Reveal amount={0.25}>

        <motion.div
            className="container mx-auto px-8 py-24"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            <h2 className="text-4xl font-bold mb-8">About Me</h2>

            <p className="leading-7 max-w-3xl text-gray-300">
                I’m a Computer Science student at the University&nbsp;of&nbsp;British Columbia who turns complex ideas
                into elegant, production-ready software. My focus is <strong>full-stack development and applied AI</strong>—from
                containerized Django + React platforms and data-driven Node.js visualizations to a GPT-powered mental-health chatbot
                trusted by Gen-Z users. Fluent in Python, JavaScript/TypeScript, Java, SQL and DevOps tooling, I pair rigorous
                engineering practice with an eye for intuitive user experience.
            </p>
        </motion.div>
        </Reveal>

    );
}
