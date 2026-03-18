import React, { useEffect, useRef, useState } from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiPostgresql, SiMysql} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import './Skills.css';

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React',      icon: <FaReact /> },
      { name: 'Next.js',    icon: <SiNextdotjs /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'HTML',       icon: <FaHtml5 /> },
      { name: 'CSS',        icon: <FaCss3Alt /> },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',    icon: <FaNodeJs /> },
      { name: 'Express',    icon: <SiExpress /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'MySQL',      icon: <SiMysql /> },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git',     icon: <FaGitAlt /> },
      { name: 'GitHub',  icon: <FaGithub /> },
      { name: 'VS Code', icon: <VscVscode /> },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`skills ${visible ? 'skills-show' : 'skills-hide'}`} ref={ref}>
      <div className="skills-content">

        <h2 className="skills-title">Skills</h2>

        <div className="skills-groups">
          {skillGroups.map((group) => (
            <div key={group.category} className="skills-group">
              <h3 className="skills-group-label">{group.category}</h3>
              <div className="skills-grid">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item"
                    data-skill={skill.name} 
                  >
                    <span className="skill-icon">
                      {skill.icon}
                    </span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Skills;