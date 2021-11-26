Feature: Flashcards/Note Type/Field

    Background:
        Given Empty deck
        When User creates 'Verse' note type


    Rule: User can add fields

        User can add any fields he would like to the note type. Each field has
        its own unique name.

        Scenario: User can add fields to the note type
            When User adds the following fields to the 'Verse' note type
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |
            Then Note type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |

        Scenario: User can not add field with the same name
            When User adds 'Verse Number' field to the 'Verse' note type
             And User adds 'Verse Number' field to the 'Verse' note type
            Then User sees an error 'Item with same name already exists'
             And Note type 'Verse' has field 'Verse Number'


    Rule: User can manage fields once added

        User can add new fields, delete or rename old ones and change their
        positions.

        Background:
            When User adds the following fields to the 'Verse' note type
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |

        Scenario: User can add fields later
            When User adds the following fields to the 'Verse' note type
                | Field        |
                | Audio        |
            Then Note type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
                | Translation  |
                | Audio        |

        Scenario: User can delete fields from note type
            When User deletes 'Translation' field from 'Verse' note type
            Then Note type 'Verse' has the following fields
                | Field        |
                | Verse Number |
                | Text         |
            And Note type 'Verse' has no field 'Translation'

        Scenario: User can rename the field of note type
            When User renames 'Verse Number' field to 'Number' of the 'Verse' note type
            Then Note type 'Verse' has no field 'Verse Number'
             And Note type 'Verse' has field 'Number'

        Scenario: User can't rename the field that doesn't exist
            When User renames 'Does not exist' field to 'Number' of the 'Verse' note type
            Then User sees an error 'Not found: Does not exist'

        Scenario: User can not rename the field to the existing one
            When User renames 'Verse Number' field to 'Text' of the 'Verse' note type
            Then User sees an error 'Item with same name already exists'
             And Note type 'Verse' has the following fields
                 | Field        |
                 | Verse Number |
                 | Text         |


    Rule: User can change the order of the fields

        Background:
            When User adds the following fields to the 'Verse' note type
                | Field        | Order |
                | Verse Number | 1     |
                | Text         | 2     |
                | Translation  | 3     |

        Scenario: User can chanage the order of the fields
            When User changes position of 'Translation' field of 'Verse' note type to 1
             And Note type 'Verse' has the following fields
                | Field        | Order |
                | Translation  | 1     |
                | Verse Number | 2     |
                | Text         | 3     |

        Scenario Outline: User cannot change position of the field to the wrong place
            When User changes position of 'Translation' field of 'Verse' note type to <Position>
             And User sees an error 'Invalid position'
             And Note type 'Verse' has the following fields
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
            When User adds 'Verse' field to the 'Verse' note type

        Scenario: User cannot add a field with the same name in a different case
            When User adds 'verse' field to the 'Verse' note type
            Then User sees an error 'Item with same name already exists'
