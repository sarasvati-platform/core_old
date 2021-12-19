import { Card, RenderedCard } from '@src/flashcards/models'

export default interface ICardRenderer {
    /**
     * Renders specified card
     * @param card Card to render
     */
    render(card: Card): RenderedCard
}
