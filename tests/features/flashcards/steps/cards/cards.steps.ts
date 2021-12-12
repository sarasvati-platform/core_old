import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' card$/, wrapper((cardTypeName, fieldsTable) => {
        const noteType = context.noteTypesUseCase.find(cardTypeName)
        const card = context.cardsUseCase.createNote(noteType)
        for (const fieldRow of fieldsTable) {
            card.setFieldValue(fieldRow['Field'], fieldRow['Value'])
        }
        context.cardsUseCase.saveNote(card)
    }))

    when(/^User deletes '(.*)' card$/, wrapper((cardQuestion) => {
        const card = context.cardsUseCase.findNoteByQuestion(cardQuestion)
        context.cardsUseCase.deleteNote(card[0])
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User can find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findNoteByQuestion(cardQuestion)
        expect(cards.length).toEqual(1)
    })

    then(/^User can't find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findNoteByQuestion(cardQuestion)
        expect(cards).toStrictEqual([])
    })
}