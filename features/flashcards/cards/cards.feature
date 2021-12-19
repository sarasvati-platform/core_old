Feature: Flashcards/Cards

    Background:
        Given Empty deck
        When User creates 'Foreign Word' note type with the following fields
            | Field       |
            | Word        |
            | Translation |
            | Example     |
        And User adds 'Word -> Translation' card type to the 'Foreign Word' note type with the following sections
            | Section         |
            | {{Word}}        |
            | {{Translation}} |
            | {{Example}}     |
        And User adds 'Translation -> Word' card type to the 'Foreign Word' note type with the following sections
            | Section         |
            | {{Translation}} |
            | {{Word}}        |
            | {{Example}}     |


    Rule: User can create new cards

        Scenario: User can add a new card of the specified note type
            When User creates 'Foreign Word' note
                | Field       | Value              |
                | Word        | Window             |
                | Translation | ifasitela          |
                | Example     | ifasitela elikhulu |
            Then Note 'Window' has the following cards
                | Card Type           | Section 1 | Section 2 | Section 3          |
                | Word -> Translation | Window    | ifasitela | ifasitela elikhulu |
                | Translation -> Word | ifasitela | Window    | ifasitela elikhulu |
            And Note 'Window' has 2 cards


    Rule: Cards will be updated

        Scenario: User updates an existing note
            When User creates 'Foreign Word' note
                | Field       | Value              |
                | Word        | Window             |
                | Translation | ifasitela          |
                | Example     | ifasitela elikhulu |
            And User updates 'Window' note
                | Field | Value      |
                | Word  | Shopwindow |
            Then Note 'Shopwindow' has the following cards
                | Card Type           | Section 1  | Section 2  | Section 3          |
                | Word -> Translation | Shopwindow | ifasitela  | ifasitela elikhulu |
                | Translation -> Word | ifasitela  | Shopwindow | ifasitela elikhulu |
            And Note 'Shopwindow' has 2 cards
