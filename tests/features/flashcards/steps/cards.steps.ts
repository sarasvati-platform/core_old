import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' card$/, wrapper((cardTypeName, fieldsTable) => {
        const cardType = context.cardTypesUseCase.find(cardTypeName)
        const card = context.cardsUseCase.create(cardType)
        for (const fieldRow of fieldsTable) {
            card.setFieldValue(fieldRow['Field'], fieldRow['Value'])
        }
        context.cardsUseCase.save(card)
    }))

    when(/^User deletes '(.*)' card$/, wrapper((cardQuestion) => {
        const card = context.cardsUseCase.findByQuestion(cardQuestion)
        context.cardsUseCase.delete(card[0])
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User can find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findByQuestion(cardQuestion)
        expect(cards.map(x => x.question)).toStrictEqual([cardQuestion])
    })

    then(/^User can\'t find card by '(.*)'$/, (cardQuestion) => {
        const cards = context.cardsUseCase.findByQuestion(cardQuestion)
        expect(cards).toStrictEqual([])
    })
}