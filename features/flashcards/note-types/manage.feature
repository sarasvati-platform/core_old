Feature: Flashcards/Note Types/Manage

    Background:
        Given Empty deck

    Rule: User can have his own note types

        The user can have their own note types. He can add, delete and rename
        them.

        Scenario: User can have multiple note types
             When User creates 'Verse' note type
              And User creates 'Geography' note type
              And User has the following note types
                  | Note Type |
                  | Verse     |
                  | Geography |

        Scenario: User can delete note type
             When User creates 'Verse' note type
              And User creates 'Geography' note type
              And User deletes 'Verse' note type
             Then User has the following note types
                  | Note Type |
                  | Geography |
              And User has no the following note types
                  | Note Type |
                  | Verse     |
