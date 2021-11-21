import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/features/context'

export const errorSteps: StepDefinitions = ({ then }) => {
    then(/^User sees an error '(.*)'$/, (errorMessage) => {
        expect(context.lastError).toBeDefined()
        expect(context.lastError.message).toEqual(errorMessage)
    })

    then(/^User sees no error$/, () => {
        expect(context.lastError).toBeUndefined()
    })
}
