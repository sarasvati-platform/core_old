import { EntityId } from '@src/core/models/entity'
import { ICardTypeRepository } from '@src/flashcards/ports'
import { CardType } from '@src/flashcards/models'
import { ManageCardTypeUseCase } from '@src/flashcards/use-cases/manage-card-type'

export class ManageCardTypesUseCase {
    constructor(
        private repository: ICardTypeRepository<EntityId>
    ) {}

    /**
     * Creates the new type of cards
     * @param name Name of the new type of cards
     * @returns New type of cards
     */
    create(name: string): CardType {
        return this.repository.createCardType(name)
    }

    /**
     * Deletes card type
     * @param cardType Card type to delete
     */
    delete(cardType: CardType) {
        this.repository.deleteCardType(cardType.id)
    }

    /**
     * Finds card type
     * @param id Id of card type
     * @returns Card type if found
     */
    find(id: EntityId): CardType {
        return this.repository.findCardTypeById(id)
    }

    /**
     * Manage specified card type
     * @param cardTypeId Id of card type to manage
     * @returns Manager
     */
    manage(cardTypeId: EntityId) {
        const cardType = this.find(cardTypeId)
        return new ManageCardTypeUseCase(cardType)
    }
}
