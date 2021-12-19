import { Card, RenderedCard } from '@src/flashcards/models'
import { ICardRenderer } from '@src/flashcards/ports'

export class CardRenderer implements ICardRenderer {
    render(card: Card) {
        const renderedSections = []
        for (const section of card.type.sections) {
            let template = section.template

            for (const field of card.note.type.fields.all) {
                template = template.replace('{{'+field.name+'}}', card.note.getFieldValue(field.name))
            }

            renderedSections.push(template)
        }

        return new RenderedCard(renderedSections)
    }
}

