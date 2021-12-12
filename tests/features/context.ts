import { SarasvatiError } from '@src/core/exceptions'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/note-types/manage-note-types'
import { ManageCardsUseCase } from '@src/flashcards/use-cases/cards/manage-cards'


class Context {
    public lastError = undefined
    public noteTypesUseCase: ManageNoteTypesUseCase = undefined
    public cardsUseCase: ManageCardsUseCase = undefined

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const wrapper = (fn: (...args: any[]) => any) => {
    return function(...args: any[]): any {
        try { return fn(...args) } catch (e) { context.handleError(e) }
    }
}
