Feature: Flashcards/Card Types/Fields

    Background:
        Given Empty deck
        When User creates 'Verse' card type


    Rule: User can add fields

        User can add any fields he would like to the card type. Each field has
        its own unique name.

        Scenario: User can add fields to the card type
            When User adds the following fields to the 'Verse' card type
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |
            Then Card type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |

        Scenario: User can not add field with the same name
            When User adds 'Verse Number' field to the 'Verse' card type
             And User adds 'Verse Number' field to the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
             And Card type 'Verse' has field 'Verse Number'


    Rule: User can manage fields once added

        User can add new fields, delete or rename old ones and change their
        positions.

        Background:
            When User adds the following fields to the 'Verse' card type
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |

        Scenario: User can add fields later
            When User adds the following fields to the 'Verse' card type
                | Field        |
                | Audio        |
            Then Card type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |
                | Audio        |

        Scenario: User can delete fields from card type
            When User deletes 'Translation' field from 'Verse' card type
            Then Card type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
            And Card type 'Verse' has no field 'Translation'

        Scenario: User can rename the field of card type
            When User renames 'Verse Number' field to 'Number' of the 'Verse' card type
            Then Card type 'Verse' has no field 'Verse Number'
             And Card type 'Verse' has field 'Number'

        Scenario: User can't rename the field that doesn't exist
            When User renames 'Does not exist' field to 'Number' of the 'Verse' card type
            Then User sees an error 'Not found: Does not exist'

        Scenario: User can not rename the field to the existing one
            When User renames 'Verse Number' field to 'Text' of the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
             And Card type 'Verse' has the following fields
                 | Field        |
                 | Verse Number |
                 | Text         |


    Rule: User can change the order of the fields

        Background:
            When User adds the following fields to the 'Verse' card type
                | Field        | Order |
                | Verse Number | 1     |
                | Text         | 2     |
                | Translation  | 3     |

        Scenario: User can chanage the order of the fields
            When User changes position of 'Translation' field of 'Verse' card type to 1
             And Card type 'Verse' has the following fields
                | Field        | Order |
                | Translation  | 1     |
                | Verse Number | 2     |
                | Text         | 3     |

        Scenario Outline: User cannot change position of the field to the wrong place
            When User changes position of 'Translation' field of 'Verse' card type to <Position>
             And User sees an error 'Invalid position'
             And Card type 'Verse' has the following fields
                | Field        | Order |
                | Verse Number | 1     |
                | Text         | 2     |
                | Translation  | 3     |

             Examples:
                 | Position |
                 | -1       |
                 | 5        |


    Rule: Field name is not case sensitive

        Background:
            When User adds 'Verse' field to the 'Verse' card type

        Scenario: User cannot add a field with the same name in a different case
            When User adds 'verse' field to the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
