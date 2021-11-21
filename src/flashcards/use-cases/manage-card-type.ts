import { CardField, CardFace, CardType } from '@src/flashcards/models'
import { ManageCardFaceUseCase } from '@src/flashcards/use-cases/manage-card-face'

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

    /**
     * Adds a new face to card type using specified name
     * @param faceName Face name
     * @returns Newly created face
     * @throws {SarasvatiError} Name of the face is not unique
     */
    addFace(faceName: string): CardFace {
        const newFace = new CardFace(faceName)
        this.cardType.faces.add(newFace)
        return newFace
    }

    /**
     * Deletes face from card type
     * @param faceName Face name
     * @throws {SarasvatiError} The face is not found
     */
    deleteFace(faceName: string) {
        const face = this.cardType.faces.get(faceName)
        this.cardType.faces.delete(face)
    }

    /**
     * Renames face
     * @param oldfaceName Face name to rename
     * @param newfaceName New name
     * @throws {SarasvatiError} The face is not found
     * @throws {SarasvatiError} New name is not unique
     */
    renameFace(oldfaceName: string, newFaceName: string) {
        const face = this.cardType.faces.get(oldfaceName)
        this.cardType.faces.rename(face, newFaceName)
    }

    /**
     * Changes order of the face
     * @param faceName Name of the face to change position
     * @param position New position
     * @throws {SarasvatiError} The face is not found
     * @throws {SarasvatiError} Position is invalid
     */
    moveFace(faceName: string, position: number) {
        const face = this.cardType.faces.get(faceName)
        this.cardType.faces.moveTo(face, position)
    }

    /**
     * Returns manager to manage card face
     * @param faceName Face name to manage
     * @returns Manager
     */
    manageFace(faceName: string): ManageCardFaceUseCase {
        const cardFace = this.cardType.faces.get(faceName)
        return new ManageCardFaceUseCase(cardFace)
    }
}

