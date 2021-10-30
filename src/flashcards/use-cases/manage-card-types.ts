import { CardType } from '@src/flashcards/models';
import { ICardTypeRepository } from '@src/flashcards/ports'

export default class ManageCardTypesUseCase {
    constructor(
        private repository: ICardTypeRepository
    ) {}

    /**
     * Creates the new type of cards
     * @param name Name of the new type of cards
     * @returns New type of cards
     */
    createCardType(name: string): CardType {
        return this.repository.createCardType(name)
    }

    /**
     * Deletes card type
     * @param cardType Card type to delete
     */
    deleteCardType(cardType: CardType) {
        this.repository.deleteCardType(cardType.id)
    }

    /**
     * Finds card type
     * @param id Id of card type
     * @returns Card type if found
     */
    findCardTypeById(id: string): CardType {
        return this.repository.findCardTypeById(id)
    }

    /**
     * Add new field the the specified CardType
     * @param cardType CardType to add field to
     * @param fieldName Name of the filed
     */
    addField(cardType: CardType, fieldName: string) {
        cardType.addField(fieldName)
    }

    /**
     * Deletes fields from CardType
     * @param cardType CardType to delete field from
     * @param fieldName Name of the field to delete
     */
    deleteField(cardType: CardType, fieldName: string) {
        cardType.deleteField(fieldName)
    }

    /**
     * Renames field
     * @param cardType CardType to rename field for
     * @param oldFieldName Old field name
     * @param newFieldName New field name
     */
    renameField(cardType: CardType, oldFieldName: string, newFieldName: string) {
        cardType.renameField(oldFieldName, newFieldName)
    }

    /**
     * Check for existance of the field in the specified CardType
     * @param cardType CardType to chech
     * @param fieldName Name of the field
     * @returns True if CartType has a field
     */
    hasField(cardType: CardType, fieldName: string): boolean {
        return cardType.getField(fieldName) !== undefined
    }
}