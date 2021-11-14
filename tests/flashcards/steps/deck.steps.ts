import { StepDefinitions } from 'jest-cucumber'
import { ManageCardTypesUseCase } from '@src/flashcards/use-cases/manage-card-types'
import { context } from '@tests/context'
import { DummyCardTypeRepository } from '@tests/ports/dummy-card-types-repository'


export const deckSteps: StepDefinitions = ({ given }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Given                                   */
    /* -------------------------------------------------------------------------- */

    given(/Empty deck/, () => {
        context.lastError = undefined
        context.cardTypesUseCase = new ManageCardTypesUseCase(
            new DummyCardTypeRepository()
        )
    })
}