import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/context'


export const cardTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' field to the '(.*)' card type$/, (fieldName, cardTypeName) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        try {
            cardType.fields.create(fieldName)
        } catch (exception) {
            context.handleError(exception)
        }
    })

    when(/^User adds the following fields to the '(.*)' card type$/, (cardTypeName, fields) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        try {
            for (const field of fields) {
                cardType.fields.create(field['Field'])
            }
        } catch (exception) {
            context.handleError(exception)
        }
    })

    when(/^User deletes '(.*?)' field from '(.*?)' card type$/, (fieldName, cardTypeName) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        cardType.fields.delete(fieldName)
    })

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' card type$/, (oldFieldName, newFieldName, cardTypeName) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)

        try {
            cardType.fields.rename(oldFieldName, newFieldName)
        } catch (exception) {
            context.handleError(exception)
        }
    })

    when(/^User changes postion of '(.*)' field of '(.*)' card type to (-?\d+)$/, (fieldName, cardTypeName, position) => {
        const cardType = context.cardTypesUseCase.findCardTypeById(cardTypeName)
        try {
            cardType.fields.changePosition(fieldName, +position-1)
        } catch (exception) {
            context.handleError(exception)
        }
    })

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

        for (const field of fields) {
            expect(cardType.fields.get(field['Field'])).toBeDefined()

            const positionIndex = field['Order']
            if (positionIndex) {
                expect(cardType.fields.getPosition(field['Field'])).toStrictEqual(+positionIndex-1)
            }

        }
    })
}