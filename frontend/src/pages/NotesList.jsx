import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getNotes, deleteNote, updateNote} from "../services/notesService";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);

    try {
      const data = await getNotes(showArchived);
      setNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchNotes(showArchived);
  }, [showArchived]);

  const handleDelete = (id) => {
    deleteNote(id)
      .then(() => fetchNotes(showArchived))
      .catch((err) => console.error(err));
  }

  const handleArchiveToggle = (note) => {
    const updatedNote = { ...note, archived: !note.archived };
    updateNote(note.id, updatedNote)
      .then(() => fetchNotes(showArchived))
      .catch((err) => console.error(err));
  }

  if (loading) return <p className="text-center mt-5">Loading notes...</p>;

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <h2>{showArchived ? "Archived Notes" : "My Notes"}</h2>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <Link to="/create" className="btn btn-success">
            + Create Note
          </Link>
          <button
            className="btn btn-secondary"
            onClick={() => setShowArchived(!showArchived)}
          >
            {showArchived ? "Show Active Notes" : "Show Archived Notes"}
          </button>
        </div>
      </div>

      <div className="row justify-content-center w-100">
        {notes.length === 0 ? (
          <p className="text-center fs-6">
            {showArchived 
              ? "No archived notes." 
              : "No notes found. Create your first note!"}
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  {/* Fecha arriba a la derecha */}
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="card-title">{note.title}</h5>
                    <small className="text-muted">
                      {note.createdAt 
                        ? new Date(note.createdAt).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }) 
                        : ""}
                    </small>
                  </div>

                  <p className="card-text text-truncate">{note.content || "No content"}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div>
                      <Link to={`/notes/${note.id}`} className="btn btn-primary btn-sm me-2">
                        View
                      </Link>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleArchiveToggle(note)}
                      >
                        {note.archived ? "Unarchive" : "Archive"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setNoteToDelete(note);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <span className={`badge rounded-pill ${note.archived ? "bg-secondary" : "bg-success"}`}>
                      {note.archived ? "Archived" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de confirmación de delete */}
      {showDeleteModal && noteToDelete && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
          <div className="bg-white rounded shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
            <h5 className="mb-3 text-dark">Confirm Delete</h5>
            <p className="text-dark">Are you sure you want to delete "<strong>{noteToDelete.title}</strong>"?</p>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(noteToDelete.id);
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesList;
