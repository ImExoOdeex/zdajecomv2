import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getAverages().map((average) => {
            return db.average.create({ data: average });
        })
    );
}

seed();

// Hiszpański, Francuski, Włoski, Matematyka rozszerzona

function getAverages() {
    return [
        {
            "content": 4.86,
            "subjectName": "Matematyka",
            "subject": "matematyka"
        },
        {
            "content": 4.06,
            "subjectName": "Język polski",
            "subject": "jezyk-polski"
        },
        {
            "content": 3.1,
            "subjectName": "Język angielski",
            "subject": "jezyk-angielski"
        },
        {
            "content": 4.78,
            "subjectName": "Geografia",
            "subject": "geografia"
        },
        {
            "content": 2.64,
            "subjectName": "Historia",
            "subject": "historia"
        },
        {
            "content": 3.2,
            "subjectName": "Fizyka",
            "subject": "fizyka"
        },
        {
            "content": 4.87,
            "subjectName": "Informatyka",
            "subject": "informatyka"
        },
        {
            "content": 5.37,
            "subjectName": "Wychowanie fizyczne",
            "subject": "wf"
        },
        {
            "content": 4.87,
            "subjectName": "Język niemiecki",
            "subject": "jezyk-niemiecki"
        },
        {
            "content": 2.7,
            "subjectName": "Biologia",
            "subject": "biologia"
        },
        {
            "content": 3.86,
            "subjectName": "Chemia",
            "subject": "chemia"
        },
        {
            "content": 2.73,
            "subjectName": "BHP",
            "subject": "bhp"
        },
        {
            "content": 3.4,
            "subjectName": "Filozofia",
            "subject": "filozofia"
        },
        {
            "content": 3.73,
            "subjectName": "Religia",
            "subject": "religia"
        },
        {
            "content": 2.71,
            "subjectName": "Strony internetowe",
            "subject": "strony-internetowe"
        },
        {
            "content": 2.97,
            "subjectName": "Programowanie obiektowe",
            "subject": "programowanie-obiektowe"
        },
        {
            "content": 3,
            "subjectName": "Informatyka zawodowa",
            "subject": "informatyka-zawodowa"
        },
        {
            "content": 3.14,
            "subjectName": "Przygotowanie systemu operacyjnego do pracy",
            "subject": "psodp"
        },
        {
            "content": 4.64,
            "subjectName": "Angielski rozszerzony",
            "subject": "angielski-rozszerzony"
        },
        {
            "content": 4.55,
            "subjectName": "Informatyka rozszerzona",
            "subject": "informatyka-rozszerzona"
        },
        {
            "content": 2.86,
            "subjectName": "Fizyka rozszerzona",
            "subject": "fizyka-rozszerzona"
        },
        {
            "content": 4.56,
            "subjectName": "Bazy danych",
            "subject": "bd"
        },
        {
            "content": 4.87,
            "subjectName": "Matematyka",
            "subject": "matematyka"
        },
        {
            "content": 4.91,
            "subjectName": "Język polski",
            "subject": "jezyk-polski"
        },
        {
            "content": 3.65,
            "subjectName": "Język angielski",
            "subject": "jezyk-angielski"
        },
        {
            "content": 5.27,
            "subjectName": "Geografia",
            "subject": "geografia"
        },
        {
            "content": 2.59,
            "subjectName": "Historia",
            "subject": "historia"
        },
        {
            "content": 3.12,
            "subjectName": "Fizyka",
            "subject": "fizyka"
        },
        {
            "content": 3.08,
            "subjectName": "Informatyka",
            "subject": "informatyka"
        },
        {
            "content": 2.72,
            "subjectName": "Wychowanie fizyczne",
            "subject": "wf"
        },
        {
            "content": 3.72,
            "subjectName": "Język niemiecki",
            "subject": "jezyk-niemiecki"
        },
        {
            "content": 3.23,
            "subjectName": "Biologia",
            "subject": "biologia"
        },
        {
            "content": 4.28,
            "subjectName": "Chemia",
            "subject": "chemia"
        },
        {
            "content": 5.74,
            "subjectName": "BHP",
            "subject": "bhp"
        },
        {
            "content": 3.52,
            "subjectName": "Filozofia",
            "subject": "filozofia"
        },
        {
            "content": 3.2,
            "subjectName": "Religia",
            "subject": "religia"
        },
        {
            "content": 3.96,
            "subjectName": "Strony internetowe",
            "subject": "strony-internetowe"
        },
        {
            "content": 4.83,
            "subjectName": "Programowanie obiektowe",
            "subject": "programowanie-obiektowe"
        },
        {
            "content": 4.13,
            "subjectName": "Informatyka zawodowa",
            "subject": "informatyka-zawodowa"
        },
        {
            "content": 4.78,
            "subjectName": "Przygotowanie systemu operacyjnego do pracy",
            "subject": "psodp"
        },
        {
            "content": 4.9,
            "subjectName": "Angielski rozszerzony",
            "subject": "angielski-rozszerzony"
        },
        {
            "content": 4.42,
            "subjectName": "Informatyka rozszerzona",
            "subject": "informatyka-rozszerzona"
        },
        {
            "content": 5.52,
            "subjectName": "Fizyka rozszerzona",
            "subject": "fizyka-rozszerzona"
        },
        {
            "content": 5.66,
            "subjectName": "Bazy danych",
            "subject": "bd"
        },
        {
            "content": 3.05,
            "subjectName": "Matematyka",
            "subject": "matematyka"
        },
        {
            "content": 3.15,
            "subjectName": "Język polski",
            "subject": "jezyk-polski"
        },
        {
            "content": 3.53,
            "subjectName": "Język angielski",
            "subject": "jezyk-angielski"
        },
        {
            "content": 4.5,
            "subjectName": "Geografia",
            "subject": "geografia"
        },
        {
            "content": 3.9,
            "subjectName": "Historia",
            "subject": "historia"
        },
        {
            "content": 4.7,
            "subjectName": "Fizyka",
            "subject": "fizyka"
        },
        {
            "content": 4.02,
            "subjectName": "Informatyka",
            "subject": "informatyka"
        },
        {
            "content": 4.09,
            "subjectName": "Wychowanie fizyczne",
            "subject": "wf"
        },
        {
            "content": 5.23,
            "subjectName": "Język niemiecki",
            "subject": "jezyk-niemiecki"
        },
        {
            "content": 3.63,
            "subjectName": "Biologia",
            "subject": "biologia"
        },
        {
            "content": 4,
            "subjectName": "Chemia",
            "subject": "chemia"
        },
        {
            "content": 4.34,
            "subjectName": "BHP",
            "subject": "bhp"
        },
        {
            "content": 3.55,
            "subjectName": "Filozofia",
            "subject": "filozofia"
        },
        {
            "content": 4.3,
            "subjectName": "Religia",
            "subject": "religia"
        },
        {
            "content": 4.27,
            "subjectName": "Strony internetowe",
            "subject": "strony-internetowe"
        },
        {
            "content": 4.26,
            "subjectName": "Programowanie obiektowe",
            "subject": "programowanie-obiektowe"
        },
        {
            "content": 5.65,
            "subjectName": "Informatyka zawodowa",
            "subject": "informatyka-zawodowa"
        },
        {
            "content": 5.11,
            "subjectName": "Przygotowanie systemu operacyjnego do pracy",
            "subject": "psodp"
        },
        {
            "content": 2.46,
            "subjectName": "Angielski rozszerzony",
            "subject": "angielski-rozszerzony"
        },
        {
            "content": 2.64,
            "subjectName": "Informatyka rozszerzona",
            "subject": "informatyka-rozszerzona"
        },
        {
            "content": 5.19,
            "subjectName": "Fizyka rozszerzona",
            "subject": "fizyka-rozszerzona"
        },
        {
            "content": 2.43,
            "subjectName": "Bazy danych",
            "subject": "bd"
        }
    ];
}