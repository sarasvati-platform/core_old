import { SarasvatiError } from '@src/core/exceptions'
import { Note, NoteField, NoteType } from '@src/flashcards/models'

describe('Note', () => {
    const sut: {
        noteType: NoteType,
        card: Note
    } = { noteType: undefined, card: undefined }

    beforeEach(() => {
        sut.noteType = new NoteType('id', 'note type')
        sut.card = new Note('id', sut.noteType)
    })

    test('question returns value of the first field', () => {
        sut.noteType.fields.add(new NoteField('question'))
        sut.noteType.fields.add(new NoteField('answer'))
        sut.card.setFieldValue('question', '2+2')
        sut.card.setFieldValue('answer', '4')
        expect(sut.card.question).toStrictEqual('2+2')
    })

    test('getFieldValue should raise exception if no field found in note type', () => {
        expect(() => sut.card.getFieldValue('not_exists')).toThrow(SarasvatiError)
        expect(() => sut.card.getFieldValue('not_exists')).toThrow('No field found')
    })

    test('getFieldValue should return undefined if there is no value and field found in note type', () => {
        sut.noteType.fields.add(new NoteField('question'))
        expect(sut.card.getFieldValue('question')).toStrictEqual(undefined)
    })

    test('getFieldValue should return value', () => {
        sut.noteType.fields.add(new NoteField('question'))
        sut.card.setFieldValue('question', '2+2')
        expect(sut.card.getFieldValue('question')).toStrictEqual('2+2')
    })

    test('setFieldValue should raise an exception if field is not found at note type', () => {
        expect(() => sut.card.setFieldValue('not_exists', '123')).toThrow(SarasvatiError)
        expect(() => sut.card.setFieldValue('not_exists', '123')).toThrow('No field found')
    })
})
