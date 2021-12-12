import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/decks/deck.steps'
import { nodeTypesManageSteps } from '@tests/features/flashcards/steps/note-types/manage.steps'
import { nodeTypeFieldsSteps } from '@tests/features/flashcards/steps/note-types/fields.steps'

autoBindSteps([
    loadFeature('features/flashcards/note-types/fields.feature'),
    loadFeature('features/flashcards/note-types/manage.feature'),
], [
    /* Core steps */
    errorSteps,

    /* Deck steps */
    deckSteps,

    /* Node type steps */
    nodeTypesManageSteps,
    nodeTypeFieldsSteps
])
