import { CardType, CardSection, SectionTemplate } from '@src/flashcards/models'

/**
 * Manages specified [card type]{@link CardType}
 */
export class ManageCardTypeUseCase {
    constructor(
        public readonly cardType: CardType
    ) { }

    /**
     * Adds new section
     * @param template Template to create section from
     */
    addSectionFromTemplate(template: SectionTemplate) {
        this.cardType.sections.push(new CardSection(template))
    }

    /**
     * Add list of sections
     * @param templates List of temlates to create sections from
     */
    addSectionsFromTemplates(templates: SectionTemplate[]) {
        for (const template of templates) {
            this.addSectionFromTemplate(template)
        }
    }

    /**
     * Deletes section at specified position
     * @param index Index of section to delete
     */
    deleteSectionAt(index: number) {
        this.cardType.sections.splice(index, 1)
    }
}
