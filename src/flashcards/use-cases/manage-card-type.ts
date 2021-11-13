import { CardField, CardType } from '@src/flashcards/models';


export class ManageCardTypeUseCase {
    constructor(
        private cardType: CardType
    ) { }

    addField(fieldName: string): CardField {
        const newField = new CardField(fieldName)
        this.cardType.fields.add(newField)
        return newField
    }

    deleteField(fieldName: string) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.delete(field)
    }

    renameField(oldFieldName: string, newFieldName: string) {
        const field = this.cardType.fields.get(oldFieldName)
        this.cardType.fields.rename(field, newFieldName)
    }

    moveField(fieldName: string, position: number) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.moveTo(field, position)
    }
}
