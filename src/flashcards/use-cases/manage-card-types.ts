import { EntityId } from '@src/core/models/entity'
import { SarasvatiError } from '@src/core/exceptions'

import { ICardTypeRepository } from '@src/flashcards/ports'
import { CardType } from '@src/flashcards/models'
import { ManageCardTypeUseCase } from '@src/flashcards/use-cases/manage-card-type'


export class ManageCardTypesUseCase {
    constructor(
        private repository: ICardTypeRepository<EntityId>
    ) {}

    /**
     * Creates a new card type
     * @param name Card type name
     * @returns Newly created card type
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
     * @returns Card type if found, otherwise undefined
     */
    find(id: EntityId): CardType {
        return this.repository.findCardTypeById(id)
    }

    /**
     * Returns manager to manage specified card type
     * @param cardTypeId Id of card type to manage
     * @returns Manager
     * @throws {SarasvatiError} No card type found
     */
    manage(cardTypeId: EntityId): ManageCardTypeUseCase {
        const cardType = this.find(cardTypeId)
        if (!cardType) { throw new SarasvatiError('No card type found') }
        return new ManageCardTypeUseCase(cardType)
    }
}
