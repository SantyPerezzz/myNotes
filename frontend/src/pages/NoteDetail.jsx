import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../services/notesService";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNote(id)
      .then(data => setNote(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    deleteNote(id)
      .then(() => navigate("/notes"))
      .catch(err => console.error(err));
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3">{note.title}</h2>
        <p>{note.content}</p>
        <div className="text-muted small mt-3">
          <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
          <p>Last updated: {new Date(note.updatedAt).toLocaleString()}</p>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate(`/edit/${note.id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/notes")}
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-dark">Are you sure you want to delete this note?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default NoteDetail;
