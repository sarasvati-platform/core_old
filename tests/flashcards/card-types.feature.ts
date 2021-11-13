import { loadFeature, autoBindSteps } from 'jest-cucumber';
import { errorSteps } from '../core/steps/errors.steps'
import { deckSteps } from './steps/deck.steps'
import { cardTypeSteps } from './steps/card-types.steps'
import { cardTypeFieldsSteps } from './steps/card-types-fields.steps'

autoBindSteps([
    loadFeature('features/flashcards/card-types.feature'),
    loadFeature('features/flashcards/card-type-fields.feature'),
], [errorSteps, deckSteps, cardTypeSteps, cardTypeFieldsSteps])
