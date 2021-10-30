import { Entity, EntityId } from '@src/core/models/entity'
import { CardField } from '@src/flashcards/models'
import { SarasvatiError } from '@src/core/exceptions';

export class CardType extends Entity {
    fields: CardField[] = []

    /**
     * Initializes a new instance of the CardType class using the specified id and name
     * @param id Id of a card type
     * @param name Name of a card type
     */
    constructor(
        public id: EntityId,
        public name: string
    ) {
        super(id)
        this.name = name
    }

    /**
     * Gets field by name
     * @param name Name of the field
     * @returns Field
     */
    getField(name: string): CardField {
        return this.fields.find(field => field.name === name)
    }

    /**
     * Adds a new field
     * @param name Name of a field
     * @returns Field
     */
    addField(name: string): CardField {
        this.checkIfFieldExists(name)

        const field = new CardField(name)
        this.fields.push(field)
        return field
    }

    /**
     * Renames field
     * @param name Name of the field to rename
     * @param newName New name of the field
     */
    renameField(name: string, newName: string) {
        this.checkIfFieldExists(newName)

        const field = this.getField(name)
        if (!field) {
            throw new SarasvatiError('Field does not exist')
        }
        field.name = newName
    }

    /**
     * Deletes the field
     * @param name Name of a field
     * @returns Field
     */
    deleteField(name: string) {
        this.fields = this.fields.filter(field => field.name !== name)
    }

    private checkIfFieldExists(fieldName: string) {
        const field = this.getField(fieldName)
        if (field)
            throw new SarasvatiError('Field with same name already exists')
    }
}