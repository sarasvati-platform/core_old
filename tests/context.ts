import { SarasvatiError } from "@src/core/exceptions"
import { CardType } from "@src/flashcards/models"
import { ICardTypeRepository } from "@src/flashcards/ports"
import { ManageCardTypesUseCase } from "@src/flashcards/use-cases/manage-card-types"

type EntityId = string

export class DummyCardTypeRepository implements ICardTypeRepository<string> {
    private data: Map<EntityId, CardType> = new Map()

    createCardType(name: string): CardType {
        const cardType = new CardType(name, name)
        this.data.set(cardType.id, cardType)
        return cardType
    }

    deleteCardType(id: EntityId): void {
        this.data.delete(id)
    }

    findCardTypeById(id: EntityId): CardType {
        return this.data.get(id)
    }
}

export const context = {
    lastError: undefined,
    handleError: (error: Error) => {
        if (error instanceof SarasvatiError) {
            context.lastError = error
            return
        }
        console.error(error)
        throw Error('Unknown error: ' + error)
    },
    cardTypesUseCase: new ManageCardTypesUseCase(
        new DummyCardTypeRepository()
    )
}

export const wrapper = (fn: (...args: any[]) => any) => {
    return function(...args: any[]): any {
        try { return fn(...args) } catch (e) { context.handleError(e) }
    }
}
