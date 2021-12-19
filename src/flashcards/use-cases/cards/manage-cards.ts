import { EntityId } from '@src/core/models/entity'
import { CardsGenerator } from '@src/flashcards/aux/card-generator'
import { Note, Card } from '@src/flashcards/models'
import { ICardRepository } from '@src/flashcards/ports'

export class ManageCardsUseCase {
    private generator: CardsGenerator

    constructor(
        private repository: ICardRepository<EntityId>
    ) {
        this.generator = new CardsGenerator(repository)
    }

    getCards(): ReadonlyArray<Card> {
        return this.repository.getAllCards()
    }

    getCardsOfNote(note: Note): ReadonlyArray<Card> {
        return this.repository.getCardsOfNote(note)
    }

    updateCardsForNote(note: Note) {
        console.log('updateCardsForNote')
        const cards = this.generator.generateCards(note)
        console.log(cards)
        for (const card of cards) {
            this.repository.saveCard(card)
        }
    }
}
