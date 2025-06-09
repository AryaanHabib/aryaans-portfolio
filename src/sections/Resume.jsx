import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import Reveal from '../components/Reveal';

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Resume() {
  const timeline = [
    {
      date: 'Sep 2023 – Dec 2024',
      title: 'Teaching Assistant',
      subtitle: 'University of British Columbia',
      description: 'Guided Math 100/180 students; automated grading scripts; integrated tools for tutorials.',
      icon: <FaBriefcase />,
    },
    {
      date: 'Sep 2021 – May 2022',
      title: "Dean's List (1st Year)",
      subtitle: 'UBC Okanagan',
      description: 'Achieved Dean’s List standing in first year of BSc.',
      icon: <FaGraduationCap />,
    },
    {
      date: 'Expected 2026',
      title: 'BSc Computer Science',
      subtitle: 'University of British Columbia',
      description: 'CS major specializing in full-stack development.',
      icon: <FaGraduationCap />,
    },
  ];

  return (

      <motion.div
          className="container mx-auto px-8 py-24"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-8">Experience &amp; Education</h2>

        <VerticalTimeline>
          {timeline.map((t, i) => (
              <VerticalTimelineElement
                  key={i}
                  date={t.date}
                  icon={t.icon}
                  iconStyle={{ background: '#4a63de', color: '#111827' }}
                  contentStyle={{ background: '#1f2937', color: '#fff' }}
                  contentArrowStyle={{ borderRight: '7px solid #4ade80' }}
              >
                <h3 className="text-xl font-semibold">{t.title}</h3>
                <h4 className="text-md text-gray-300">{t.subtitle}</h4>
                <p>{t.description}</p>
              </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
  );
}
