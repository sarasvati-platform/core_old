import { CardField, CardType } from '@src/flashcards/models'

/**
 * Manages specified [card type]{@link CardType}.
 */
export class ManageCardTypeUseCase {
    /**
     * Initializes a new instance of the ManageCardTypeUseCase class
     * @param cardType Card type to manage
     */
    constructor(
        public readonly cardType: CardType
    ) { }

    /**
     * Adds a new field to card type using specified name
     * @param fieldName Field name
     * @returns Newly created field
     * @throws {SarasvatiError} Name of the field is not unique
     */
    addField(fieldName: string): CardField {
        const newField = new CardField(fieldName)
        this.cardType.fields.add(newField)
        return newField
    }

    /**
     * Deletes field from card type
     * @param fieldName Field name
     * @throws {SarasvatiError} The field is not found
     */
    deleteField(fieldName: string) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.delete(field)
    }

    /**
     * Renames field
     * @param oldFieldName Field name to rename
     * @param newFieldName New name
     * @throws {SarasvatiError} The field is not found
     * @throws {SarasvatiError} New name is not unique
     */
    renameField(oldFieldName: string, newFieldName: string) {
        const field = this.cardType.fields.get(oldFieldName)
        this.cardType.fields.rename(field, newFieldName)
    }

    /**
     * Changes order of the field
     * @param fieldName Name of the field to change position
     * @param position New position
     * @throws {SarasvatiError} The field is not found
     * @throws {SarasvatiError} Position is invalid
     */
    moveField(fieldName: string, position: number) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.moveTo(field, position)
    }
}
