import { StepDefinitions } from 'jest-cucumber'
import { ManageCardTypesUseCase } from '@src/flashcards/use-cases/manage-card-types'
import { context } from '@tests/features/context'
import { DummyCardTypeRepository } from '@tests/ports/dummy-card-types-repository'
import { DummyCardRepository } from '@tests/ports/dummy-card-repository'
import { ManageCardsUseCase } from '@src/flashcards/use-cases/manage-cards'


export const deckSteps: StepDefinitions = ({ given }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Given                                   */
    /* -------------------------------------------------------------------------- */

    given(/Empty deck/, () => {
        context.lastError = undefined
        context.cardTypesUseCase = new ManageCardTypesUseCase(
            new DummyCardTypeRepository()
        )
        context.cardsUseCase = new ManageCardsUseCase(
            new DummyCardRepository()
        )
    })
}