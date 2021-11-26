import { EntityId } from '@src/core/models/entity'
import { ICardRepository, IQuestionComparer } from '@src/flashcards/ports'
import { QuestionComparer } from '@src/flashcards/aux/question-comparer'
import { Card, NoteType } from '@src/flashcards/models'
import { NoteQuestionIsUniqueRule } from '@src/flashcards/rules/note-question-is-unique'
import { NoteTypeMustHaveFieldsRule } from '../rules/note-type-must-have-fields'


/**
 * Manages list of [cards]{@link Card}.
 */
export class ManageCardsUseCase {
    private cardQuestionIsUnique: NoteQuestionIsUniqueRule
    private cardTypeMustHaveFields: NoteTypeMustHaveFieldsRule

    /**
     * Initializes a new instance of the ManageCardsUseCase class
     * @param repository Card repository
     * @param questionComparer Comparer to find cards by question
     */
    constructor(
        private repository: ICardRepository<EntityId>,
        private questionComparer: IQuestionComparer = new QuestionComparer()
    ) {
        this.cardQuestionIsUnique = new NoteQuestionIsUniqueRule(repository, questionComparer)
        this.cardTypeMustHaveFields = new NoteTypeMustHaveFieldsRule()
    }

    /**
     * Creates a new card
     * @param name Note type name
     * @returns Newly created note type
     */
    createCard(noteType: NoteType): Card {
        this.cardTypeMustHaveFields.check(noteType)
        return this.repository.createCard(noteType)
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
