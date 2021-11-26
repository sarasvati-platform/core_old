import { loadFeature, autoBindSteps } from 'jest-cucumber'
import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/deck.steps'
import { cardTypeSteps } from '@tests/features/flashcards/steps/note-types.steps'
import { cardTypeFieldsSteps } from '@tests/features/flashcards/steps/card-types-fields.steps'
import { cardTypeFacesSteps } from '@tests/features/flashcards/steps/card-types-faces.steps'
import { cardTypeFaceSectionsSteps } from '@tests/features/flashcards/steps/card-types-face-sections.steps'
import { cardsSteps } from '@tests/features/flashcards/steps/cards.steps'

autoBindSteps([
    loadFeature('features/flashcards/notes/note-type.feature'),
    loadFeature('features/flashcards/notes/note-type-fields.feature'),
    loadFeature('features/flashcards/card-type-faces.feature'),
    loadFeature('features/flashcards/card-type-face-sections.feature'),
    loadFeature('features/flashcards/cards.feature'),
    loadFeature('features/flashcards/cards-search.feature'),
], [errorSteps, deckSteps, cardTypeSteps, cardTypeFieldsSteps, cardTypeFacesSteps, cardTypeFaceSectionsSteps, cardsSteps])
