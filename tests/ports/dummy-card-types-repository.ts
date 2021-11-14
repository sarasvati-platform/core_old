import { EntityId } from '@src/core/models/entity'
import { CardType } from '@src/flashcards/models'
import { ICardTypeRepository } from '@src/flashcards/ports'

export class DummyCardTypeRepository implements ICardTypeRepository<string> {
    private data: Map<EntityId, CardType> = new Map()

    createCardType(name: string): CardType {
        const cardType = new CardType(name, name)
        this.data.set(cardType.id, cardType)
        return cardType
    }

    deleteCardType(id: EntityId): void {
        this.data.delete(id)
    }

    findCardTypeById(id: EntityId): CardType {
        return this.data.get(id)
    }
}