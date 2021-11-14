# Models
Suppose we have "Foreign Word" card type (`CardType`). It has the following fields (`CardField`): "word", "translation", "audio", "example". It also has two faces (`CardFace`): _word → translation_ and _translation → word_. Each face have three sections: _front_ that shows word or translation; _back_ that shows translation or word (and audio); _examples_ that show word usage examples

```mermaid
classDiagram

CardType --* Card
  CardType: EntityId id
  CardType: string name
  CardType: CardField[] fields
  CardType: CardFace[] faces


CardFace --* CardType
  CardFace: string name
  CardFace: CardFaceSection[] sections


CardFaceSection --* CardFace
  CardFaceSection: string template


CardField --* CardType
  CardField: string name
  CardField: CardFieldType type


Card
  Card: EntityId id
  Card: Map<int, string> data
  Card: getFieldValue(int fieldId)
  Card: setFieldValue(int fieldId, string value)

Note *-- Card
Note *-- CardFace
  Note: EntityId EntityId
  Note: CardFace CardFace
  Note: Card Card
  Note: Schedule Schedule

Schedule *-- Note
  Schedule: DateTime due
```