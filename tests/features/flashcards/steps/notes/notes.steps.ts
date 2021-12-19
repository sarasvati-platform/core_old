import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const notesSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User creates '(.*)' note$/, wrapper((noteTypeName, fieldsTable) => {
        console.log(1)
        const noteType = context.noteTypesUseCase.find(noteTypeName)
        if (!noteType) { throw Error(`No '${noteTypeName}' note type found`) }

        const note = context.notesUseCase.createNote(noteType)
        for (const fieldRow of fieldsTable) {
            note.setFieldValue(fieldRow['Field'], fieldRow['Value'])
        }
        context.notesUseCase.saveNote(note)
        context.cardsUseCase.updateCardsForNote(note)  // TODO: extract
    }))

    when(/^User updates '(.*)' note$/, (noteQuestion, fieldsTable) => {
        console.log(2)
        const note = context.notesUseCase.findNoteByQuestion(noteQuestion)[0]
        for (const fieldRow of fieldsTable) {
            note.setFieldValue(fieldRow['Field'], fieldRow['Value'])
        }
        context.notesUseCase.saveNote(note)
        context.cardsUseCase.updateCardsForNote(note)  // TODO: extract
    })

    when(/^User deletes '(.*)' note$/, wrapper((noteQuestion) => {
        const note = context.notesUseCase.findNoteByQuestion(noteQuestion)
        context.notesUseCase.deleteNote(note[0])
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^User can find note by '(.*)'$/, (noteQuestion) => {
        const note = context.notesUseCase.findNoteByQuestion(noteQuestion)
        expect(note.length).toEqual(1)
    })

    then(/^User can't find note by '(.*)'$/, (cardQuestion) => {
        const notes = context.notesUseCase.findNoteByQuestion(cardQuestion)
        expect(notes).toStrictEqual([])
    })
}