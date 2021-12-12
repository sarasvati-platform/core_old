import { NoteField, CardType, NoteType } from '@src/flashcards/models'
import { ManageCardTypeUseCase } from '@src/flashcards/use-cases/card-types/manage-card-type'

/**
 * Manages specified [note type]{@link NoteType}.
 */
export class ManageNoteTypeUseCase {
    /**
     * Initializes a new instance of the ManageNoteTypeUseCase class
     * @param noteType Note type to manage
     */
    constructor(
        public readonly noteType: NoteType
    ) { }

    /**
     * Adds a new field to note type using specified name
     * @param name Field name
     * @returns Newly created field
     * @throws {SarasvatiError} Name of the field is not unique
     */
    createField(name: string): NoteField {
        const newField = new NoteField(name)
        this.noteType.fields.add(newField)
        return newField
    }

    /**
     * Deletes field from note type
     * @param fieldName Field name
     * @throws {SarasvatiError} The field is not found
     */
    deleteField(fieldName: string) {
        const field = this.noteType.fields.get(fieldName)
        this.noteType.fields.delete(field)
    }

    /**
     * Renames field
     * @param oldFieldName Field name to rename
     * @param newFieldName New name
     * @throws {SarasvatiError} The field is not found
     * @throws {SarasvatiError} New name is not unique
     */
    renameField(oldFieldName: string, newFieldName: string) {
        const field = this.noteType.fields.get(oldFieldName)
        this.noteType.fields.rename(field, newFieldName)
    }

    /**
     * Changes order of the field
     * @param fieldName Name of the field to change position
     * @param position New position
     * @throws {SarasvatiError} The field is not found
     * @throws {SarasvatiError} Position is invalid
     */
    moveField(fieldName: string, position: number) {
        const field = this.noteType.fields.get(fieldName)
        this.noteType.fields.moveTo(field, position)
    }

    /**
     * Adds a new card type to note type using specified name
     * @param name Name
     * @returns Newly created card type
     * @throws {SarasvatiError} Name of the card type is not unique
     */
    createCardType(name: string): CardType {
        const cardType = new CardType(name)
        this.noteType.cardTypes.add(cardType)
        return cardType
    }

    /**
     * Deletes card type from note type
     * @param name Card type name
     * @throws {SarasvatiError} The card type is not found
     */
    deleteCardType(name: string) {
        const cardType = this.noteType.cardTypes.get(name)
        this.noteType.cardTypes.delete(cardType)
    }

    /**
     * Renames card type
     * @param oldName Old name
     * @param newName New name
     * @throws {SarasvatiError} The card type is not found
     * @throws {SarasvatiError} New name is not unique
     */
    renameCardType(oldName: string, newName: string) {
        const cardType = this.noteType.cardTypes.get(oldName)
        this.noteType.cardTypes.rename(cardType, newName)
    }

    /**
     * Changes order of the card type
     * @param name Name of the card type to change position
     * @param position New position
     * @throws {SarasvatiError} The card type is not found
     * @throws {SarasvatiError} Position is invalid
     */
    moveCardType(name: string, position: number) {
        const cardType = this.noteType.cardTypes.get(name)
        this.noteType.cardTypes.moveTo(cardType, position)
    }

    /**
     * Returns manager to manage card types
     * @param name Card type name to manage
     * @returns Manager
     */
    manageCardType(name: string): ManageCardTypeUseCase {
        const cardType = this.noteType.cardTypes.get(name)
        return new ManageCardTypeUseCase(cardType)
    }
}

