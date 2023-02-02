const template = [
  {
    position: { rowStart: 1, columnStart: 1, rowEnd: 3, columnEnd: 17 },
    inputFields: [
      {
        type: "text",
        position: { rowStart: 1, columnStart: 1, rowEnd: 3, columnEnd: 6 },
        label: "Character Name",
        value: "",
      },
      {
        type: "select",
        position: { rowStart: 1, columnStart: 6, rowEnd: 2, columnEnd: 10 },
        label: "Class",
        value: [],
        isMultiSelect: true,
        options: [
          "Barbarian",
          "Bard",
          "Cleric",
          "Druid",
          "Fighter",
          "Monk",
          "Paladin",
          "Ranger",
          "Rogue",
          "Sorcerer",
          "Warlock",
          "Wizard",
        ],
      },
      {
        type: "number",
        position: { rowStart: 1, columnStart: 10, rowEnd: 2, columnEnd: 14 },
        label: "Level",
        value: "",
      },
      {
        type: "select",
        position: { rowStart: 1, columnStart: 14, rowEnd: 2, columnEnd: 17 },
        label: "Race",
        value: "",
        options: [
          "Dwarf",
          "Elf",
          "Halfling",
          "Human",
          "Dragonborn",
          "Gnome",
          "Half-Elf",
          "Half-Orc",
          "Tiefling",
        ],
      },
      {
        type: "text",
        position: { rowStart: 2, columnStart: 1, rowEnd: 3, columnEnd: 6 },
        label: "Background",
        value: "",
      },
      {
        type: "text",
        position: { rowStart: 2, columnStart: 6, rowEnd: 3, columnEnd: 10 },
        label: "Alignment",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 2, columnStart: 10, rowEnd: 3, columnEnd: 17 },
        label: "Experience Points",
        value: "",
      },
    ],
    title: "Character Info",
  },
  {
    position: { rowStart: 3, columnStart: 1, rowEnd: 9, columnEnd: 3 },
    inputFields: [
      {
        type: "numberWithModifier",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 3 },
        label: "Strength",
        value: { main: 0, modifier: 0 },
      },
      {
        type: "numberWithModifier",
        position: { rowStart: 2, columnStart: 1, rowEnd: 3, columnEnd: 3 },
        label: "Dexterity",
        value: { main: 0, modifier: 0 },
      },
      {
        type: "numberWithModifier",
        position: { rowStart: 3, columnStart: 1, rowEnd: 4, columnEnd: 3 },
        label: "Constitution",
        value: { main: 0, modifier: 0 },
      },
      {
        type: "numberWithModifier",
        position: { rowStart: 4, columnStart: 1, rowEnd: 5, columnEnd: 3 },
        label: "Intelligence",
        value: { main: 0, modifier: 0 },
      },
      {
        type: "numberWithModifier",
        position: { rowStart: 5, columnStart: 1, rowEnd: 6, columnEnd: 3 },
        label: "Wisdom",
        value: { main: 0, modifier: 0 },
      },
      {
        type: "numberWithModifier",
        position: { rowStart: 6, columnStart: 1, rowEnd: 7, columnEnd: 3 },
        label: "Charisma",
        value: { main: 0, modifier: 0 },
      },
    ],
    title: "Stats",
  },
  {
    position: { rowStart: 3, columnStart: 3, rowEnd: 4, columnEnd: 7 },
    inputFields: [
      {
        type: "checkbox",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 5 },
        label: "Strength",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 2, columnStart: 1, rowEnd: 3, columnEnd: 5 },
        label: "Dexterity",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 3, columnStart: 1, rowEnd: 4, columnEnd: 5 },
        label: "Constitution",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 4, columnStart: 1, rowEnd: 5, columnEnd: 5 },
        label: "Intelligence",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 5, columnStart: 1, rowEnd: 6, columnEnd: 5 },
        label: "Wisdom",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 6, columnStart: 1, rowEnd: 7, columnEnd: 5 },
        label: "Charisma",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
    ],
    title: "Saving throws",
  },
  {
    position: { rowStart: 4, columnStart: 3, rowEnd: 9, columnEnd: 7 },
    inputFields: [
      {
        type: "checkbox",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 5 },
        label: "Acrobatics",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 2, columnStart: 1, rowEnd: 3, columnEnd: 5 },
        label: "Animal Handling",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 3, columnStart: 1, rowEnd: 4, columnEnd: 5 },
        label: "Arcana",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 4, columnStart: 1, rowEnd: 5, columnEnd: 5 },
        label: "Athletics",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 5, columnStart: 1, rowEnd: 6, columnEnd: 5 },
        label: "Deception",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 6, columnStart: 1, rowEnd: 7, columnEnd: 5 },
        label: "History",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 7, columnStart: 1, rowEnd: 8, columnEnd: 5 },
        label: "Insight",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 8, columnStart: 1, rowEnd: 9, columnEnd: 5 },
        label: "Intimidation",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 9, columnStart: 1, rowEnd: 10, columnEnd: 5 },
        label: "Investigation",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 10, columnStart: 1, rowEnd: 11, columnEnd: 5 },
        label: "Medicine",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 11, columnStart: 1, rowEnd: 12, columnEnd: 5 },
        label: "Nature",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 12, columnStart: 1, rowEnd: 13, columnEnd: 5 },
        label: "Perception",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 13, columnStart: 1, rowEnd: 14, columnEnd: 5 },
        label: "Performance",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 14, columnStart: 1, rowEnd: 15, columnEnd: 5 },
        label: "Persuation",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 15, columnStart: 1, rowEnd: 16, columnEnd: 5 },
        label: "Religion",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 16, columnStart: 1, rowEnd: 17, columnEnd: 5 },
        label: "Sleight of Hand",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 17, columnStart: 1, rowEnd: 18, columnEnd: 5 },
        label: "Stealth",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
      {
        type: "checkbox",
        position: { rowStart: 18, columnStart: 1, rowEnd: 19, columnEnd: 5 },
        label: "Survival",
        value: "",
        quantity: 1,
        isPrecisionRating: false,
        numberValue: 0,
      },
    ],
    title: "Skills",
  },
  {
    position: { rowStart: 3, columnStart: 7, rowEnd: 6, columnEnd: 12 },
    inputFields: [
      {
        type: "number",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 2 },
        label: "Armor Class",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 1, columnStart: 2, rowEnd: 2, columnEnd: 4 },
        label: "Initiative",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 1, columnStart: 4, rowEnd: 2, columnEnd: 6 },
        label: "Speed",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 2, columnStart: 1, rowEnd: 3, columnEnd: 6 },
        label: "Current Hit Points",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 3, columnStart: 1, rowEnd: 4, columnEnd: 6 },
        label: "Temporary Hit Points",
        value: "",
      },
      {
        type: "text",
        position: { rowStart: 4, columnStart: 1, rowEnd: 5, columnEnd: 3 },
        label: "Hit Dice",
        value: "",
      },
      {
        type: "number",
        position: { rowStart: 5, columnStart: 1, rowEnd: 7, columnEnd: 3 },
        label: "Hit Dice Total",
        value: "",
      },
      {
        type: "checkbox",
        position: { rowStart: 4, columnStart: 3, rowEnd: 5, columnEnd: 6 },
        label: "Death Save: Successes",
        value: "",
        quantity: 3,
        isPrecisionRating: false,
      },
      {
        type: "checkbox",
        position: { rowStart: 5, columnStart: 3, rowEnd: 6, columnEnd: 6 },
        label: "Death Save: Failures",
        value: "",
        quantity: 3,
        isPrecisionRating: false,
      },
    ],
    title: "Combat",
  },
  {
    position: { rowStart: 6, columnStart: 7, rowEnd: 9, columnEnd: 12 },
    inputFields: [
      {
        type: "textarea",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 12 },
        label: "",
        value: "",
      },
    ],
    title: "Attacks & Spellcasting",
  },
  {
    position: { rowStart: 3, columnStart: 12, rowEnd: 10, columnEnd: 17 },
    inputFields: [
      {
        type: "textarea",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 12 },
        label: "",
        value: "",
      },
    ],
    title: "Features & Traits",
  },
  {
    position: { rowStart: 9, columnStart: 7, rowEnd: 10, columnEnd: 12 },
    inputFields: [
      {
        type: "textarea",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 12 },
        label: "",
        value: "",
      },
    ],
    title: "Equipment",
  },
  {
    position: { rowStart: 9, columnStart: 1, rowEnd: 10, columnEnd: 7 },
    inputFields: [
      {
        type: "textarea",
        position: { rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 12 },
        label: "",
        value: "",
      },
    ],
    title: "Other Proficiencies & Languages",
  },
]

export default template