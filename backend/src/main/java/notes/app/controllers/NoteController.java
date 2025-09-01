package notes.app.controllers;

import notes.app.domain.Note;
import notes.app.services.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteService service;

    public NoteController(NoteService service) {
        this.service = service;
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return service.create(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(
            @PathVariable Long id,
            @RequestBody Note note
    ) {
        return service.getNoteById(id)
                .map(existingNote -> {
                    existingNote.setTitle(note.getTitle());
                    existingNote.setContent(note.getContent());
                    existingNote.setArchived(note.isArchived());
                    Note updated = service.update(existingNote);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Note> list(@RequestParam(required = false) Boolean archived) {
        return service.list(archived != null && archived);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNote(@PathVariable Long id) {
        return service.getNoteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/archive")
    public Note archive(@PathVariable Long id, @RequestParam boolean archived) {
        return service.archive(id, archived);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

