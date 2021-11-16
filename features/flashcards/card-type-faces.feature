Feature: Flashcards/Card Types/Faces

    Background:
        Given Empty deck
        When User creates 'Verse' card type


    Rule: User can add faces to card

        User can add any faces he would like to the card type. Each face has
        its own unique name.

        Scenario: User can add faces to the card type
            When User adds the following faces to the 'Verse' card type
                | Face                  |
                | Verse -> Number       |
                | Number -> Verse       |
                | Verse -> Translation  |
            Then Card type 'Verse' has the following faces
                | Face                  |
                | Verse -> Number       |
                | Number -> Verse       |
                | Verse -> Translation  |

        Scenario: User can not add face with the same name
            When User adds 'Verse -> Number' face to the 'Verse' card type
             And User adds 'Verse -> Number' face to the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
             And Card type 'Verse' has face 'Verse -> Number'


    Rule: User can manage faces once added

        User can add new faces, delete or rename old ones and change their
        positions.

        Background:
            When User adds the following faces to the 'Verse' card type
                | Face                 |
                | Verse -> Number      |
                | Number -> Verse      |
                | Verse -> Translation |

        Scenario: User can add faces later
            When User adds the following faces to the 'Verse' card type
                | Face            |
                | Audio -> Number |
            Then Card type 'Verse' has the following faces
                | Face                 |
                | Verse -> Number      |
                | Number -> Verse      |
                | Verse -> Translation |
                | Audio -> Number      |

        Scenario: User can delete faces from card type
            When User deletes 'Verse -> Number' face from 'Verse' card type
            Then Card type 'Verse' has the following faces
                | Face                 |
                | Number -> Verse      |
                | Verse -> Translation |
            And Card type 'Verse' has no face 'Verse -> Number'

        Scenario: User can rename the face of card type
            When User renames 'Verse -> Number' face to 'Verse to Number' of the 'Verse' card type
            Then Card type 'Verse' has no face 'Verse -> Number'
             And Card type 'Verse' has face 'Verse to Number'

        Scenario: User can't rename the face that doesn't exist
            When User renames 'Does not exist' face to 'Number' of the 'Verse' card type
            Then User sees an error 'Not found: Does not exist'

        Scenario: User can not rename the face to the existing one
            When User renames 'Verse -> Number' face to 'Number -> Verse' of the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
            Then Card type 'Verse' has the following faces
                | Face                 |
                | Verse -> Number      |
                | Number -> Verse      |
                | Verse -> Translation |


    Rule: User can change the order of the faces

        Background:
            When User adds the following faces to the 'Verse' card type
                | Face                 | Order |
                | Verse -> Number      | 1     |
                | Number -> Verse      | 2     |
                | Verse -> Translation | 3     |

        Scenario: User can chanage the order of the faces
            When User changes position of 'Verse -> Translation' face of 'Verse' card type to 1
            Then Card type 'Verse' has the following faces
                | Face                 | Order |
                | Verse -> Translation | 1     |
                | Verse -> Number      | 2     |
                | Number -> Verse      | 3     |

        Scenario Outline: User cannot change position of the face to the wrong place
            When User changes position of 'Verse -> Translation' face of 'Verse' card type to <Position>
            Then User sees an error 'Invalid position'
             And Card type 'Verse' has the following faces
                | Face                 | Order |
                | Verse -> Number      | 1     |
                | Number -> Verse      | 2     |
                | Verse -> Translation | 3     |

             Examples:
                 | Position |
                 | -1       |
                 | 5        |


    Rule: Face name is not case sensitive

        Background:
            When User adds 'Verse -> Number' face to the 'Verse' card type

        Scenario: User cannot add a face with the same name in a different case
            When User adds 'verse -> number' face to the 'Verse' card type
            Then User sees an error 'Item with same name already exists'
