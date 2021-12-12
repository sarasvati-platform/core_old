import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeManageSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' card type to the '(.*)' note type$/, wrapper((faceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).addFace(faceName)
    }))

    when(/^User adds the following card types to the '(.*)' note type$/, wrapper((cardTypeName, fieldsTable) => {
        for (const fieldRow of fieldsTable) {
            context.cardTypesUseCase.manage(cardTypeName).addFace(fieldRow['Card Type'])
        }
    }))

    when(/^User adds '(.*)' card type to the '(.*)' note type with the following sections$/, wrapper((faceName, cardTypeName, sectionsTable) => {
        context.cardTypesUseCase
            .manage(cardTypeName)
            .addFace(faceName)
        context.cardTypesUseCase
            .manage(cardTypeName)
            .manageFace(faceName)
            .addSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User deletes '(.*?)' card type from '(.*?)' note type$/, wrapper((faceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).deleteFace(faceName)
    }))

    when(/^User renames '(.*)' card type to '(.*)' of the '(.*)' note type$/, wrapper((oldfaceName, newfaceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).renameFace(oldfaceName, newfaceName)
    }))

    when(/^User changes position of '(.*)' card type of '(.*)' note type to (-?\d+)$/, wrapper((faceName, cardTypeName, position) => {
        context.cardTypesUseCase.manage(cardTypeName).moveFace(faceName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Note type '(.*)' has( no | )card type '(.*)'$/, (cardTypeName, value, faceName) => {
        const hasOrNot = value.trim()
        const noteType = context.cardTypesUseCase.find(cardTypeName)

        const expectValue = expect(noteType.cardTypes.find(faceName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Note type '(.*)' has the following card types$/, (cardTypeName, facesTable) => {
        const noteType = context.cardTypesUseCase.find(cardTypeName)
        for (const faceRow of facesTable) {
            const face = noteType.cardTypes.find(faceRow['Card Type'])
            expect(face).toBeDefined()

            const positionIndex = faceRow['Order']
            if (positionIndex) {
                expect(noteType.cardTypes.indexOf(face)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}