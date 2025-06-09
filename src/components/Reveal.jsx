// src/components/Reveal.jsx
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

/** Reusable wrapper that animates children in *and* out on scroll */
export default function Reveal({ children, amount = 0.3 }) {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { amount });        // Framer-Motion hook

    /** play / reverse the animation */
    useEffect(() => {
        controls.start(inView ? 'visible' : 'hidden');
    }, [inView, controls]);

    const variants = {
        hidden:  { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.div ref={ref} variants={variants} initial="hidden" animate={controls}>
            {children}
        </motion.div>
    );
}
