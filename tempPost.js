const data = [
    {
        "title": "The Thursday Murder Club",
        "author": "Richard Osman",
        "description": "Four retirees meet weekly to solve cold cases, but find themselves in the middle of a real murder investigation.",
        "genre": ["Mystery", "Comedy", "Crime"],
        "copiesAvailable": 6,
        "publishedYear": 2020
    },
    {
        "title": "Project Hail Mary",
        "author": "Andy Weir",
        "description": "An astronaut wakes up alone on a spaceship with no memory and must save humanity from extinction.",
        "genre": ["Science Fiction", "Adventure"],
        "copiesAvailable": 4,
        "publishedYear": 2021
    },
    {
        "title": "The House in the Cerulean Sea",
        "author": "TJ Klune",
        "description": "A magical tale about a case worker who oversees magical children and finds family in unexpected places.",
        "genre": ["Fantasy", "Comedy", "LGBT"],
        "copiesAvailable": 8,
        "publishedYear": 2020
    },
    {
        "title": "Lessons in Chemistry",
        "author": "Bonnie Garmus",
        "description": "A brilliant female chemist becomes a cooking show host in the 1960s, teaching women science through cooking.",
        "genre": ["Historical Fiction", "Comedy", "Feminist"],
        "copiesAvailable": 5,
        "publishedYear": 2022
    },
    {
        "title": "A Man Called Ove",
        "author": "Fredrik Backman",
        "description": "A grumpy widower's life is changed by his boisterous new neighbors.",
        "genre": ["Comedy", "Contemporary", "Fiction"],
        "copiesAvailable": 7,
        "publishedYear": 2012
    },
    {
        "title": "The Midnight Library",
        "author": "Matt Haig",
        "description": "Between life and death, a woman explores all the lives she could have lived.",
        "genre": ["Fantasy", "Contemporary", "Philosophy"],
        "copiesAvailable": 9,
        "publishedYear": 2020
    },
    {
        "title": "Three Men in a Boat",
        "author": "Jerome K. Jerome",
        "description": "Three friends and a dog embark on a hilarious boating holiday on the Thames.",
        "genre": ["Classic", "Comedy", "Travel"],
        "copiesAvailable": 3,
        "publishedYear": 1889
    },
    {
        "title": "Good Omens",
        "author": "Terry Pratchett & Neil Gaiman",
        "description": "An angel and demon team up to prevent Armageddon because they've grown quite fond of Earth.",
        "genre": ["Fantasy", "Comedy", "Supernatural"],
        "copiesAvailable": 6,
        "publishedYear": 1990
    },
    {
        "title": "The Seven Deaths of Evelyn Hardcastle",
        "author": "Stuart Turton",
        "description": "A man must solve a murder by experiencing the same day through eight different witnesses.",
        "genre": ["Mystery", "Thriller", "Science Fiction"],
        "copiesAvailable": 4,
        "publishedYear": 2018
    },
    {
        "title": "Catch-22",
        "author": "Joseph Heller",
        "description": "A satirical novel about the absurdity of war following a U.S. Air Force bombardier.",
        "genre": ["Classic", "Comedy", "War"],
        "copiesAvailable": 5,
        "publishedYear": 1961
    }
]

async function pushData() {
    for (const book of data) {
        console.log("pushing ",book)
        await fetch("http://localhost:5000/book/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
    }
};

pushData();