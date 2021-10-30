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

    deleteCardType(id: EntityId): void {
        this.data.delete(id)
    }

    findCardTypeById(id: EntityId): CardType {
        return this.data.get(id)
    }
}

export const cardTypeSteps: StepDefinitions = ({ given, and, when, then }) => {
    var lastError: Error = undefined
    var cardTypesUseCase = undefined

    given(/Empty deck/, () => {
        lastError = undefined
        cardTypesUseCase = new ManageCardTypesUseCase(
            new DummyCardTypeRepository()
        )
    })

    when(/^User creates '(.*)' card type$/, (cardTypeName) => {
        // Act
        const cardType = cardTypesUseCase.createCardType(cardTypeName)

        // Assert
        expect(cardType.id).not.toBeNull()
        expect(cardType.name).toBe(cardTypeName)
        expect(cardType.fields).toStrictEqual([])
    })

    when(/^User deletes '([^\']*)' card type$/, (cardTypeName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)
        cardTypesUseCase.deleteCardType(cardType)
    })

    then(/^User has the following card types$/, (cardTypeNames) => {
        for (const cardTypeName of cardTypeNames) {
            const cardType = cardTypesUseCase.findCardTypeById(cardTypeName['Card Type'])
            expect(cardType).toBeDefined()
        }
    })

    when(/^User adds '(.*)' field to the '(.*)' card type$/, (fieldName, cardTypeName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        try {
            cardTypesUseCase.addField(cardType, fieldName)
        } catch (exception) {
            lastError = exception
        }
    })

    when(/^User adds the following fields to the '(.*)' card type$/, (cardTypeName, fields) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        try {
            for (const field of fields) {
                cardTypesUseCase.addField(cardType, field['Field'])
            }
        } catch (exception) {
            lastError = exception
        }
    })

    when(/^User deletes '(.*?)' field from '(.*?)' card type$/, (fieldName, cardTypeName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        cardTypesUseCase.deleteField(cardType, fieldName)

        // Assert
        expect(cardTypesUseCase.hasField(cardType, fieldName)).toBeFalsy()
    })

    when(/^User renames '(.*)' field to '(.*)' of the '(.*)' card type$/, (oldFieldName, newFieldName, cardTypeName) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Act
        try {
            cardTypesUseCase.renameField(cardType, oldFieldName, newFieldName)
        } catch (exception) {
            lastError = exception
        }
    })


    then(/^Card type '(.*)' has( no | )field '(.*)'$/, (cardTypeName, value, fieldName) => {
        const hasOrNot = value.trim()
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Assert
        const expectValue = expect(cardTypesUseCase.hasField(cardType, fieldName))
        if (hasOrNot === 'no') {
            expectValue.toBeFalsy()
        } else {
            expectValue.toBeTruthy()
        }
    })

    then(/^Card type '(.*)' has the following fields$/, (cardTypeName, fields) => {
        const cardType = cardTypesUseCase.findCardTypeById(cardTypeName)

        // Assert
        for (const field of fields) {
            expect(cardTypesUseCase.hasField(cardType, field['Field'])).toBeTruthy()
        }
    })

    then(/^User sees an error '(.*)'$/, (errorMessage) => {
        expect(lastError).toBeDefined()
        expect(lastError.message).toEqual(errorMessage)
    })
}