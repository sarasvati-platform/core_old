import { SarasvatiError } from '@src/core/exceptions'
import { ManageCardTypesUseCase } from '@src/flashcards/use-cases/manage-card-types'
import { DummyCardTypeRepository } from '@tests/ports/dummy-card-types-repository'

describe('ManageCardTypesUseCase', () => {
    let sut: ManageCardTypesUseCase = undefined

    beforeEach(() => {
        sut = new ManageCardTypesUseCase(new DummyCardTypeRepository())
    })

    test('create return new card type with specified name', () => {
        const cardTypeName = 'newCardType'
        const cardType = sut.create(cardTypeName)
        expect(cardType.name).toEqual(cardTypeName)
    })

    test('manage provides ability to access to specified entity', () => {
        const cardTypeName = 'cardTypeName'
        const createdCardType = sut.create(cardTypeName)
        const manageCardType = sut.manage(cardTypeName).cardType
        expect(manageCardType).toEqual(createdCardType)
    })

    test('delete removes specified card type', () => {
        const cardType = sut.create('card type')
        sut.delete(cardType)
        const find = sut.find(cardType.id)
        expect(find).toBeUndefined()
    })

    test('find returns undefined if nothing found', () => {
        const find = sut.find('nothing')
        expect(find).toBeUndefined()
    })

    test('manage throws error if no card type found', () => {
        const action = () => sut.manage('not_exist')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('No card type found')
    })
})