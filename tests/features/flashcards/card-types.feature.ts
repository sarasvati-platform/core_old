import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/decks/deck.steps'

import { cardTypeManageSteps } from '@tests/features/flashcards/steps/card-types/manage.steps'
import { cardTypeSectionsSteps } from '@tests/features/flashcards/steps/card-types/sections.steps'

import { cardsSteps } from '@tests/features/flashcards/steps/notes/notes.steps'
import { nodeTypesManageSteps } from '@tests/features/flashcards/steps/note-types/manage.steps'
import { nodeTypeFieldsSteps } from '@tests/features/flashcards/steps/note-types/fields.steps'

autoBindSteps([
    loadFeature('features/flashcards/cards/card-type-section.feature'),
    loadFeature('features/flashcards/cards/card-type.feature'),

    loadFeature('features/flashcards/notes/note.feature'),
    loadFeature('features/flashcards/notes/note-search.feature'),
], [
    /* Core steps */
    errorSteps,

    /* Deck steps */
    deckSteps,

    /* Card type steps */
    cardTypeManageSteps,
    cardTypeSectionsSteps,

    /* Misc steps */
    cardsSteps,
    nodeTypesManageSteps,
    nodeTypeFieldsSteps
])
