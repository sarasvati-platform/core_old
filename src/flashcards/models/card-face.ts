import { CardFaceSection, SectionTemplate } from '@src/flashcards/models'

export class CardFace {
    private sectionsCollection: CardFaceSection[] = []

    /**
     * Initializes a new instance of the CardFace class using the specified name
     * @param name Name of the face
     */
    constructor(
        public name: string
    ) {
    }

    /**
     * Returns first section that can be used as a question
     * @returns First section
     */
    get frontSection(): CardFaceSection {
        return this.sectionsCollection[0]
    }

    /**
     * Returns sections that can be used as an answer
     * @returns List of the sections except first one
     */
    get backSections(): CardFaceSection[] {
        return this.sectionsCollection.slice(1) || []
    }

    /**
     * Returns list of the sections
     * @returns List of the sections
     */
    get sections(): CardFaceSection[] {
        return this.sectionsCollection
    }
}
