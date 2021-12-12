import { NoteField, CardType, NoteType } from '@src/flashcards/models'
import { ManageCardTypeUseCase } from '@src/flashcards/use-cases/manage-card-face'

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
     * @param fieldName Field name
     * @returns Newly created field
     * @throws {SarasvatiError} Name of the field is not unique
     */
    addField(fieldName: string): NoteField {
        const newField = new NoteField(fieldName)
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
     * Adds a new face to note type using specified name
     * @param faceName Face name
     * @returns Newly created face
     * @throws {SarasvatiError} Name of the face is not unique
     */
    addFace(faceName: string): CardType {
        const newFace = new CardType(faceName)
        this.noteType.cardTypes.add(newFace)
        return newFace
    }

    /**
     * Deletes face from note type
     * @param faceName Face name
     * @throws {SarasvatiError} The face is not found
     */
    deleteFace(faceName: string) {
        const face = this.noteType.cardTypes.get(faceName)
        this.noteType.cardTypes.delete(face)
    }

    /**
     * Renames face
     * @param oldfaceName Face name to rename
     * @param newfaceName New name
     * @throws {SarasvatiError} The face is not found
     * @throws {SarasvatiError} New name is not unique
     */
    renameFace(oldfaceName: string, newFaceName: string) {
        const face = this.noteType.cardTypes.get(oldfaceName)
        this.noteType.cardTypes.rename(face, newFaceName)
    }

    /**
     * Changes order of the face
     * @param faceName Name of the face to change position
     * @param position New position
     * @throws {SarasvatiError} The face is not found
     * @throws {SarasvatiError} Position is invalid
     */
    moveFace(faceName: string, position: number) {
        const face = this.noteType.cardTypes.get(faceName)
        this.noteType.cardTypes.moveTo(face, position)
    }

    /**
     * Returns manager to manage card face
     * @param faceName Face name to manage
     * @returns Manager
     */
    manageFace(faceName: string): ManageCardTypeUseCase {
        const cardType = this.noteType.cardTypes.get(faceName)
        return new ManageCardTypeUseCase(cardType)
    }
}

