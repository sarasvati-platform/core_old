import { SarasvatiError } from "@src/core/exceptions"

export type EntityName = string

export interface IHasName {
    get name(): EntityName
    set name(value: string)
}

export abstract class NamedCollection<T extends IHasName> {
    protected items: T[] = []

    get all(): T[] {
        return this.items
    }

    get(name: EntityName): T {
        const normalizedName = this._normalizeName(name)
        return this.items.find(
            item => this._normalizeName(item.name) === normalizedName
        )
    }

    create(name: EntityName): T {
        this.checkIfFieldExists(name)

        const item = this._new(name)
        this.add(item)
        return item
    }

    add(item: T) {
        this.checkIfFieldExists(item.name)

        this.items.push(item)
    }

    delete(name: EntityName) {
        this.items = this.items.filter(i => i.name !== name)
    }

    rename(oldName: EntityName, newName: EntityName) {
        this.checkIfFieldExists(newName)

        const entity = this.get(oldName)
        if (!entity) {
            throw new SarasvatiError('Field does not exist')
        }
        entity.name = newName
    }

    getPosition(name: string) {
        return this.items.findIndex(field => field.name === name)
    }

    changePosition(name: string, position: number) {
        this.checkIfIncorrectPosition(position)

        const currentIndex = this.items.findIndex(field => field.name === name)
        const oldItem = this.items[position]
        const newItem = this.items[currentIndex]
        this.items[position] = newItem
        this.items[currentIndex] = oldItem
    }

    private checkIfFieldExists(fieldName: string) {
        const field = this.get(fieldName)
        if (field)
            throw new SarasvatiError('Field with same name already exists')
    }

    private checkIfIncorrectPosition(position: number) {
        const incorrectPosition = position < 0 || position >= this.items.length
        if (incorrectPosition)
            throw new SarasvatiError('Invalid field position')
    }

    protected abstract _new(name: EntityName): T

    protected _normalizeName(name: string): string {
        return name.toLocaleLowerCase()
    }
}
