import { loadFeature, autoBindSteps } from 'jest-cucumber';
import { cardTypeSteps } from './steps/card-types.steps'

const feature = loadFeature('features/flashcards/card-types.feature');
autoBindSteps([feature], [cardTypeSteps])
