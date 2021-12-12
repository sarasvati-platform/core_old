import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeSectionsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds the following sections to the '(.*)' card type of the '(.*)' note type$/, wrapper((cardTypeName, noteTypeName, sectionsTable) => {
        context.noteTypesUseCase
            .manage(noteTypeName)
            .manageCardType(cardTypeName)
            .createSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User deletes (\d+) section from '(.*)' card type of '(.*)' note type$/, wrapper((sectionIndex, cardTypeName, noteTypeName) => {
        context.noteTypesUseCase
            .manage(noteTypeName)
            .manageCardType(cardTypeName)
            .deleteSectionAt(sectionIndex-1)
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card type '(.*)' of the '(.*)' note type has the following sections$/, (cardTypeName, noteTypeName, sectionsTable) => {
        const cardType = context.noteTypesUseCase
            .manage(noteTypeName)
            .manageCardType(cardTypeName)
            .cardType

        for (const [i, sectionRow] of sectionsTable.entries()) {
            const section = cardType.sections[i]
            expect(section.template).toStrictEqual(sectionRow['Section'])
        }
    })
}