import { EntityId } from '@src/core/models/entity'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'
import { QuestionComparer } from '@src/flashcards/aux/question-comparer'
import { Card, CardType } from '@src/flashcards/models'
import { CardQuestionIsUniqueRule } from '@src/flashcards/rules/card-question-is-unique'
import { CardTypeMustHaveFieldsRule } from '../rules/card-type-must-have-fields'


/**
 * Manages list of [cards]{@link Card}.
 */
export class ManageCardsUseCase {
    private cardQuestionIsUnique: CardQuestionIsUniqueRule
    private cardTypeMustHaveFields: CardTypeMustHaveFieldsRule

    /**
     * Initializes a new instance of the ManageCardsUseCase class
     * @param repository Card repository
     * @param questionComparer Comparer to find cards by question
     */
    constructor(
        private repository: ICardRepository<EntityId>,
        private questionComparer: IQuestionComparer = new QuestionComparer()
    ) {
        this.cardQuestionIsUnique = new CardQuestionIsUniqueRule(repository, questionComparer)
        this.cardTypeMustHaveFields = new CardTypeMustHaveFieldsRule()
    }

    /**
     * Creates a new card
     * @param name Card type name
     * @returns Newly created card type
     */
    createCard(cardType: CardType): Card {
        this.cardTypeMustHaveFields.check(cardType)
        return this.repository.createCard(cardType)
    }

    /**
     * Saves changes of specified card
     * @param card Card to save
     */
    saveCard(card: Card) {
        this.cardQuestionIsUnique.check(card.question)
        this.repository.saveCard(card)
    }

    /**
     * Deletes card
     * @param card Card to delete
     */
    deleteCard(card: Card) {
        this.repository.deleteCard(card.id)
    }

    /**
     * Finds card
     * @param id Id of card
     * @returns Card if found, otherwise undefined
     */
    findCard(id: EntityId): Card {
        return this.repository.findCardById(id)
    }

    /**
     * Find cards by question
     * @param question Search criteria
     * @returns List of cards that matches the searching criteria
     */
    findCardByQuestion(question: string): Card[]  {
        return this.repository.findCardByQuestion(question, this.questionComparer)
    }
}
