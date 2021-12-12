import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const nodeTypesManageSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' note type$/, wrapper((noteTypeName) => {
        context.noteTypesUseCase.create(noteTypeName)
    }))

    when(/^User deletes '([^']*)' note type$/, wrapper((noteTypeName) => {
        const noteType = context.noteTypesUseCase.find(noteTypeName)
        context.noteTypesUseCase.delete(noteType)
    }))

    when(/^User creates '(.*)' note type with the following fields$/, wrapper((noteTypeName, fieldsTable) => {
        context.noteTypesUseCase.create(noteTypeName)
        for (const fieldRow of fieldsTable) {
            context.noteTypesUseCase.manage(noteTypeName).createField(fieldRow['Field'])
        }
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User has( no | )the following note types$/, (hasOrNot, noteTypeTable) => {
        const hasOrNotValue = hasOrNot.trim() !== 'no'
        for (const noteTypeRow of noteTypeTable) {
            const noteType = context.noteTypesUseCase.find(noteTypeRow['Note Type'])
            if (hasOrNotValue) {
                expect(noteType).toBeDefined()
                expect(noteType.name).toEqual(noteTypeRow['Note Type'])
            } else {
                expect(noteType).toBeUndefined()
            }
        }
    })
}