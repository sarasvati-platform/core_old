import { SarasvatiError } from '@src/core/exceptions'
import { CardType } from '@src/flashcards/models'

/**
 * Checks if the type of creating card has at least one field
 */
export class CardTypeMustHaveFieldsRule {
    check(cardType: CardType) {
        if (cardType.fields.all.length <= 0) {
            throw new SarasvatiError('Cannot create card. Its type has no fields')
        }
    }
}