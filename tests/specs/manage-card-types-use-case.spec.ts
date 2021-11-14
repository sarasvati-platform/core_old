import { SarasvatiError } from '@src/core/exceptions'
import { ManageCardTypesUseCase } from '@src/flashcards/use-cases/manage-card-types'
import { DummyCardTypeRepository } from '@tests/ports/dummy-card-types-repository'

describe('ManageCardTypesUseCase', () => {
    var sut: ManageCardTypesUseCase = undefined

    beforeEach(() => {
        sut = new ManageCardTypesUseCase(new DummyCardTypeRepository())
    })

    test('provides ability to access to specified card type', () => {
        const createdCardType = sut.create('cardType')
        const manageCardType = sut.manage('cardType').cardType
        expect(manageCardType).toEqual(createdCardType)
    })

    test('throws error if no card type found', () => {
        const action = () => sut.manage('not_exist')
        expect(action).toThrow(SarasvatiError)
        expect(action).toThrow('No card type found')
    })
})