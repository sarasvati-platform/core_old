import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' note type$/, wrapper((cardTypeName) => {
        context.cardTypesUseCase.create(cardTypeName)
    }))

    when(/^User deletes '([^']*)' note type$/, wrapper((cardTypeName) => {
        const noteType = context.cardTypesUseCase.find(cardTypeName)
        context.cardTypesUseCase.delete(noteType)
    }))

    when(/^User creates '(.*)' note type with the following fields$/, wrapper((cardTypeName, fieldsTable) => {
        context.cardTypesUseCase.create(cardTypeName)
        for (const fieldRow of fieldsTable) {
            context.cardTypesUseCase.manage(cardTypeName).addField(fieldRow['Field'])
        }
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User has( no | )the following note types$/, (hasOrNot, cardTypeNames) => {
        const hasOrNotValue = hasOrNot.trim() !== 'no'
        for (const cardTypeName of cardTypeNames) {
            const noteType = context.cardTypesUseCase.find(cardTypeName['Card Type'])
            if (hasOrNotValue) {
                expect(noteType).toBeDefined()
                expect(noteType.name).toEqual(cardTypeName['Card Type'])
            } else {
                expect(noteType).toBeUndefined()
            }
        }
    })
}