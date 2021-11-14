import { SarasvatiError } from '@src/core/exceptions'
import { CardField } from '@src/flashcards/models'
import { NamedCollection } from '@src/flashcards/models/named-collection'

describe('CardFieldsCollection', () => {
    var collection: NamedCollection<CardField> = undefined

    beforeEach(() => {
        collection = new NamedCollection<CardField>()
    })

    test('unable to rename field that does not exist', () => {
        const action = () => collection.rename(new CardField('name'), 'new name')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('Item does not belong to the collection')
    })

    test('all returns empty collection', () => {
        expect(collection.all.length).toEqual(0)
        expect(collection.all).toEqual([])
    })

    test('all returns added fields', () => {
        collection.add(new CardField('field1'))
        collection.add(new CardField('field2'))

        expect(collection.all.length).toEqual(2)
        expect(collection.all[0].name).toEqual('field1')
        expect(collection.all[1].name).toEqual('field2')
    })

    test('unable to change position in empty collection', () => {
        expect(() => collection.moveTo(new CardField('empty'), 0)).toThrow(SarasvatiError)
    })

    test('unable to change possition of field to negative value', () => {
        const cardField = new CardField('field')
        collection.add(cardField)

        expect(() => collection.moveTo(cardField, -1)).toThrow(SarasvatiError)
    })

    test('unable to change position to greater than the count of fields', () => {
        const cardField1 = new CardField('field1')
        const cardField2 = new CardField('field2')
        collection.add(cardField1)
        collection.add(cardField2)

        expect(() => collection.moveTo(cardField1, 2)).toThrow(SarasvatiError)
    })
})
