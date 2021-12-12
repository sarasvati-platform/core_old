import { SarasvatiError } from '@src/core/exceptions'
import { EntityId, IHasId } from '@src/core/models/entity'
import { NoteType } from '@src/flashcards/models'

export class Note implements IHasId<string> {
    private fieldValues = {}

    /**
     * Initializes a new instance of the Note class using the specified id and type
     * @param id Id of a Note
     * @param type Type of a Note
     */
    constructor(
        public id: EntityId,
        public readonly type: NoteType
    ) {
    }

    get question(): string {
        const questionField = this.type.fields.all[0]
        return this.fieldValues[questionField.name]
    }

    /**
     * Returns value of the specified field
     * @param fieldName Name of a field
     * @returns Value of a field
     * @throws {SarasvatiError} If no field found
     */
    getFieldValue(fieldName: string): string {
        this.throwIfNoFieldFound(fieldName)
        return this.fieldValues[fieldName]
    }

    /**
     * Sets value of the specified field
     * @param fieldName Name of a field
     * @param value New value
     * @throws {SarasvatiError} If no field found
     */
    setFieldValue(fieldName: string, value: string) {
        this.throwIfNoFieldFound(fieldName)
        this.fieldValues[fieldName] = value
    }

    private throwIfNoFieldFound(fieldName: string) {
        const field = this.type.fields.find(fieldName)
        if (!field) {
            throw new SarasvatiError('No field found')
        }
    }
}