import { CardFace, CardFaceSection, SectionTemplate } from '@src/flashcards/models';

/**
 * Manages specified [card face]{@link CardFace}
 */
export class ManageCardFaceUseCase {
    constructor(
        public readonly cardFace: CardFace
    ) { }

    /**
     * Adds new section
     * @param template Template to create section from
     */
    addSectionFromTemplate(template: SectionTemplate) {
        this.cardFace.sections.push(new CardFaceSection(template));
    }

    /**
     * Add list of sections
     * @param templates List of temlates to create sections from
     */
    addSectionsFromTemplates(templates: SectionTemplate[]) {
        for (const template of templates) {
            this.addSectionFromTemplate(template);
        }
    }

    /**
     * Deletes section at specified position
     * @param index Index of section to delete
     */
    deleteSectionAt(index: number) {
        this.cardFace.sections.splice(index, 1);
    }
}
