import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/context'

export const errorSteps: StepDefinitions = ({ then }) => {
    then(/^User sees an error '(.*)'$/, (errorMessage) => {
        expect(context.lastError).toBeDefined()
        expect(context.lastError.message).toEqual(errorMessage)
    })
}
