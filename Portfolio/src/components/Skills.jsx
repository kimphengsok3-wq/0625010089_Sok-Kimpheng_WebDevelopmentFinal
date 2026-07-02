const skillGroups = [
  { category: 'Languages', items: ['C++', 'Python', 'Java', 'JavaScript (ES6+)'] },
  { category: 'Web', items: ['HTML5', 'CSS3', 'React'] },
  { category: 'Design', items: ['Figma'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitHub'] },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-card" key={group.category}>
            <h3>{group.category}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
