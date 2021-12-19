import { EntityId } from '@src/core/models/entity'
import { NoteType } from '@src/flashcards/models'
import { INoteTypeRepository } from '@src/flashcards/ports'

export class FakeNoteTypeRepository implements INoteTypeRepository<string> {
    private data: Map<EntityId, NoteType> = new Map()

    createNoteType(name: string): NoteType {
        const noteType = new NoteType(name, name)
        this.data.set(noteType.id, noteType)
        return noteType
    }

    deleteNoteType(id: EntityId): void {
        this.data.delete(id)
    }

    findNoteTypeById(id: EntityId): NoteType {
        return this.data.get(id)
    }
}