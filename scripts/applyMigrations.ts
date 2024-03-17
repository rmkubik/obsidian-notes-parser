import db from "../src/backend/data/db/database";
import chalk from "chalk";
import ora from "ora";
import applyMigrations from "../src/backend/data/db/applyMigrations";

const spinner = ora("Applying migrations").start();

await applyMigrations(db);

spinner.succeed(chalk.green`Finished applying migrations`);
