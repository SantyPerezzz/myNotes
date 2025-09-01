package notes.app.services;

import notes.app.domain.Note;
import notes.app.repositories.NoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    private final NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    public Note create(Note note) {
        return repository.save(note);
    }

    public List<Note> list(boolean archived) {
        return repository.findAllByArchived(archived);
    }

    public Optional<Note> getNoteById(Long id) {
        return repository.findById(id);
    }


    public Note update(Note note) {
        return repository.save(note);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Note archive(Long id, boolean archived) {
        Note note = repository.findById(id).orElseThrow();
        note.setArchived(archived);
        return repository.save(note);
    }
}

