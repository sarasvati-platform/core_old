Cards
A question and answer pair is called a 'card'. This is based on a paper flashcard with a question on one side and the answer on the back. In Anki a card doesn’t actually look like a physical card, and when you show the answer the question remains visible by default. For example, if you’re studying basic chemistry, you might see a question like:


Q: Chemical symbol for oxygen?
After thinking about it, and deciding the answer is O, you click the show answer button, and Anki shows you:


Q: Chemical symbol for oxygen?
A: O
After confirming that you are correct, you can tell Anki how well you remembered, and Anki will choose a next time to show you again.

Decks
A 'deck' is a group of cards. You can place cards in different decks to study parts of your card collection instead of studying everything at once. Each deck can have different settings, such as how many new cards to show each day, or how long to wait until cards are shown again.

Decks can contain other decks, which allows you to organize decks into a tree. Anki uses “::” to show different levels. A deck called “Chinese::Hanzi” refers to a “Hanzi” deck, which is part of a “Chinese” deck. If you select “Hanzi” then only the Hanzi cards will be shown; if you select “Chinese” then all Chinese cards, including Hanzi cards, will be shown.

To place decks into a tree, you can either name them with “::” between each level, or drag and drop them from the deck list. Decks that have been nested under another deck (that is, that have at least one “::” in their names) are often called 'subdecks', and top-level decks are sometimes called 'superdecks' or 'parent decks'.

Anki starts with a deck called “default”; any cards which have somehow become separated from other decks will go here. Anki will hide the default deck if it contains no cards and you have added other decks. Alternatively, you may rename this deck and use it for other cards.

Decks are best used to hold broad categories of cards, rather than specific topics such as “food verbs” or “lesson 1”. For more info on this, please see the using decks appropriately section.

For information on how decks affect the order cards are displayed in, please see the display order section.

Notes & Fields
When making flashcards, it’s often desirable to make more than one card that relates to some information. For example, if you’re learning French, and you learn that the word “bonjour” means “hello”, you may wish to create one card that shows you “bonjour” and asks you to remember “hello”, and another card that shows you “hello” and asks you to remember “bonjour”. One card is testing your ability to recognize the foreign word, and the other card is testing your ability to produce it.

When using paper flashcards, your only option in this case is to write out the information twice, once for each card. Some computer flashcard programs make life easier by providing a feature to flip the front and back sides. This is an improvement over the paper situation, but there are two major downsides:

Because such programs don’t track your performance of recognition and production separately, cards will tend not to be shown to you at the optimum time, meaning you forget more than you’d like, or you study more than is necessary.

Reversing the question and answer only works when you want exactly the same content on each side. This means it’s not possible to display extra info on the back of each card for example.

Anki solves these problems by allowing you to split the content of your cards up into separate pieces of information. You can then tell Anki which pieces of information you want on each card, and Anki will take care of creating the cards for you and updating them if you make any edits in the future.

Imagine we want to study French vocabulary, and we want to include the page number on the back of each card. We want our cards to look like this:


Q: Bonjour
A: Hello
   Page #12
And:


Q: Hello
A: Bonjour
   Page #12
In this example, we have three pieces of related information: a French word, an English meaning, and a page number. If we put them together, they’d look like this:


French: Bonjour
English: Hello
Page: 12
In Anki, this related information is called a 'note', and each piece of information is called a 'field'. So we can say that this type of note has three fields: French, English, and Page.

To add and edit fields, click the “Fields…​” button while adding or editing notes. For more information on fields, please see the Customizing Fields section.

Card Types
In order for Anki to create cards based on our notes, we need to give it a blueprint that says which fields should be displayed on the front or back of each card. This blueprint is called a 'card type'. Each type of note can have one or more card types; when you add a note, Anki will create one card for each card type.

Each card type has two 'templates', one for the question and one for the answer. In the above French example, we wanted the recognition card to look like this:


Q: Bonjour
A: Hello
   Page #12
To do this, we can set the question and answer templates to:


