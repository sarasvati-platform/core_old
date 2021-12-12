import { SarasvatiError } from '@src/core/exceptions'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/note-types/manage-note-types'
import { ManageNotesUseCase } from '@src/flashcards/use-cases/notes/manage-notes'


class Context {
    public lastError = undefined
    public noteTypesUseCase: ManageNoteTypesUseCase = undefined
    public notesUseCase: ManageNotesUseCase = undefined

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
