import { SarasvatiError } from '@src/core/exceptions'
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

    manage(cardTypeId: EntityId) {
        const cardType = this.findCardTypeById(cardTypeId)
        return new ManageCardTypeUseCase(cardType)
    }
}

export class ManageCardTypeUseCase {
    constructor(
        private cardType: CardType
    ) {}

    addFieldToCardType(fieldName: string) {
        const newField = new CardField(fieldName)
        this.cardType.fields.add(newField)
        return newField
    }

    deleteFieldFromCardType(fieldName: string) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.delete(field)
    }

    renameFieldOfCardType(oldFieldName: string, newFieldName: string) {
        const field = this.cardType.fields.get(oldFieldName)
        this.cardType.fields.rename(field, newFieldName)
    }

    moveFieldOfCardType(fieldName: string, position: number) {
        const field = this.cardType.fields.get(fieldName)
        this.cardType.fields.moveTo(field, position)
    }
}