import { SarasvatiError } from '@src/core/exceptions'
import { CardField } from '@src/flashcards/models'
import { NamedCollection } from '@src/flashcards/models/named-collection'

describe('CardFieldsCollection', () => {
    var sut: NamedCollection<CardField> = undefined

    beforeEach(() => {
        sut = new NamedCollection<CardField>()
    })

    test('all returns empty collection', () => {
        expect(sut.all.length).toEqual(0)
        expect(sut.all).toEqual([])
    })

    test('all returns added items', () => {
        const item = new CardField('name')
        sut.add(item)
        expect(sut.all).toEqual([item])
    })

    test('get throws error if nothing found', () => {
        const action = () => sut.get('nothing')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('Not found: nothing')
    })

    test('get returns item by name', () => {
        const item = new CardField('name')
        sut.add(item)
        expect(sut.get('name')).toEqual(item)
    })

    test('find returns undefined if nothing found', () => {
        expect(sut.get('nothing')).toEqual(undefined)
    })

    test('find returns item by name', () => {
        const item = new CardField('name')
        sut.add(item)
        expect(sut.find('name')).toEqual(item)
    })

    test('rename throws an error if field does not belong to the collection', () => {
        const action = () => sut.rename(new CardField('name'), 'new name')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('Item does not belong to the collection')
    })

    test('moveTo throws exception on empty collection', () => {
        expect(() => sut.moveTo(new CardField('empty'), 0)).toThrow(SarasvatiError)
    })

    test('moveTo throws exceptiion if position is negative', () => {
        const cardField = new CardField('field')
        sut.add(cardField)

        expect(() => sut.moveTo(cardField, -1)).toThrow(SarasvatiError)
    })

    test('moveTo throws exception if position is greater than the count of fields', () => {
        const cardField1 = new CardField('field1')
        const cardField2 = new CardField('field2')
        sut.add(cardField1)
        sut.add(cardField2)

        expect(() => sut.moveTo(cardField1, 2)).toThrow(SarasvatiError)
    })
})
