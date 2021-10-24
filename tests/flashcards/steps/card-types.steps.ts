import { StepDefinitions } from 'jest-cucumber'
import { ICardTypeRepository } from '../../../src/flashcards/ports'
import { CardType } from '../../../src/flashcards/models'
import { EntityId } from '@src/core/models/entity'
import ManageCardTypesUseCase from '../../../src/flashcards/use-cases/manage-card-types'


class DummyCardTypeRepository implements ICardTypeRepository {
    private data: Map<EntityId, CardType> = new Map()

    createCardType(name: string): CardType {
        const cardType = new CardType(name, name)
        this.data.set(cardType.id, cardType)
        return cardType
    }

    findCardTypeById(id: EntityId): CardType {
        return this.data.get(id)
    }
}

export const cardTypeSteps: StepDefinitions = ({ given, and, when, then }) => {
    const cardTypesUseCase = new ManageCardTypesUseCase(
        new DummyCardTypeRepository()
    )

    given(/Empty deck/, () => {
    })

    when(/^User creates '(.*)' card type$/, (cardTypeName) => {
        // Act
        const cardType = cardTypesUseCase.createCardType(cardTypeName)

        // Assert
        expect(cardType.id).not.toBeNull()
        expect(cardType.name).toBe(cardTypeName)
        expect(cardType.fields).toStrictEqual([])
    })

    when(/^User adds the following fields to the '(.*)' card type$/, (cardTypeName, fields) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        for (const field of fields) {
            cardTypesUseCase.addField(cardType, field['Field'])
        }

        // Assert
        expect(cardType.fields.length).toBeGreaterThan(0)
        for (const field of fields) {
            cardTypesUseCase.hasField(cardType, field)
        }
    })

    when(/^User deletes '(.*)' field from '(.*)' card type$/, (fieldName, cardTypeName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        cardTypesUseCase.deleteField(cardType, fieldName)

        // Assert
        console.log(fieldName, cardType.fields)
        expect(cardTypesUseCase.hasField(cardType, fieldName)).toBeFalsy()
    })

    // TODO: Merge this method and one below
    then(/^Card type '(.*)' has field '(.*)'$/, (cardTypeName, fieldName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Assert
        expect(cardTypesUseCase.hasField(cardType, fieldName)).toBeTruthy()
    })

    then(/^Card type '(.*)' has no field '(.*)'$/, (cardTypeName, fieldName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Assert
        expect(cardTypesUseCase.hasField(cardType, fieldName)).toBeFalsy()
    })

    then(/^Card type '(.*)' has the following fields$/, (cardTypeName, fields) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Assert
        for (const field of fields) {
            expect(cardTypesUseCase.hasField(cardType, field['Field'])).toBeTruthy()
        }
    })
}