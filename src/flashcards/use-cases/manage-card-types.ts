import { EntityId } from '@src/core/models/entity'
import { CardField, CardType } from '@src/flashcards/models'
import { ICardTypeRepository } from '@src/flashcards/ports'

export class ManageCardTypesUseCase {
    constructor(
        private repository: ICardTypeRepository<EntityId>
    ) {}

    /**
     * Creates the new type of cards
     * @param name Name of the new type of cards
     * @returns New type of cards
     */
    createCardType(name: string): CardType {
        return this.repository.createCardType(name)
    }

    /**
     * Deletes card type
     * @param cardType Card type to delete
     */
    deleteCardType(cardType: CardType) {
        this.repository.deleteCardType(cardType.id)
    }

    /**
     * Finds card type
     * @param id Id of card type
     * @returns Card type if found
     */
    findCardTypeById(id: EntityId): CardType {
        return this.repository.findCardTypeById(id)
    }

    addFieldToCardType(cardTypeId: EntityId, fieldName: string) {
        const cardType = this.repository.findCardTypeById(cardTypeId)
        const newField = new CardField(fieldName)
        cardType.fields.add(newField)
        return newField
    }

    deleteFieldFromCardType(cardTypeId: EntityId, fieldName: string) {
        const cardType = this.findCardTypeById(cardTypeId)
        const field = cardType.fields.get(fieldName)
        cardType.fields.delete(field)
    }

    renameFieldOfCardType(cardTypeId: EntityId, oldFieldName: string, newFieldName: string) {
        const cardType = this.findCardTypeById(cardTypeId)
        const field = cardType.fields.get(oldFieldName)
        cardType.fields.rename(field, newFieldName)
    }

    moveFieldOfCardType(cardTypeId: EntityId, fieldName: string, position: number) {
        const cardType = this.findCardTypeById(cardTypeId)
        const field = cardType.fields.get(fieldName)
        cardType.fields.moveTo(field, position)
    }
}