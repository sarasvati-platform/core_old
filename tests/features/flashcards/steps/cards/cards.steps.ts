import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' card$/, wrapper((cardTypeName, fieldsTable) => {
        const noteType = context.noteTypesUseCase.find(cardTypeName)
        const card = context.cardsUseCase.createCard(noteType)
        for (const fieldRow of fieldsTable) {
            card.setFieldValue(fieldRow['Field'], fieldRow['Value'])
        }
        context.cardsUseCase.saveCard(card)
    }))

    when(/^User deletes '(.*)' card$/, wrapper((cardQuestion) => {
        const card = context.cardsUseCase.findCardByQuestion(cardQuestion)
        context.cardsUseCase.deleteCard(card[0])
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User can find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findCardByQuestion(cardQuestion)
        expect(cards.length).toEqual(1)
        // expect(cards.map(x => x.question)).toStrictEqual([cardQuestion])
    })

    then(/^User can't find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findCardByQuestion(cardQuestion)
        expect(cards).toStrictEqual([])
    })
}