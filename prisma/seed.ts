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

function getAverages() {
    return [
        {
            content: 2.53,
            subject: "matematyka",
            subjectName: "Matematyka"
        },
        {
            content: 1.63,
            subject: "jezyk-polski",
            subjectName: "Język polski"
        },
        {
            content: 4.89,
            subject: "jezyk-angielski",
            subjectName: "Język angielski"
        }
    ];
}