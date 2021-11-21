import { StepDefinitions } from 'jest-cucumber'
import { context, wrapper } from '@tests/features/context'


export const cardTypeFacesSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    When                                    */
    /* -------------------------------------------------------------------------- */

    when(/^User adds '(.*)' face to the '(.*)' card type$/, wrapper((faceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).addFace(faceName)
    }))

    when(/^User adds the following faces to the '(.*)' card type$/, wrapper((cardTypeName, fieldsTable) => {
        for (const fieldRow of fieldsTable) {
            context.cardTypesUseCase.manage(cardTypeName).addFace(fieldRow['Face'])
        }
    }))

    when(/^User deletes '(.*?)' face from '(.*?)' card type$/, wrapper((faceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).deleteFace(faceName)
    }))

    when(/^User renames '(.*)' face to '(.*)' of the '(.*)' card type$/, wrapper((oldfaceName, newfaceName, cardTypeName) => {
        context.cardTypesUseCase.manage(cardTypeName).renameFace(oldfaceName, newfaceName)
    }))

    when(/^User changes position of '(.*)' face of '(.*)' card type to (-?\d+)$/, wrapper((faceName, cardTypeName, position) => {
        context.cardTypesUseCase.manage(cardTypeName).moveFace(faceName, +position-1)
    }))


    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Card type '(.*)' has( no | )face '(.*)'$/, (cardTypeName, value, faceName) => {
        const hasOrNot = value.trim()
        const cardType = context.cardTypesUseCase.find(cardTypeName)

        const expectValue = expect(cardType.faces.find(faceName))
        if (hasOrNot === 'no') {
            expectValue.toBeUndefined()
        } else {
            expectValue.toBeDefined()
        }
    })

    then(/^Card type '(.*)' has the following faces$/, (cardTypeName, facesTable) => {
        const cardType = context.cardTypesUseCase.find(cardTypeName)
        for (const faceRow of facesTable) {
            const face = cardType.faces.find(faceRow['Face'])
            expect(face).toBeDefined()

            const positionIndex = faceRow['Order']
            if (positionIndex) {
                expect(cardType.faces.indexOf(face)).toStrictEqual(+positionIndex-1)
            }
        }
    })
}