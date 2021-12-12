import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const nodeTypeFieldsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' field to the '(.*)' note type$/, wrapper((fieldName, noteTypeName) => {
        context.noteTypesUseCase.manage(noteTypeName).createField(fieldName)
    }))

    when(/^User adds the following fields to the '(.*)' note type$/, wrapper((noteTypeName, fieldsTable) => {
        for (const fieldRow of fieldsTable) {
            context.noteTypesUseCase.manage(noteTypeName).createField(fieldRow['Field'])
        }
    }))

    when(/^User deletes '(.*?)' field from '(.*?)' note type$/, wrapper((fieldName, noteTypeName) => {
        context.noteTypesUseCase.manage(noteTypeName).deleteField(fieldName)
    }))

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' note type$/, wrapper((oldFieldName, newFieldName, noteTypeName) => {
        context.noteTypesUseCase.manage(noteTypeName).renameField(oldFieldName, newFieldName)
    }))

    when(/^User changes position of '(.*)' field of '(.*)' note type to (-?\d+)$/, wrapper((fieldName, noteTypeName, position) => {
        context.noteTypesUseCase.manage(noteTypeName).moveField(fieldName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Note type '(.*)' has( no | )field '(.*)'$/, (noteTypeName, value, fieldName) => {
        const hasOrNot = value.trim()
        const noteType = context.noteTypesUseCase.find(noteTypeName)

        const expectValue = expect(noteType.fields.find(fieldName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Note type '(.*)' has the following fields$/, (noteTypeName, fieldsTable) => {
        const noteType = context.noteTypesUseCase.find(noteTypeName)

        for (const fieldRow of fieldsTable) {
            const field = noteType.fields.find(fieldRow['Field'])
            expect(field).toBeDefined()

            const positionIndex = fieldRow['Order']
            if (positionIndex) {
                expect(noteType.fields.indexOf(field)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}