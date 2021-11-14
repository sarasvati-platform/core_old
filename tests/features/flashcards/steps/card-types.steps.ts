import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' card type$/, wrapper((cardTypeName) => {
        context.cardTypesUseCase.create(cardTypeName)
    }))

    when(/^User deletes '([^\']*)' card type$/, wrapper((cardTypeName) => {
        const cardType = context.cardTypesUseCase.find(cardTypeName)
        context.cardTypesUseCase.delete(cardType)
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User has( no | )the following card types$/, (hasOrNot, cardTypeNames) => {
        const hasOrNotValue = hasOrNot.trim() !== 'no'
        for (const cardTypeName of cardTypeNames) {
            const cardType = context.cardTypesUseCase.find(cardTypeName['Card Type'])
            if (hasOrNotValue) {
                expect(cardType).toBeDefined()
                expect(cardType.name).toEqual(cardTypeName['Card Type'])
            } else {
                expect(cardType).toBeUndefined()
            }
        }
    })
}