Q: {{French}}
A: {{English}}<br>
   Page #{{Page}}
By surrounding a field name in double curly brackets, we tell Anki to replace that section with the actual information in the field. Anything not surrounded by curly brackets remains the same on each card. (For instance, we don’t have to type “Page #” into the Page field when adding material – it’s added automatically to every card.) <br> is a special code that tells Anki to move to the next line; more details are available in the templates section.

The production card templates work in a similar way:


Q: {{English}}
A: {{French}}<br>
   Page #{{Page}}
Once a card type has been created, every time you add a new note, a card will be created based on that card type. Card types make it easy to keep the formatting of your cards consistent and can greatly reduce the amount of effort involved in adding information. They also mean Anki can ensure related cards don’t appear too close to each other, and they allow you to fix a typing mistake or factual error once and have all the related cards updated at once.

To add and edit card types, click the “Cards" button while adding or editing notes. For more information on card types, please see the Cards and Templates section.

Note Types
Anki allows you to create different types of notes for different material. Each type of note has its own set of fields and card types. It’s a good idea to create a separate note type for each broad topic you’re studying. In the above French example, we might create a note type called “French” for that. If we wanted to learn capital cities, we could create a separate note type for that as well, with fields such as “Country” and “Capital City”.

When Anki checks for duplicates, it only compares other notes of the same type. Thus if you add a capital city called “Orange” using the capital city note type, you won’t see a duplicate message when it comes time to learn how to say “orange” in French.

When you create a new collection, Anki automatically adds some standard note types to it. These note types are provided to make Anki easier for new users, but in the long run it’s recommended you define your own note types for the content you are learning. The standard note types are as follows:

Basic Has Front and Back fields, and will create one card. Text you enter in Front will appear on the front of the card, and text you enter in Back will appear on the back of the card.

Basic (and reversed card)
Like Basic, but creates two cards for the text you enter: one from front→back and one from back→front.

Basic (optional reversed card) This is a front→back card, and optionally a back→front card. To do this, it has a third field called “Add Reverse.” If you enter any text into that field, a reverse card will be created. More information about this is available in the Cards and Templates section.

Cloze
A note type which makes it easy to select text and turn it into a cloze deletion (e.g., “Man landed on the moon in […​]” → “Man landed on the moon in 1969”). More information is available in the cloze deletion section.

To add your own note types and modify existing ones, you can use Tools → Manage Note Types from the main Anki window.

Notes and note types are common to your whole collection rather than limited to an individual deck. This means you can use many different types of notes in a particular deck, or have different cards generated from a particular note in different decks. When you add notes using the Add window, you can select what note type to use and what deck to use, and these choices are completely independent of each other. You can also change the note type of some notes after you’ve already created them.

# Models
`CardSection` - a part of the `Card` that is formed from the section template and the value of the Notes fields. Each `Card` can have several sections. The first section is called a question, the rest are the answer.

`CardType` - a template by which the cards are formed. It can consist of several sections.

`NoteField` - the data in the `Note` is saved in the fields. The field values are injected into the `CardSection` to generate the `Card`.

`NoteType` - the template by which the notes are created. Each note type has its own fields and card types.

`Note` - a record containing data to generate multiple cards created using card type template.

Suppose we have "Foreign Word" note type. It has the following fields: "word", "translation", "audio", "example". It also has two card types: _word → translation_ and _translation → word_. Each card type have three sections: _front_ that shows word or translation; _back_ that shows translation or word (and audio); _examples_ that show word usage examples


```mermaid
classDiagram


Card --> CardType: created with
  Card: CardType type

Card --> Note : gets data from
  Card: Note note


Note --> NoteType : get structure from
  Note: NoteType type
  Note: Dict fieldValues


NoteType o--> CardType : 1..*
  NoteType: CardType types

NoteType o--> NoteField : 1..*
  NoteType: NoteField fields
  NoteType: string name


NoteField: string name


CardType o--> CardSection : 1..*
  CardType: string name
  CardType: CardSection sections[]


CardSection
  CardSection: string template
```