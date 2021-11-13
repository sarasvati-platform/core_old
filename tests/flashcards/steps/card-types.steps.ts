import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/context'


export const cardTypeSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' card type$/, (cardTypeName) => {
        try {
            context.cardTypesUseCase.createCardType(cardTypeName)
        } catch (exception) {
            context.handleError(exception)
        }
    })

    when(/^User deletes '([^\']*)' card type$/, (cardTypeName) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)
        context.cardTypesUseCase.deleteCardType(cardType)
    })

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User has( no | )the following card types$/, (hasOrNot, cardTypeNames) => {
        const hasOrNotValue = hasOrNot.trim() !== 'no'
        for (const cardTypeName of cardTypeNames) {
            const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName['Card Type'])
            if (hasOrNotValue) {
                expect(cardType).toBeDefined()
            } else {
                expect(cardType).toBeUndefined()
            }
        }
    })
}