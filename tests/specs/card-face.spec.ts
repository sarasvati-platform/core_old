import { CardFace, CardFaceSection } from '@src/flashcards/models'

describe('CardFace', () => {
    let sut: CardFace = undefined

    beforeEach(() => {
        sut = new CardFace('card face')
    })

    test('name returns name of the card', () => {
        expect(sut.name).toStrictEqual('card face')
    })

    test('sections returns empty array', () => {
        expect(sut.sections).toStrictEqual([])
    })

    test('sections returns array of section', () => {
        const section = new CardFaceSection('template')
        sut.sections.push(section)

        expect(sut.sections).toStrictEqual([section])
    })

    test('fronSection returns undefined array if there is no sections', () => {
        expect(sut.frontSection).toStrictEqual(undefined)
    })

    test('fronSection returns only first section', () => {
        const sections = [
            new CardFaceSection('front'),
            new CardFaceSection('back')
        ]
        sut.sections.push(sections[0])
        sut.sections.push(sections[1])

        expect(sut.frontSection).toStrictEqual(sections[0])
    })

    test('backSections returns sections except the first one', () => {
        const sections = [
            new CardFaceSection('front'),
            new CardFaceSection('back'),
            new CardFaceSection('additional')
        ]
        sut.sections.push(sections[0])
        sut.sections.push(sections[1])
        sut.sections.push(sections[2])

        expect(sut.backSections).toStrictEqual([sections[1], sections[2]])
    })

    test('backSections returns empty array if there is only one section', () => {
        sut.sections.push(new CardFaceSection('front'))
        expect(sut.backSections).toStrictEqual([])
    })

    test('backSections returns empty array if there is no sections', () => {
        expect(sut.backSections).toStrictEqual([])
    })
})
