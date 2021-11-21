import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeFaceSectionsSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' face to the '(.*)' card type with the following sections$/, wrapper((faceName, cardTypeName, sectionsTable) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .addFace(faceName)
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .addSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User adds the following sections to the '(.*)' face of the '(.*)' card type$/, wrapper((faceName, cardTypeName, sectionsTable) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .addSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User deletes (\d+) section from '(.*)' face of '(.*)' card type$/, wrapper((sectionIndex, faceName, cardTypeName) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .deleteSectionAt(sectionIndex-1)
    }))

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card face '(.*)' of the '(.*)' card type has the following sections$/, (faceName, cardTypeName, sectionsTable) => {
        const cardFace = context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .cardFace

        for (const [i, sectionRow] of sectionsTable.entries()) {
            const section = cardFace.sections[i]
            expect(section.template).toStrictEqual(sectionRow['Section'])
        }
    })
}