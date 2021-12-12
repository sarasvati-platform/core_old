import { EntityId } from '@src/core/models/entity'
import { Note, NoteType } from '@src/flashcards/models'
import { INoteRepository, IQuestionComparer } from '@src/flashcards/ports'

export class DummyCardRepository implements INoteRepository<string> {
    private data: Map<EntityId, Note> = new Map()

    createNote(noteType: NoteType): Note {
        const id = Math.random().toString(36).substring(2)
        return new Note(id, noteType)
    }

    saveNote(card: Note) {
        this.data.set(card.id, Object.create(card))
    }

    deleteNote(id: string): void {
        this.data.delete(id)
    }

    findNoteById(id: string): Note {
        return this.data.get(id)
    }

    findNoteByQuestion(question: string, comparer: IQuestionComparer): Note[] {
        const result = []
        for (const card of this.data.values()) {
            const equal = comparer.isEqual(card.question, question)
            if (equal) { result.push(card) }
        }
        return result
    }
}
