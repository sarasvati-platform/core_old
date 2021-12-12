import { IHasId } from '@src/core/models/entity'
import { NoteField, CardType } from '@src/flashcards/models'
import { NamedCollection } from '@src/flashcards/models/named-collection'

export class NoteType implements IHasId<string> {
    fieldsCollection = new NamedCollection<NoteField>()
    cardTypesCollection = new NamedCollection<CardType>()

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
    get fields(): NamedCollection<NoteField> {
        return this.fieldsCollection
    }

    /**
     * Get list of card types
     * @returns List of card types
     */
    get cardTypes(): NamedCollection<CardType> {
        return this.cardTypesCollection
    }
}
