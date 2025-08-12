export const CATEGORIES =  [
    {
      id: 1,
      name: 'Potions',
      description: 'Learn more about the art of potion-making from Professor Snape.',
      imageUrl: 'https://cdna.artstation.com/p/assets/images/images/007/756/508/large/adrian-brito-fantasypotionbottles-featured.jpg?1508303309',
      routeLink: 'potions'
    },
    {
      id: 2,
      name: 'Charms',
      description: 'Learn more about the use of spells and incantations with Professor Flitwick.',
      imageUrl: 'https://www.dictionary.com/e/wp-content/uploads/2022/06/20220620_magicWords_1000x700.jpg',
      routeLink: 'charms'
    },
    {
      id: 3,
      name: 'Wizards',
      description: 'Learn more about the Wizards of Hogwart',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV5r9L1Azf6HlS5pBW3E_6L33i7sfVEW0BGg&usqp=CAU',
      routeLink: 'wizards'
    },
    {
      id: 4,
      name: 'Herbology',
      description: 'Study the magical properties of plants with Professor Sprout.',
      imageUrl: 'https://images.ctfassets.net/usf1vwtuqyxm/1G70y30RIIDack4WperpRk/59b64c28486dd933e89e4bd0264a9d86/HP-F2-chamber-of-secrets-greenhouse-herbology-sprout-mandrake-lesson-class-web-landscape?fm=jpg&q=70&w=2560',
      routeLink: 'herbology'
    },
    {
      id: 5,
      name: 'Care of Magical Creatures',
      description: 'Learn more about how to care for and handle magical creatures with Professor Hagrid.',
      imageUrl: 'https://wallpaperaccess.com/full/369776.jpg',
      routeLink: 'magical-creatures'
    }
  ]

  export const CHARMS_DATA = [
    {
    name: "Accio",
    img: "https://cdn3.whatculture.com/images/2021/05/d2b8c39e7ac592b5-600x338.jpg",
    level: "Beginner",
    description: "A spell that summons an object to the caster's hand."
    },
    {
    name: "Aguamenti",
    img: "https://i.pinimg.com/474x/5c/c2/2c/5cc22cadee886553c85a48991f65aa0a.jpg",
    level: "Intermediate",
    description: "A spell that conjures a jet of water from the caster's wand."
    },
    {
    name: "Alohomora",
    img: "https://shekharsrivastavaofficial.files.wordpress.com/2017/04/alohomora.jpg",
    level: "Beginner",
    description: "A spell that unlocks and opens doors."
    },
    {
    name: "Ascendio",
    level: "Advanced",
    img: "data:image/jpeg;base64,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",
    description: "A spell that allows the caster to levitate"
    }
  ]



export const POTIONS_DATA = [
  {
  name: 'Love Potion',
  img: 'https://images.immediate.co.uk/production/volatile/sites/7/2013/02/GettyImages-503196822_Shy-714baa1.jpg?quality=90&resize=980,654',
  level: 'Intermediate',
  description: 'A potion that causes the drinker to fall in love with the first person they see after consuming it.'
  },
  {
  name: 'Polyjuice Potion',
  img: 'https://preview.redd.it/85zppitz64g31.jpg?auto=webp&s=eca7093742f7539089f4158949b230235003e6ef',
  level: 'Advanced',
  description: 'A potion that allows the drinker to transform into another person.'
  },
  {
  name: 'Sleeping Draught',
  img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8MUhnayALlj0MRvPdyq7bwQiMirRGSru8A&usqp=CAU',
  level: 'Beginner',
  description: 'A potion that causes the drinker to fall into a deep sleep.'
  },
  {
  name: 'Amortentia',
  img: 'https://cdn.shopify.com/s/files/1/1541/8579/files/Amortentia_potion_large.PNG?v=1581653516',
  level: 'Expert',
  description: 'A potion that causes the drinker to become infatuated with the person who brewed it.'
  },
  {
  name: 'Veritaserum',
  img: 'https://i.etsystatic.com/27252314/r/il/0247c3/2887427866/il_fullxfull.2887427866_drlh.jpg',
  level: 'Expert',
  description: 'A potion that causes the drinker to tell the truth.'
  }
  ];
