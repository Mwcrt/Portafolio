import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Hero.css';

const Hero = ({ isReady }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isReady]);

  return (
    <div className={`hero ${visible ? 'hero-show' : 'hero-hide'}`} ref={ref}>
      
      <video
        className="hero-video"
        autoPlay
        loop
        muted={true}
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-overlay"></div>

      <div className="hero-content">
        <span className="hero-greeting">Hi, I'm</span>
        
        <h1 className="hero-name">
          MIGUEL <br />
          <span className="name-cursive">Acosta</span>
        </h1>
        
        <h2 className="hero-title">Software Developer</h2>
        <p className="hero-description">
          I enjoy building what users never see in the backend,
          but I also make sure that what they do see in the frontend is clean, clear, and polished.
        </p>
        <div className="hero-buttons">
          <Link to="projects" smooth={true} duration={600} offset={-64} className="btn btn-primary">
            View Projects
          </Link>
          <a href="/cv.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
            Download CV
          </a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/Mwcrt" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;