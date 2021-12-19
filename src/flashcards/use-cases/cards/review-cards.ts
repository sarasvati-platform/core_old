import { Card, RenderedCard } from '@src/flashcards/models'
import { ICardRenderer } from '@src/flashcards/ports'

export class ReviewCardsUseCase {
    constructor(
        private cardRenderer: ICardRenderer
    ) {}

    renderCard(card: Card): RenderedCard {
        return this.cardRenderer.render(card)
    }
}
