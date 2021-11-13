import { SarasvatiError } from '@src/core/exceptions'
import { CardFieldsCollection } from '@src/flashcards/models/card-field'

describe('CardFieldsCollection', () => {
    var collection: CardFieldsCollection = undefined

    beforeEach(() => {
        collection = new CardFieldsCollection()
    })

    test('all returns empty collection', () => {
        expect(collection.all.length).toEqual(0)
        expect(collection.all).toEqual([])
    })

    test('all returns added fields', () => {
        collection.create('field1')
        collection.create('field2')

        expect(collection.all.length).toEqual(2)
        expect(collection.all[0].name).toEqual('field1')
        expect(collection.all[1].name).toEqual('field2')
    })

    test('unable to change position in empty collection', () => {
        expect(() => collection.changePosition('field', 0)).toThrow(SarasvatiError)
    })

    test('unable to change possition of field to negative value', () => {
        collection.create('field')

        expect(() => collection.changePosition('field', -1)).toThrow(SarasvatiError)
    })

    test('unable to change position to greater than the count of fields', () => {
        collection.create('field 1')
        collection.create('field 2')

        expect(() => collection.changePosition('field 1', 2)).toThrow(SarasvatiError)
    })
})
