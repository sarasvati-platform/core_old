Feature: Flashcards/Card Types/Manage

    Scenario: User can have multiple card types
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Verse Number |
             | Text         |
         And User creates 'Geography' card type
         And User adds the following fields to the 'Geography' card type
             | Field   |
             | Country |
             | Capital |
         Then Card type 'Verse' has the following fields
             | Field        |
             | Verse Number |
             | Text         |
         And Card type 'Geography' has the following fields
             | Field   |
             | Country |
             | Capital |
         And User has the following card types
             | Card Type |
             | Verse     |
             | Geography |

    # -------------------------------------------------------------------------- #
    #                                 Add fields                                 #
    # -------------------------------------------------------------------------- #

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

    Scenario: User can not add field with the same name
        Given Empty deck
        When User creates 'Verse' card type
         And User adds 'Verse Number' field to the 'Verse' card type
         And User adds 'Verse Number' field to the 'Verse' card type
        Then User sees an error 'Field with same name already exists'
         And Card type 'Verse' has field 'Verse Number'

    # -------------------------------------------------------------------------- #
    #                              Delete fields                                 #
    # -------------------------------------------------------------------------- #

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

    # -------------------------------------------------------------------------- #
    #                              Rename fields                                 #
    # -------------------------------------------------------------------------- #

    Scenario: User can rename the field of card type
        Given Empty deck
        When User creates 'Verse' card type
         And User adds 'Verse Number' field to the 'Verse' card type
         And User renames 'Verse Number' field to 'Number' of the 'Verse' card type
        Then Card type 'Verse' has no field 'Verse Number'
         And Card type 'Verse' has field 'Number'

    Scenario: User can not rename the field to the existing one
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field        |
             | Verse Number |
             | Text         |
         And User renames 'Verse Number' field to 'Text' of the 'Verse' card type
        Then User sees an error 'Field with same name already exists'
         And Card type 'Verse' has the following fields
             | Field        |
             | Verse Number |
             | Text         |
