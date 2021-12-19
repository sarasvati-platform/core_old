import { loadFeature, autoBindSteps } from 'jest-cucumber'

import { errorSteps } from '@tests/features/core/steps/errors.steps'
import { deckSteps } from '@tests/features/flashcards/steps/decks/deck.steps'

import { cardTypeManageSteps } from '@tests/features/flashcards/steps/card-types/manage.steps'
import { cardTypeSectionsSteps } from '@tests/features/flashcards/steps/card-types/sections.steps'

import { notesSteps } from '@tests/features/flashcards/steps/notes/notes.steps'
import { cardManageSteps } from '@tests/features/flashcards/steps/cards/manage.steps'
import { nodeTypesManageSteps } from '@tests/features/flashcards/steps/note-types/manage.steps'
import { nodeTypeFieldsSteps } from '@tests/features/flashcards/steps/note-types/fields.steps'

autoBindSteps([
    loadFeature('features/flashcards/cards/cards.feature'),
], [
    /* Core steps */
    errorSteps,

    /* Deck steps */
    deckSteps,

    /* Card type steps */
    cardManageSteps,
    cardTypeManageSteps,
    cardTypeSectionsSteps,

    /* Misc steps */
    notesSteps,
    nodeTypesManageSteps,
    nodeTypeFieldsSteps
])
