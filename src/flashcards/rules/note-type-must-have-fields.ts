import { SarasvatiError } from '@src/core/exceptions'
import { NoteType } from '@src/flashcards/models'

/**
 * Checks if the type of creating card has at least one field
 */
export class NoteTypeMustHaveFieldsRule {
    check(noteType: NoteType) {
        if (noteType.fields.all.length <= 0) {
            throw new SarasvatiError('Cannot create card. Its type has no fields')
        }
    }
}