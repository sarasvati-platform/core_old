import { StepDefinitions } from 'jest-cucumber'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/note-types/manage-note-types'
import { context } from '@tests/features/context'
import { FakeNoteTypeRepository as FakeNoteTypeRepository } from '@tests/ports/fake-note-types-repository'
import { FakeNoteRepository } from '@tests/ports/fake-note-repository'
import { ManageNotesUseCase } from '@src/flashcards/use-cases/notes/manage-notes'
import { ManageCardsUseCase } from '@src/flashcards/use-cases/cards/manage-cards'
import { FakeCardRepository } from '@tests/ports/fake-card-repository'
import { ReviewCardsUseCase } from '@src/flashcards/use-cases/cards/review-cards'
import { CardRenderer } from '@src/flashcards/aux/card-renderer'


export const deckSteps: StepDefinitions = ({ given }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Given                                   */
    /* -------------------------------------------------------------------------- */

    given(/Empty deck/, () => {
        context.lastError = undefined
        context.noteTypesUseCase = new ManageNoteTypesUseCase(
            new FakeNoteTypeRepository()
        )
        context.notesUseCase = new ManageNotesUseCase(
            new FakeNoteRepository()
        )
        context.cardsUseCase = new ManageCardsUseCase(
            new FakeCardRepository()
        )
        context.cardsReviewUseCase = new ReviewCardsUseCase(
            new CardRenderer()
        )
    })
}