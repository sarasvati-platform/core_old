import { SarasvatiError } from '@src/core/exceptions'

export class CardField {
    /**
     * Initializes a new instance of the CardField class using the specified name
     * @param name Name of the field
     */
    constructor(
        public name: string
    ) {
    }
}

export class CardFieldsCollection {
    private items: CardField[] = []

    /**
     * Returns all the fields
     * @returns All fields
     */
    get all(): CardField[] {
        return this.items
    }

    /**
     * Gets field by name
     * @param name Name of the field
     * @returns Field
     */
    get(name: string): CardField {
        return this.items.find(field => field.name === name)
    }

    /**
     * Adds a new field
     * @param name Name of a field
     * @returns Field
     */
    add(name: string): CardField {
        this.checkIfFieldExists(name)

        const field = new CardField(name)
        this.items.push(field)
        return field
    }

    /**
     * Renames field
     * @param name Name of the field to rename
     * @param newName New name of the field
     */
    rename(name: string, newName: string) {
        this.checkIfFieldExists(newName)

        const field = this.get(name)
        if (!field) {
            throw new SarasvatiError('Field does not exist')
        }
        field.name = newName
    }

    /**
     * Deletes the field
     * @param name Name of a field
     * @returns Field
     */
    delete(name: string) {
        this.items = this.items.filter(field => field.name !== name)
    }

    /**
     * Gets position of the field
     * @param name Name of the field
     * @returns Position of the field
     */
    getPosition(name: string) {
        return this.items.findIndex(field => field.name === name)
    }

    /**
     * Changes position of the specified field
     * @param name Name of the field to change position of
     * @param position New positions
     */
    changePosition(name: string, position: number) {
        this.checkIfRightPosition(position)

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

    private checkIfRightPosition(position: number) {
        const rightPosition = position >= 0 && position <= this.items.length
        if (!rightPosition)
            throw new SarasvatiError(
                `Invalid field position: ${position} of ${this.items.length}`
            )
    }
}