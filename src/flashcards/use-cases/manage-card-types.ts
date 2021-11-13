import { EntityId } from '@src/core/models/entity'
import { CardType } from '@src/flashcards/models'
import { ICardTypeRepository } from '@src/flashcards/ports'

export class ManageCardTypesUseCase {
    constructor(
        private repository: ICardTypeRepository
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
}