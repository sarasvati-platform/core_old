Feature: Flashcards/Card Type/Section

    Background:
        Given Empty deck
        When User creates 'Verse' note type
         And User adds the following fields to the 'Verse' note type
             | Field         |
             | Word          |
             | Translation   |

    Rule: User can add sections to card types

        Scenario: User add card type with sections
             When User adds 'Word -> Translation' card type to the 'Verse' note type with the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |
             Then Card type 'Word -> Translation' of the 'Verse' note type has the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |


    Rule: User can manage sections once added

        Background:
             When User adds 'Word -> Translation' card type to the 'Verse' note type with the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |

        Scenario: User can add card types later
             When User adds the following sections to the 'Word -> Translation' card type of the 'Verse' note type
                  | Section     |
                  | {{Audio}}   |
                  | {{Example}} |
             Then Card type 'Word -> Translation' of the 'Verse' note type has the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |
                  | {{Audio}}       |
                  | {{Example}}     |

        Scenario: User can delete sections from card type
            When User deletes 1 section from 'Word -> Translation' card type of 'Verse' note type
            Then Card type 'Word -> Translation' of the 'Verse' note type has the following sections
                 | Section         |
                 | {{Translation}} |
