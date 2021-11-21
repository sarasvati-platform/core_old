import { loadFeature, autoBindSteps } from 'jest-cucumber'
import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/deck.steps'
import { cardTypeSteps } from '@tests/features/flashcards/steps/card-types.steps'
import { cardTypeFieldsSteps } from '@tests/features/flashcards/steps/card-types-fields.steps'
import { cardTypeFacesSteps } from '@tests/features/flashcards/steps/card-types-faces.steps'
import { cardTypeFaceSectionsSteps } from '@tests/features/flashcards/steps/card-types-face-sections.steps'

autoBindSteps([
    loadFeature('features/flashcards/card-types.feature'),
    loadFeature('features/flashcards/card-type-fields.feature'),
    loadFeature('features/flashcards/card-type-faces.feature'),
    loadFeature('features/flashcards/card-type-face-sections.feature'),
], [errorSteps, deckSteps, cardTypeSteps, cardTypeFieldsSteps, cardTypeFacesSteps, cardTypeFaceSectionsSteps])
