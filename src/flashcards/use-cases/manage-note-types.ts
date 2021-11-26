import { EntityId } from '@src/core/models/entity'
import { SarasvatiError } from '@src/core/exceptions'

import { INoteTypeRepository } from '@src/flashcards/ports'
import { NoteType } from '@src/flashcards/models'
import { ManageNoteTypeUseCase } from '@src/flashcards/use-cases/manage-note-type'


export class ManageNoteTypesUseCase {
    constructor(
        private repository: INoteTypeRepository<EntityId>
    ) {}

    /**
     * Creates a new note type
     * @param name Note type name
     * @returns Newly created note type
     */
    create(name: string): NoteType {
        return this.repository.createNoteType(name)
    }

    /**
     * Deletes note type
     * @param noteType Note type to delete
     */
    delete(noteType: NoteType) {
        this.repository.deleteNoteType(noteType.id)
    }

    /**
     * Finds note type
     * @param id Id of note type
     * @returns Note type if found, otherwise undefined
     */
    find(id: EntityId): NoteType {
        return this.repository.findNoteTypeById(id)
    }

    /**
     * Returns manager to manage specified note type
     * @param cardTypeId Id of note type to manage
     * @returns Manager
     * @throws {SarasvatiError} No note type found
     */
    manage(cardTypeId: EntityId): ManageNoteTypeUseCase {
        const noteType = this.find(cardTypeId)
        if (!noteType) { throw new SarasvatiError('No note type found') }
        return new ManageNoteTypeUseCase(noteType)
    }
}
