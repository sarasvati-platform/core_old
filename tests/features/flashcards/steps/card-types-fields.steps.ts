import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' field to the '(.*)' card type$/, wrapper((fieldName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).addField(fieldName)
    }))

    when(/^User adds the following fields to the '(.*)' card type$/, wrapper((cardTypeName, fields) => {
        for (const field of fields) {
            context.cardTypesUseCase.manage(cardTypeName).addField(field['Field'])
        }
    }))

    when(/^User deletes '(.*?)' field from '(.*?)' card type$/, wrapper((fieldName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).deleteField(fieldName)
    }))

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' card type$/, wrapper((oldFieldName, newFieldName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).renameField(oldFieldName, newFieldName)
    }))

    when(/^User changes postion of '(.*)' field of '(.*)' card type to (-?\d+)$/, wrapper((fieldName, cardTypeName, position) => {
        context.cardTypesUseCase.manage(cardTypeName).moveField(fieldName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card type '(.*)' has( no | )field '(.*)'$/, (cardTypeName, value, fieldName) => {
        const hasOrNot = value.trim()
        const cardType = context.cardTypesUseCase.find(cardTypeName)

        const expectValue = expect(cardType.fields.find(fieldName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Card type '(.*)' has the following fields$/, (cardTypeName, fields) => {
        const cardType = context.cardTypesUseCase.find(cardTypeName)

        for (const fieldData of fields) {
            const field = cardType.fields.get(fieldData['Field'])
            expect(field).toBeDefined()

            const positionIndex = fieldData['Order']
            if (positionIndex) {
                expect(cardType.fields.indexOf(field)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}