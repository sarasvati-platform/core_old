import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/context'


export const cardTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' field to the '(.*)' card type$/, wrapper((fieldName, cardTypeName) => {
        context.cardTypesUseCase.addFieldToCardType(cardTypeName, fieldName)
    }))

    when(/^User adds the following fields to the '(.*)' card type$/, wrapper((cardTypeName, fields) => {
        for (const field of fields) {
            context.cardTypesUseCase.addFieldToCardType(cardTypeName, field['Field'])
        }
    }))

    when(/^User deletes '(.*?)' field from '(.*?)' card type$/, wrapper((fieldName, cardTypeName) => {
        context.cardTypesUseCase.deleteFieldFromCardType(cardTypeName, fieldName)
    }))

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' card type$/, wrapper((oldFieldName, newFieldName, cardTypeName) => {
        context.cardTypesUseCase.renameFieldOfCardType(cardTypeName, oldFieldName, newFieldName)
    }))

    when(/^User changes postion of '(.*)' field of '(.*)' card type to (-?\d+)$/, wrapper((fieldName, cardTypeName, position) => {
        context.cardTypesUseCase.moveFieldOfCardType(cardTypeName, fieldName, position)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card type '(.*)' has( no | )field '(.*)'$/, (cardTypeName, value, fieldName) => {
        const hasOrNot = value.trim()
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        const expectValue = expect(cardType.fields.get(fieldName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Card type '(.*)' has the following fields$/, (cardTypeName, fields) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        for (const fieldData of fields) {
            const field = cardType.fields.get(fieldData['Field'])
            expect(field).toBeDefined()

            const positionIndex = field['Order']
            if (positionIndex) {
                expect(cardType.fields.indexOf(field)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}