import { StepDefinitions } from 'jest-cucumber'
import { context } from '@tests/features/context'

export const cardManageSteps: StepDefinitions = ({ when, then }) => {

    /* -------------------------------------------------------------------------- */
    /*                                    Then                                    */
    /* -------------------------------------------------------------------------- */

    then(/^Note '(.*)' has (\d+) cards$/, (noteQuestion, cardsCount) => {
        const note = context.notesUseCase.findNoteByQuestion(noteQuestion)[0]
        if (!note) { throw new Error(`No ${noteQuestion} note found`) }

        const cards = context.cardsUseCase.getCardsOfNote(note)
        expect(cards.length).toEqual(+cardsCount)
    })

    then(/^Note '(.*)' has the following cards$/, (noteQuestion, cardsTable) => {
        const note = context.notesUseCase.findNoteByQuestion(noteQuestion)[0]
        if (!note) { throw new Error(`No ${noteQuestion} note found`) }

        const cards = context.cardsUseCase.getCardsOfNote(note)

        for (const cardRow of cardsTable) {
            const filteredCards = cards.filter(c => c.type.name === cardRow['Card Type'])
            expect(filteredCards.length).toEqual(1)

            const renderedCard = context.cardsReviewUseCase.renderCard(filteredCards[0])

            for (let i=0; i<=5; i++) {
                const sectionName = `Section ${i+1}`
                if (sectionName in cardRow) {
                    expect(renderedCard.sections[i]).toEqual(cardRow[sectionName])
                }
            }
        }
    })
}