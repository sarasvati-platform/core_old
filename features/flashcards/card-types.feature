Feature: Flashcards/Card Types/Manage

    Scenario: User can create a new card type with fields
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Verse Number |
             | Text         |
             | Translation  |
         Then Card type 'Verse' has the following fields
             | Field        |
             | Verse Number |
             | Text         |
             | Translation  |

    Scenario: User can add fields later
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Verse Number |
             | Text         |
             | Translation  |
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Audio        |
         Then Card type 'Verse' has the following fields
             | Field        |
             | Verse Number |
             | Text         |
             | Translation  |
             | Audio        |

    Scenario: User can delete fields from card type
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Verse Number |
             | Text         |
             | Translation  |
         And User deletes 'Translation' field from 'Verse' card type
        Then Card type 'Verse' has the following fields
             | Field        |
             | Verse Number |
             | Text         |
         And Card type 'Verse' has no field 'Translation'
