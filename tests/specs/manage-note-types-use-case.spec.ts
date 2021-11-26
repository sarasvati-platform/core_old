import { SarasvatiError } from '@src/core/exceptions'
import { ManageNoteTypesUseCase } from '@src/flashcards/use-cases/manage-note-types'
import { DummyNoteTypeRepository } from '@tests/ports/dummy-card-types-repository'

describe('ManageNoteTypesUseCase', () => {
    let sut: ManageNoteTypesUseCase = undefined

    beforeEach(() => {
        sut = new ManageNoteTypesUseCase(new DummyNoteTypeRepository())
    })

    test('create return new note type with specified name', () => {
        const cardTypeName = 'newNoteType'
        const noteType = sut.create(cardTypeName)
        expect(noteType.name).toEqual(cardTypeName)
    })

    test('manage provides ability to access to specified entity', () => {
        const cardTypeName = 'cardTypeName'
        const createdNoteType = sut.create(cardTypeName)
        const manageNoteType = sut.manage(cardTypeName).noteType
        expect(manageNoteType).toEqual(createdNoteType)
    })

    test('delete removes specified note type', () => {
        const noteType = sut.create('note type')
        sut.delete(noteType)
        const find = sut.find(noteType.id)
        expect(find).toBeUndefined()
    })

    test('find returns undefined if nothing found', () => {
        const find = sut.find('nothing')
        expect(find).toBeUndefined()
    })

    test('manage throws error if no note type found', () => {
        const action = () => sut.manage('not_exist')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('No note type found')
    })
})