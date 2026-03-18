import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`about ${visible ? 'about-show' : 'about-hide'}`} ref={ref}>
      <div className="about-content">
        
        <h2 className="about-title">About me</h2>
        
        <p className="about-desc">
          I am a recent graduate from ITLA, passionate about understanding 
          how the backend and servers work. While my focus is on building robust backend systems, 
          I also take pride in delivering clean and simple frontend experiences. I have solid knowledge of JavaScript and
          its modern frameworks, always aiming to write code that is maintainable, scalable, and user-friendly.
        </p>
            
        <p className="about-desc">
          I enjoy exploring new technologies and continuously improving my skills, especially in building efficient, secure, 
          and scalable applications. I am motivated by solving real-world problems and creating solutions that make life easier
          for users, while maintaining a clean and organized codebase. My goal is to grow as a developer who can contribute 
          effectively to both backend and frontend projects, delivering quality software from start to finish.
        </p>

      </div>
    </div>
  );
};

export default About;