import { StepDefinitions } from 'jest-cucumber'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/manage-note-types'
import { context } from '@tests/features/context'
import { DummyNoteTypeRepository } from '@tests/ports/dummy-card-types-repository'
import { DummyCardRepository } from '@tests/ports/dummy-card-repository'
import { ManageCardsUseCase } from '@src/flashcards/use-cases/manage-cards'


export const deckSteps: StepDefinitions = ({ given }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Given                                   */
    /* -------------------------------------------------------------------------- */

    given(/Empty deck/, () => {
        context.lastError = undefined
        context.cardTypesUseCase = new ManageNoteTypesUseCase(
            new DummyNoteTypeRepository()
        )
        context.cardsUseCase = new ManageCardsUseCase(
            new DummyCardRepository()
        )
    })
}