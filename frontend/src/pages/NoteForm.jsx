import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { getNote, createNote, updateNote } from "../services/notesService";

function NoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (id) {
      getNote(id)
        .then(data => setNote(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Editar
      updateNote(id, note)
        .then(() => navigate("/notes"))
        .catch(err => console.error(err));
    } else {
      // Crear
      createNote(note)
        .then(() => navigate("/notes"))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Note" : "Create Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={note.content}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {id ? "Update Note" : "Create Note"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/notes")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
