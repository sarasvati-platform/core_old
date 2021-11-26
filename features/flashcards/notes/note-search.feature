Feature: Flashcards/Note/Search

    Background:
        Given Empty deck
         When User creates 'Foreign Word' note type with the following fields
              | Field       |
              | Word        |
              | Translation |
              | Example     |
          And User adds 'Word -> Translation' face to the 'Foreign Word' note type with the following sections
              | Section         |
              | {{Word}}        |
              | {{Translation}} |
              | {{Example}}     |
          And User adds 'Translation -> Word' face to the 'Foreign Word' note type with the following sections
              | Section         |
              | {{Translation}} |
              | {{Word}}        |
              | {{Example}}     |


    Rule: User can search cards by question

        Question is a value of the first field defined at related note type.

        Scenario: User can search crads by question
            When User creates 'Foreign Word' card
                 | Field       | Value              |
                 | Word        | Window             |
                 | Translation | ifasitela          |
                 | Example     | ifasitela elikhulu |
              Then User can find card by 'Window'
               And User can't find card by 'door'

        Scenario: Search is case insensitive
             When User creates 'Foreign Word' card
                  | Field       | Value  |
                  | Word        | Window |
              And User can find card by 'window'

        Scenario: Search ignores punctuation marks and white spaces
            When User creates 'Foreign Word' card
                 | Field       | Value              |
                 | Word        | Big-Window?        |
                 | Translation | ifasitela          |
                 | Example     | ifasitela elikhulu |
              Then User can find card by 'big window'
