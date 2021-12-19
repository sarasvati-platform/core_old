import { EntityId } from '@src/core/models/entity'
import { Card, CardType, Note } from '@src/flashcards/models'
import { ICardRepository } from '@src/flashcards/ports'

export class FakeCardRepository implements ICardRepository<string> {
    private data: Map<EntityId, Card> = new Map()

    createCard(type: CardType, note: Note): Card {
        const id = Math.random().toString(36).substring(2)
        return new Card(id, type, note)
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

    getAllCards(): Card[] {
        return [...this.data.values()]
    }

    getCardsOfNote(note: Note): Card[] {
        return [...this.data.values()].filter(x => x.note.id === note.id)
    }
}
