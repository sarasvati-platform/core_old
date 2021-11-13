import { StepDefinitions } from 'jest-cucumber'
import { ManageCardTypesUseCase } from '@src/flashcards/use-cases/manage-card-types'
import { context, DummyCardTypeRepository } from '@tests/context'


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