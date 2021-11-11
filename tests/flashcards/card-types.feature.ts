import { loadFeature, autoBindSteps } from 'jest-cucumber';
import { cardTypeSteps } from './steps/card-types.steps'

autoBindSteps([
    loadFeature('features/flashcards/card-types.feature'),
    loadFeature('features/flashcards/card-type-fields.feature'),
], [cardTypeSteps])
