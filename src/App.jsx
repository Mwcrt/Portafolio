import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode !== null ? JSON.parse(savedMode) : true;
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.title = 'Mi Portafolio';
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onModalResolve={() => setIsReady(true)}
        isAppReady={isReady}
      />
      <main>
        <section id="home"><Hero isReady={isReady} /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}

export default App;
