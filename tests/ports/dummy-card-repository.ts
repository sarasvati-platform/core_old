import { EntityId } from '@src/core/models/entity'
import { Note, NoteType } from '@src/flashcards/models'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'

export class DummyCardRepository implements ICardRepository<string> {
    private data: Map<EntityId, Note> = new Map()

    createCard(noteType: NoteType): Note {
        const id = Math.random().toString(36).substring(2)
        return new Note(id, noteType)
    }

    saveCard(card: Note) {
        this.data.set(card.id, Object.create(card))
    }

    deleteCard(id: string): void {
        this.data.delete(id)
    }

    findCardById(id: string): Note {
        return this.data.get(id)
    }

    findCardByQuestion(question: string, comparer: IQuestionComparer): Note[] {
        const result = []
        for (const card of this.data.values()) {
            const equal = comparer.isEqual(card.question, question)
            if (equal) { result.push(card) }
        }
        return result
    }
}
