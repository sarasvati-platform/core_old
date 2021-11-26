import { SarasvatiError } from '@src/core/exceptions'
import { NoteField } from '@src/flashcards/models'
import { NamedCollection } from '@src/flashcards/models/named-collection'

describe('NamedCollection', () => {
    let sut: NamedCollection<NoteField> = undefined
    const errors = {
        alreadyExists: 'Item with same name already exists',
        doesntBelong: 'Item does not belong to the collection',
    }

    beforeEach(() => {
        sut = new NamedCollection<NoteField>()
    })

    test('all returns empty collection', () => {
        expect(sut.all.length).toEqual(0)
        expect(sut.all).toEqual([])
    })

    test('all returns added items', () => {
        const item = new NoteField('name')
        sut.add(item)
        expect(sut.all).toEqual([item])
    })

    test('get throws error if nothing found', () => {
        const action = () => sut.get('nothing')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('Not found: nothing')
    })

    test('get returns item by name', () => {
        const item = new NoteField('name')
        sut.add(item)
        expect(sut.get('name')).toEqual(item)
    })

    test('find returns undefined if nothing found', () => {
        expect(sut.find('nothing')).toEqual(undefined)
    })

    test('find returns item by name', () => {
        const item = new NoteField('name')
        sut.add(item)
        expect(sut.find('name')).toEqual(item)
    })

    test('add throws an exception if name is not unique', () => {
        sut.add(new NoteField('name'))
        const action = () => sut.add(new NoteField('name'))
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow(errors.alreadyExists)
    })

    test('rename throws an error if field does not belong to the collection', () => {
        const action = () => sut.rename(new NoteField('name'), 'new name')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow(errors.doesntBelong)
    })

    test('delete throws an exception if item does not belong to the collection', () =>{
        const action = () => sut.delete(new NoteField('name'))
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow(errors.doesntBelong)
    })

    test('indexOf returns index of an item', () => {
        const item1 = new NoteField('1')
        const item2 = new NoteField('2')
        sut.add(item1)
        sut.add(item2)
        expect(sut.indexOf(item1)).toEqual(0)
        expect(sut.indexOf(item2)).toEqual(1)
    })

    test('indexOf throws an exception if item does not belong to collection', () => {
        const action = () => sut.moveTo(new NoteField('new'), 1)
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow(errors.doesntBelong)
    })

    test('moveTo throws exception on empty collection', () => {
        expect(() => sut.moveTo(new NoteField('empty'), 0)).toThrow(SarasvatiError)
    })

    test('moveTo throws exceptiion if position is negative', () => {
        const noteField = new NoteField('field')
        sut.add(noteField)

        expect(() => sut.moveTo(noteField, -1)).toThrow(SarasvatiError)
    })

    test('moveTo throws exception if position is greater than the count of fields', () => {
        const noteField1 = new NoteField('field1')
        const noteField2 = new NoteField('field2')
        sut.add(noteField1)
        sut.add(noteField2)

        expect(() => sut.moveTo(noteField1, 2)).toThrow(SarasvatiError)
    })

    test('moveTo throws exception if item does not belong to collection', () => {
        sut.add(new NoteField('1'))
        sut.add(new NoteField('2'))
        const action = () => sut.moveTo(new NoteField('new'), 1)
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow(errors.doesntBelong)
    })
})
