import { SarasvatiError } from '@src/core/exceptions';
import { EntityId, IHasId } from '@src/core/models/entity'
import { CardType } from '@src/flashcards/models'

export class Card implements IHasId<string> {
    private fieldValues = {}

    constructor(
        public id: EntityId,
        public readonly cardType: CardType
    ) {
    }

    get question(): string {
        const questionField = this.cardType.fields.all[0]
        return this.fieldValues[questionField.name]
    }

    getFieldValue(fieldName: string): string {
        const field = this.cardType.fields.find(fieldName)
        if (!field) {
            throw new SarasvatiError('No field found')
        }
        return this.fieldValues[field.name]
    }

    setFieldValue(fieldName: string, value: string) {
        const field = this.cardType.fields.find(fieldName)
        if (!field) {
            throw new SarasvatiError('No field found')
        }
        this.fieldValues[field.name] = value
    }

}