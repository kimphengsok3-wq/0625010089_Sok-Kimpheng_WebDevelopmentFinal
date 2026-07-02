import { useEffect, useState } from 'react';
import { API_URL } from '../api';

const emptyForm = { title: '', description: '', tech: '', link: '' };

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // null = adding new, otherwise editing this id
  const [showManage, setShowManage] = useState(false);

  // READ - load all projects when the page first loads
  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    setLoading(true);
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load projects. Is the backend running?');
        setLoading(false);
      });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // CREATE or UPDATE, depending on whether we're editing
  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      // tech is typed as "React, Node.js" - split it into an array
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      link: form.link,
    };

    const isEditing = editingId !== null;
    const url = isEditing ? `${API_URL}/projects/${editingId}` : `${API_URL}/projects`;
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        setForm(emptyForm);
        setEditingId(null);
        fetchProjects();
      })
      .catch(() => setError('Something went wrong saving the project.'));
  }

  // Fill the form with an existing project's data so it can be edited
  function handleEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      link: project.link || '',
    });
    setShowManage(true);
  }

  // DELETE
  function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' })
      .then(() => fetchProjects())
      .catch(() => setError('Could not delete the project.'));
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <section id="projects" className="section">
      <h2>Projects</h2>

      {loading && <p>Loading projects...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
            )}
            <div className="project-actions">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)} className="danger">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* This small panel demonstrates the Create/Update part of CRUD */}
      <div className="manage-projects">
        <button className="btn-secondary" onClick={() => setShowManage(!showManage)}>
          {showManage ? 'Hide Add/Edit Form' : '+ Add New Project'}
        </button>

        {showManage && (
          <form className="project-form" onSubmit={handleSubmit}>
            <h3>{editingId ? 'Edit Project' : 'Add a New Project'}</h3>
            <input
              type="text"
              name="title"
              placeholder="Project title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Short description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="tech"
              placeholder="Technologies used, separated by commas (e.g. React, Node.js)"
              value={form.tech}
              onChange={handleChange}
            />
            <input
              type="text"
              name="link"
              placeholder="Project link (optional)"
              value={form.link}
              onChange={handleChange}
            />
            <div className="form-actions">
              <button type="submit" className="btn">
                {editingId ? 'Save Changes' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Projects;
