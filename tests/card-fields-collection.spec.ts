import { SarasvatiError } from '@src/core/exceptions';
import { CardFieldsCollection } from '@src/flashcards/models'

describe('CardFieldsCollection', () => {
    test('Unable to change position of field in empty collection', () => {
        const collection = new CardFieldsCollection()
        expect(() => {
            collection.changePosition('field', 0)
        }).toThrow(SarasvatiError)
    })

    test('Unable to change position to negative value', () => {
        const collection = new CardFieldsCollection()
        collection.add('field')

        expect(() => {
            collection.changePosition('field', -1)
        }).toThrow(SarasvatiError)
    })

    test('Unable to change position to greater then count of fields', () => {
        const collection = new CardFieldsCollection()
        collection.add('field 1')
        collection.add('field 2')

        expect(() => {
            collection.changePosition('field 1', 2)
        }).toThrow(SarasvatiError)
    })
})
