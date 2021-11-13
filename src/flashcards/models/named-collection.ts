import { SarasvatiError } from "@src/core/exceptions"

export interface IHasName {
    get name(): string
    set name(value: string)
}

export class NamedCollection<T extends IHasName> {
    protected items: T[] = []

    get all(): T[] {
        return this.items
    }

    get(name: string): T {
        return this.items.find(
            item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        )
    }

    add(item: T) {
        this.throwIfFieldExists(item.name)
        this.items.push(item)
    }

    delete(item: T) {
        this.throwIfFieldNotExists(item)
        this.items = this.items.filter(i => i !== item)
    }

    rename(item: T, newName: string) {
        this.throwIfFieldExists(newName)
        this.throwIfFieldNotExists(item)
        item.name = newName
    }

    indexOf(item: T) {
        return this.items.indexOf(item)
    }

    moveTo(item: T, position: number) {
        this.throwIfIncorrectPosition(position)

        const currentIndex = this.indexOf(item)
        // TODO: itme doesn't belong collection
        const oldItem = this.items[position]
        const newItem = this.items[currentIndex]
        this.items[position] = newItem
        this.items[currentIndex] = oldItem
    }

    private throwIfFieldNotExists(item: T) {
        if (!item)
            throw new SarasvatiError('Field does not exist')
    }

    private throwIfFieldExists(fieldName: string) {
        const field = this.get(fieldName)
        if (field)
            throw new SarasvatiError('Field with same name already exists')
    }

    private throwIfIncorrectPosition(position: number) {
        const incorrectPosition = position < 0 || position >= this.items.length
        if (incorrectPosition)
            throw new SarasvatiError('Invalid field position')
    }
}
