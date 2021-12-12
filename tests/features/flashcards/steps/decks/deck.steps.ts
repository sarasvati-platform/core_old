import { StepDefinitions } from 'jest-cucumber'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/note-types/manage-note-types'
import { context } from '@tests/features/context'
import { DummyNoteTypeRepository } from '@tests/ports/dummy-note-types-repository'
import { DummyCardRepository } from '@tests/ports/dummy-note-repository'
import { ManageNotesUseCase } from '@src/flashcards/use-cases/notes/manage-notes'


export const deckSteps: StepDefinitions = ({ given }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Given                                   */
    /* -------------------------------------------------------------------------- */

    given(/Empty deck/, () => {
        context.lastError = undefined
        context.noteTypesUseCase = new ManageNoteTypesUseCase(
            new DummyNoteTypeRepository()
        )
        context.notesUseCase = new ManageNotesUseCase(
            new DummyCardRepository()
        )
    })
}