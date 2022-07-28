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
            "content": 4.64,
            "subject": "matematyka",
            "subjectName": "Matematyka",
            "type": "zwykla",
            "user": "uuid jakies"
        }
    ]
}