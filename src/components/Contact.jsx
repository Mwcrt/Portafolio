import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`contact ${visible ? 'contact-show' : 'contact-hide'}`} ref={ref}>
      <div className="contact-content">

        <div className="contact-main">
          <p className="contact-label">Got a project in mind?</p>
          
          <a href="mailto:miguelacosta0420@gmail.com" className="contact-email">
            <span className="email-serif">
              <span className="email-dropcap">L</span>ET'S WORK
            </span>
            <span className="email-cursive">together.</span>
          </a>
          
          <a href="mailto:miguelacosta0420@gmail.com" className="contact-email-sub">
            miguelacosta0420@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Contact;