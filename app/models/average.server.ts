import { db } from "~/./utils/db.server";
export type { Average } from "@prisma/client";

export async function getAverages() {
    return db.average.findMany();
}

export async function getAverage(subject: string) {
    return db.average.findFirst({ where: { subject: subject } });
}