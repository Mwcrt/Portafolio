import React, { useState, useEffect, useRef } from 'react';
import { LiaKiwiBirdSolid } from 'react-icons/lia';
import { BsSun, BsMoon, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import { Link } from 'react-scroll';
import './Navbar.css';

const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar = ({ darkMode, setDarkMode, onModalResolve, isAppReady }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const musicPreference = localStorage.getItem('musicPreference');

    if (musicPreference !== null) {
      try {
        const wantsMusic = JSON.parse(musicPreference);

        if (wantsMusic && audioRef.current) {
          setTimeout(() => {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          }, 500);
        }

        if (onModalResolve && !isAppReady) onModalResolve();

      } catch {
        localStorage.removeItem('musicPreference');
        const timer = setTimeout(() => setShowModal(true), 800);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => setShowModal(true), 800);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleMusicChoice = (playMusic) => {
    setShowModal(false);
    localStorage.setItem('musicPreference', JSON.stringify(playMusic));

    if (playMusic) {
      audioRef.current.play().catch(err => console.log('Audio bloqueado:', err));
      setIsPlaying(true);
    }

    if (onModalResolve) onModalResolve();
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('musicPreference', JSON.stringify(false));
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      if (volume === 0) setVolume(0.3);
      localStorage.setItem('musicPreference', JSON.stringify(true));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (newVolume > 0 && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem('musicPreference', JSON.stringify(true));
    } else if (newVolume === 0 && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem('musicPreference', JSON.stringify(false));
    }
  };

  return (
    <>
      {showModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <h2 className="modal-title">
              <span className="modal-title-serif">ELEVATE <br /> YOUR</span>
              <span className="modal-title-script">experience.</span>
            </h2>
            <p className="modal-text">
              To fully enjoy this presentation, would you like to activate the background music?
            </p>
            <div className="modal-buttons">
              <button className="btn-modal btn-accept" onClick={() => handleMusicChoice(true)}>
                Yes, play music
              </button>
              <button className="btn-modal btn-decline" onClick={() => handleMusicChoice(false)}>
                Continue in silence
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="navbar-container">

          <Link to="home" smooth={true} duration={600} offset={-64} className="navbar-logo">
            <LiaKiwiBirdSolid />
          </Link>

          <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <li key={link}>
                <Link
                  to={link.toLowerCase()}
                  smooth={true}
                  duration={600}
                  offset={-64}
                  spy={true}
                  activeClass="active"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            <div className="volume-container">
              <button className="nav-icon-btn" onClick={toggleAudio} aria-label="Toggle Music">
                {isPlaying && volume > 0 ? <BsVolumeUp /> : <BsVolumeMute />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volume Control"
                style={{ '--vol-percent': `${volume * 100}%` }}
              />
            </div>

            <button className="nav-icon-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <BsSun /> : <BsMoon />}
            </button>

            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <audio ref={audioRef} src="/music.mp3" loop />
      </nav>
    </>
  );
};

export default Navbar;