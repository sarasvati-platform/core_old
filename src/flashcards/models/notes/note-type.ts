import { IHasId } from '@src/core/models/entity'
import { CardField, CardFace } from '@src/flashcards/models'
import { NamedCollection } from '@src/flashcards/models/named-collection'

export class NoteType implements IHasId<string> {
    fieldsCollection = new NamedCollection<CardField>()
    facesCollection = new NamedCollection<CardFace>()

    /**
     * Initializes a new instance of the NoteType class using the specified id and name
     * @param id Id of a note type
     * @param name Name of a note type
     */
    constructor(
        public id: string,
        public name: string
    ) {}

    /**
     * Get list of fields
     * @returns List of fields
     */
    get fields(): NamedCollection<CardField> {
        return this.fieldsCollection
    }

    /**
     * Get list of fields
     * @returns List of fields
     */
    get faces(): NamedCollection<CardFace> {
        return this.facesCollection
    }
}
