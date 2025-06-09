
import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full space-y-32">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="resume"><Resume /></section>
        {/*<section id="contact"><Contact /></section>*/}
      </main>
    </div>
  );
}
