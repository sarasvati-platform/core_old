import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const nodeTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' field to the '(.*)' note type$/, wrapper((fieldName, cardTypeName) => {
        context.noteTypesUseCase.manage(cardTypeName).addField(fieldName)
    }))

    when(/^User adds the following fields to the '(.*)' note type$/, wrapper((cardTypeName, fields) => {
        for (const field of fields) {
            context.noteTypesUseCase.manage(cardTypeName).addField(field['Field'])
        }
    }))

    when(/^User deletes '(.*?)' field from '(.*?)' note type$/, wrapper((fieldName, cardTypeName) => {
        context.noteTypesUseCase.manage(cardTypeName).deleteField(fieldName)
    }))

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, wrapper((oldFieldName, newFieldName, cardTypeName) => {
        context.noteTypesUseCase.manage(cardTypeName).renameField(oldFieldName, newFieldName)
    }))

    when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, wrapper((fieldName, cardTypeName, position) => {
        context.noteTypesUseCase.manage(cardTypeName).moveField(fieldName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Note type '(.*)' has( no | )field '(.*)'$/, (cardTypeName, value, fieldName) => {
        const hasOrNot = value.trim()
        const noteType = context.noteTypesUseCase.find(cardTypeName)

        const expectValue = expect(noteType.fields.find(fieldName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Note type '(.*)' has the following fields$/, (cardTypeName, fields) => {
        const noteType = context.noteTypesUseCase.find(cardTypeName)

        for (const fieldData of fields) {
            const field = noteType.fields.find(fieldData['Field'])
            expect(field).toBeDefined()

            const positionIndex = fieldData['Order']
            if (positionIndex) {
                expect(noteType.fields.indexOf(field)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}