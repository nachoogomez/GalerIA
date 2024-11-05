const products = [
    {
        id: 1,
        title: "Starry Night",
        artist: "Vincent van Gogh",
        year: 1889,
        description: "A famous painting by Vincent van Gogh depicting a night sky filled with swirling clouds and stars.",
        price: 1000090,
        imageUrl: 'https://res.cloudinary.com/duslo5lw8/image/upload/v1730467785/Galeria/the-starry-night_dpjpfq.jpg'
    },
    {
        id: 2,
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        year: 1503,
        description: "A portrait painting by Leonardo da Vinci, known for the subject's enigmatic expression.",
        price: 1850000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730467901/Galeria/leonardo-da-vinci-mona-lisa-c-150319-oil-on-poplar-77-53-cm-mus%C3%A9e-du-louvre-paris_wmltw8.webp"
    },
    {
        id: 3,
        title: "The Persistence of Memory",
        artist: "Salvador Dalí",
        year: 1931,
        description: "A surreal painting by Salvador Dalí featuring melting clocks in a desert landscape.",
        price: 1200000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583748/Galeria/auz9arh1qyyrjtuszjfy.webp"
    },
    {
        id: 4,
        title: "The Scream",
        artist: "Edvard Munch",
        year: 1893,
        description: "An iconic painting by Edvard Munch depicting a figure with an agonized expression against a tumultuous sky.",
        price: 119900000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583738/Galeria/zpk9l4gue1behrro7adn.webp"
    },
    {
        id: 5,
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: 1665,
        description: "A famous painting by Johannes Vermeer, often referred to as the 'Mona Lisa of the North'.",
        price: 30000000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583752/Galeria/lm5ljblk2ol9jkfko8nz.webp"
    },    
    {
        id: 6,
        title: "Guernica",
        artist: "Pablo Picasso",
        year: 1937,
        description: "A mural-sized oil painting on canvas by Pablo Picasso, depicting the suffering of people and animals during the Spanish Civil War.",
        price: 200000000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583734/Galeria/vtujt8ji8yx2ejpor7zh.webp"
    },
    {
        id: 7,
        title: "The Birth of Venus",
        artist: "Sandro Botticelli",
        year: 1486,
        description: "A painting by Sandro Botticelli depicting the goddess Venus emerging from the sea on a shell.",
        price: 150000000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583734/Galeria/azbeufwjjxvelgfohs6m.webp"
    },
    {
        id: 8,
        title: "The Night Watch",
        artist: "Rembrandt van Rijn",
        year: 1642,
        description: "A famous painting by Rembrandt, known for its large size and dramatic use of light and shadow.",
        price: 250000000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583744/Galeria/aedcmzziururvm7w4dkd.webp"
    },
    {
        id: 9,
        title: "American Gothic",
        artist: "Grant Wood",
        year: 1930,
        description: "A painting by Grant Wood depicting a farmer standing beside his daughter, often interpreted as a depiction of rural American life.",
        price: 6000000,
        imageUrl: "https://res.cloudinary.com/duslo5lw8/image/upload/v1730583734/Galeria/ydtvdnx8diawhprhhqh5.webp"
    }
];

export const TotalProducts = products.length;

export const Products = products.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
      }
    
      acc[product.category] = [...acc[product.category], product];
    
      return acc;
    }, {});

