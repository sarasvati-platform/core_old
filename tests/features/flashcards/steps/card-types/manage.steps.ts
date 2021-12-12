import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeManageSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' card type to the '(.*)' note type$/, wrapper((cardTypeName, noteTypeName) => {
        context.cardTypesUseCase.manage(noteTypeName).addCardType(cardTypeName)
    }))

    when(/^User adds the following card types to the '(.*)' note type$/, wrapper((noteTypeNAme, cardTypesTable) => {
        for (const cardTypeRow of cardTypesTable) {
            context.cardTypesUseCase.manage(noteTypeNAme).addCardType(cardTypeRow['Card Type'])
        }
    }))

    when(/^User adds '(.*)' card type to the '(.*)' note type with the following sections$/, wrapper((cardTypeName, noteTypeName, sectionsTable) => {
        context.cardTypesUseCase
            .manage(noteTypeName)
            .addCardType(cardTypeName)
        context.cardTypesUseCase
            .manage(noteTypeName)
            .manageCardType(cardTypeName)
            .addSectionsFromTemplates(sectionsTable.map(x => x['Section']))
    }))

    when(/^User deletes '(.*?)' card type from '(.*?)' note type$/, wrapper((cardTypeName, noteTypeName) => {
        context.cardTypesUseCase.manage(noteTypeName).deleteCardType(cardTypeName)
    }))

    when(/^User renames '(.*)' card type to '(.*)' of the '(.*)' note type$/, wrapper((oldcardTypeName, newcardTypeName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).renameCardType(oldcardTypeName, newcardTypeName)
    }))

    when(/^User changes position of '(.*)' card type of '(.*)' note type to (-?\d+)$/, wrapper((cardTypeName, noteTypeName, position) => {
        context.cardTypesUseCase.manage(noteTypeName).moveCardType(cardTypeName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Note type '(.*)' has( no | )card type '(.*)'$/, (noteTypeName, value, cardTypeName) => {
        const hasOrNot = value.trim()
        const noteType = context.cardTypesUseCase.find(noteTypeName)

        const expectValue = expect(noteType.cardTypes.find(cardTypeName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Note type '(.*)' has the following card types$/, (noteTypeName, cardTypesTable) => {
        const noteType = context.cardTypesUseCase.find(noteTypeName)
        for (const cardTypeRow of cardTypesTable) {
            const face = noteType.cardTypes.find(cardTypeRow['Card Type'])
            expect(face).toBeDefined()

            const positionIndex = cardTypeRow['Order']
            if (positionIndex) {
                expect(noteType.cardTypes.indexOf(face)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}