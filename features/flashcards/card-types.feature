Feature: Flashcards/Card Types/Manage

    Background:
        Given Empty deck

    Rule: User can have his own card types

        The user can have their own card types. He can add, delete and rename
        them.

        Scenario: User can have multiple card types
             When User creates 'Verse' card type
              And User creates 'Geography' card type
              And User has the following card types
                  | Card Type |
                  | Verse     |
                  | Geography |

        Scenario: User can delete card type
             When User creates 'Verse' card type
              And User creates 'Geography' card type
              And User deletes 'Verse' card type
             Then User has the following card types
                  | Card Type |
                  | Geography |
              And User has no the following card types
                  | Card Type |
                  | Verse     |






