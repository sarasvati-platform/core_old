import { EntityId } from '@src/core/models/entity'
import { Card, CardType } from '@src/flashcards/models'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'

export class DummyCardRepository implements ICardRepository<string> {
    private data: Map<EntityId, Card> = new Map()

    createCard(cardType: CardType): Card {
        const id = Math.random().toString(36).substring(2)
        return new Card(id, cardType)
    }

    saveCard(card: Card) {
        this.data.set(card.id, Object.create(card))
    }

    deleteCard(id: string): void {
        this.data.delete(id)
    }

    findCardById(id: string): Card {
        return this.data.get(id)
    }

    findCardByQuestion(question: string, comparer: IQuestionComparer): Card[] {
        const result = []
        for (const card of this.data.values()) {
            const equal = comparer.isEqual(card.question, question)
            if (equal) { result.push(card) }
        }
        return result
    }
}
