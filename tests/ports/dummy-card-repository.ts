import { EntityId } from '@src/core/models/entity'
import { Card, CardType } from '@src/flashcards/models'
import { ICardRepository } from '@src/flashcards/ports'

export class DummyCardRepository implements ICardRepository<string> {
    private data: Map<EntityId, Card> = new Map()

    createCard(cardType: CardType): Card {
        const id = this.data.size.toString()
        const card = new Card(id, cardType)
        this.data.set(id, card)
        return card
    }

    deleteCard(id: string): void {
        this.data.delete(id)
    }

    findCardById(id: string): Card {
        return this.data.get(id)
    }

    findByQuestion(question: string): Card[] {
        const result = []
        for (const card of this.data.values()) {
            if (card.question.toLocaleLowerCase() === question.toLocaleLowerCase()) { result.push(card) }
        }
        return result
    }
}