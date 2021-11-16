import { SarasvatiError } from '@src/core/exceptions'

export interface IHasName {
    get name(): string
    set name(value: string)
}

export class NamedCollection<T extends IHasName> {
    protected items: T[] = []

    /**
     * Returns all times
     * @returns List of items
     */
    get all(): T[] {
        return this.items
    }

    /**
     * Get entity by name
     * @param name Name of entity to find
     * @returns Entity
     * @throws {SarasvatiError} If no entity found
     */
    get(name: string): T {
        const result = this.find(name)
        if (!result) { throw new SarasvatiError(`Not found: ${name}`) }
        return result
    }

    /**
     * Get entity by name
     * @param name Name of entity to find
     * @returns Entity if found, otherwise undefined
     */
    find(name: string): T {
        return this.items.find(
            item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        )
    }

    /**
     * Adds entity
     * @param item Item to add
     * @throws {SarasvatiError} If name is not unique
     */
    add(item: T) {
        this.throwIfNameIsNotUnique(item.name)
        this.items.push(item)
    }

    /**
     * Deletes item from collection
     * @param item Item to delete
     */
    delete(item: T) {
        this.throwIfItemDoesNotBelongCollection(item)
        this.items = this.items.filter(i => i !== item)
    }

    /**
     * Renames the item
     * @param item Item to rename
     * @param newName New name
     */
    rename(item: T, newName: string) {
        this.throwIfNameIsNotUnique(newName)
        this.throwIfItemDoesNotBelongCollection(item)
        item.name = newName
    }

    indexOf(item: T) {
        this.throwIfItemDoesNotBelongCollection(item)
        return this.items.indexOf(item)
    }

    /**
     * Changes position of the specified item
     * @param item Item to move
     * @param position New position
     */
    moveTo(item: T, position: number) {
        this.throwIfItemDoesNotBelongCollection(item)
        this.throwIfIncorrectPosition(position)

        const currentIndex = this.indexOf(item)
        this.items.splice(
            position, 0,
            this.items.splice(currentIndex, 1)[0]
        )
    }

    private throwIfItemDoesNotBelongCollection(item: T) {
        if (!this.items.includes(item))
            throw new SarasvatiError('Item does not belong to the collection')
    }

    private throwIfNameIsNotUnique(fieldName: string) {
        const field = this.find(fieldName)
        if (field)
            throw new SarasvatiError('Item with same name already exists')
    }

    private throwIfIncorrectPosition(position: number) {
        const incorrectPosition = position < 0 || position >= this.items.length
        if (incorrectPosition)
            throw new SarasvatiError('Invalid position')
    }
}
