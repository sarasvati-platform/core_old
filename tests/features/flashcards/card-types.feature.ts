import { loadFeature, autoBindSteps } from 'jest-cucumber'
import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/deck.steps'
import { cardTypeSteps } from '@tests/features/flashcards/steps/note-types.steps'
import { cardTypeFieldsSteps } from '@tests/features/flashcards/steps/card-types-fields.steps'
import { cardTypeFacesSteps } from '@tests/features/flashcards/steps/card-types-faces.steps'
import { cardTypeFaceSectionsSteps } from '@tests/features/flashcards/steps/card-types-face-sections.steps'
import { cardsSteps } from '@tests/features/flashcards/steps/cards.steps'

autoBindSteps([
    loadFeature('features/flashcards/cards/card-type-section.feature'),
    loadFeature('features/flashcards/cards/card-type.feature'),

    loadFeature('features/flashcards/notes/note-type-field.feature'),
    loadFeature('features/flashcards/notes/note-type.feature'),

    loadFeature('features/flashcards/notes/note.feature'),
    loadFeature('features/flashcards/notes/note-search.feature'),
], [errorSteps, deckSteps, cardTypeSteps, cardTypeFieldsSteps, cardTypeFacesSteps, cardTypeFaceSectionsSteps, cardsSteps])
