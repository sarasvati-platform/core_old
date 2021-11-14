import { SarasvatiError } from "@src/core/exceptions"
import { ManageCardTypesUseCase } from "@src/flashcards/use-cases/manage-card-types"


class Context {
    public lastError = undefined
    public cardTypesUseCase: ManageCardTypesUseCase = undefined

    handleError(error: Error) {
        if (error instanceof SarasvatiError) {
            this.lastError = error
            return
        }
        console.error(error)
        throw Error('Unknown error: ' + error)
    }
}

export const context = new Context()

export const wrapper = (fn: (...args: any[]) => any) => {
    return function(...args: any[]): any {
        try { return fn(...args) } catch (e) { context.handleError(e) }
    }
}
