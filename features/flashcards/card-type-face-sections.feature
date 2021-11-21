Feature: Flashcards/Card Types/Sections

    Background:
        Given Empty deck
        When User creates 'Verse' card type
         And User adds the following fields to the 'Verse' card type
             | Field         |
             | Word          |
             | Translation   |

    Rule: User can add sections to faces

        Scenario: User add face with sections
             When User adds 'Word -> Translation' face to the 'Verse' card type with the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |
             Then Card face 'Word -> Translation' of the 'Verse' card type has the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |


    Rule: User can manage sections once added

        Background:
             When User adds 'Word -> Translation' face to the 'Verse' card type with the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |

        Scenario: User can add faces later
             When User adds the following sections to the 'Word -> Translation' face of the 'Verse' card type
                  | Section     |
                  | {{Audio}}   |
                  | {{Example}} |
             Then Card face 'Word -> Translation' of the 'Verse' card type has the following sections
                  | Section         |
                  | {{Word}}        |
                  | {{Translation}} |
                  | {{Audio}}       |
                  | {{Example}}     |

        Scenario: User can delete sections from card face
            When User deletes 1 section from 'Word -> Translation' face of 'Verse' card type
            Then Card face 'Word -> Translation' of the 'Verse' card type has the following sections
                 | Section         |
                 | {{Translation}} |
