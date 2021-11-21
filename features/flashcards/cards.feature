Feature: Flashcards/Cards

    Background:
        Given Empty deck
         When User creates 'Foreign Word' card type
          And User adds the following fields to the 'Foreign Word' card type
              | Field       |
              | Word        |
              | Translation |
              | Example     |
          And User adds 'Word -> Translation' face to the 'Foreign Word' card type with the following sections
              | Section         |
              | {{Word}}        |
              | {{Translation}} |
              | {{Example}}     |
          And User adds 'Translation -> Word' face to the 'Foreign Word' card type with the following sections
              | Section         |
              | {{Translation}} |
              | {{Word}}        |
              | {{Example}}     |


    Rule: User can create new cards

        User can create new cards and fill in the fields that have been defined
        in the type of cards. No other data that is not specified by the type
        can be added.

        Scenario: User can add new card of the known card type
             When User creates 'Foreign Word' card
                  | Field       | Value              |
                  | Word        | Window             |
                  | Translation | ifasitela          |
                  | Example     | ifasitela elikhulu |
             Then User can find card by 'Window'
              And User sees no error

        Scenario: User cannot create card with fields that are not present in card type
             When User creates 'Foreign Word' card
                  | Field       | Value    |
                  | Country     | Zimbabwe |
             Then User sees an error 'No field found'

        Scenario: User can delete card
             When User creates 'Foreign Word' card
                  | Field       | Value  |
                  | Word        | Window |
             Then User deletes 'Window' card
             Then User can't find card by 'Window'


    Rule: Question side of the card is unique

        Question is a value of the first field defined at related card type. It
        must be unique to avoid ambiguity. Imagine that you have several cards
        with the same question but different answers. The user will not be able
        to determine what kind of response is expected from him. Therefore, the
        question must be unique.

        Scenario: Question field must be unique
             When User creates 'Foreign Word' card
                  | Field       | Value              |
                  | Word        | Window             |
                  | Translation | ifasitela          |
                  | Example     | ifasitela elikhulu |
              And User creates 'Foreign Word' card
                  | Field | Value  |
                  | Word  | Window |
             Then User sees an error 'Card with the same question already exists'

        Scenario: Question field is case insensitive
             When User creates 'Foreign Word' card
                  | Field       | Value              |
                  | Word        | Window             |
                  | Translation | ifasitela          |
                  | Example     | ifasitela elikhulu |
              And User creates 'Foreign Word' card
                  | Field | Value  |
                  | Word  | window |
             Then User sees an error 'Card with the same question already exists'