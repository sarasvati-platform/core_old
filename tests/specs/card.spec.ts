import { SarasvatiError } from '@src/core/exceptions'
import { Card, CardField, CardType } from '@src/flashcards/models'

describe('Card', () => {
    const sut: {
        cardType: CardType,
        card: Card
    } = { cardType: undefined, card: undefined }

    beforeEach(() => {
        sut.cardType = new CardType('id', 'card type')
        sut.card = new Card('id', sut.cardType)
    })

    test('question returns value of the first field', () => {
        sut.cardType.fields.add(new CardField('question'))
        sut.cardType.fields.add(new CardField('answer'))
        sut.card.setFieldValue('question', '2+2')
        sut.card.setFieldValue('answer', '4')
        expect(sut.card.question).toStrictEqual('2+2')
    })

    test('getFieldValue should raise exception if no field found in card type', () => {
        expect(() => sut.card.getFieldValue('not_exists')).toThrow(SarasvatiError)
        expect(() => sut.card.getFieldValue('not_exists')).toThrow('No field found')
    })

    test('getFieldValue should return undefined if there is no value and field found in card type', () => {
        sut.cardType.fields.add(new CardField('question'))
        expect(sut.card.getFieldValue('question')).toStrictEqual(undefined)
    })

    test('getFieldValue should return value', () => {
        sut.cardType.fields.add(new CardField('question'))
        sut.card.setFieldValue('question', '2+2')
        expect(sut.card.getFieldValue('question')).toStrictEqual('2+2')
    })

    test('setFieldValue should raise an exception if field is not found at card type', () => {
        expect(() => sut.card.setFieldValue('not_exists', '123')).toThrow(SarasvatiError)
        expect(() => sut.card.setFieldValue('not_exists', '123')).toThrow('No field found')
    })
})
