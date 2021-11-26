import { SarasvatiError } from '@src/core/exceptions'
import { EntityId, IHasId } from '@src/core/models/entity'
import { NoteType } from '@src/flashcards/models'

export class Card implements IHasId<string> {
    private fieldValues = {}

    constructor(
        public id: EntityId,
        public readonly noteType: NoteType
    ) {
    }

    get question(): string {
        const questionField = this.noteType.fields.all[0]
        return this.fieldValues[questionField.name]
    }

    getFieldValue(fieldName: string): string {
        const field = this.noteType.fields.find(fieldName)
        if (!field) {
            throw new SarasvatiError('No field found')
        }
        return this.fieldValues[field.name]
    }

    setFieldValue(fieldName: string, value: string) {
        const field = this.noteType.fields.find(fieldName)
        if (!field) {
            throw new SarasvatiError('No field found')
        }
        this.fieldValues[field.name] = value
    }

}