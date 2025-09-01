import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotesList from './pages/NotesList';
import NoteDetail from './pages/NoteDetail';
import NoteForm from './pages/NoteForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
