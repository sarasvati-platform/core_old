import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeSectionsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds the following sections to the '(.*)' face of the '(.*)' note type$/, wrapper((faceName, cardTypeName, sectionsTable) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .addSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User deletes (\d+) section from '(.*)' face of '(.*)' note type$/, wrapper((sectionIndex, faceName, cardTypeName) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .deleteSectionAt(sectionIndex-1)
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card face '(.*)' of the '(.*)' note type has the following sections$/, (faceName, cardTypeName, sectionsTable) => {
        const cardType = context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .cardType

        for (const [i, sectionRow] of sectionsTable.entries()) {
            const section = cardType.sections[i]
            expect(section.template).toStrictEqual(sectionRow['Section'])
        }
    })
}