import { readGamesPlayedAfterDate } from "../backend/data/plays";

const results = await readGamesPlayedAfterDate(new Date("2024-01-01"));

console.log(JSON.stringify({ results }, undefined, 2));
