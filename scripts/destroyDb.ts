import chalk from "chalk";
import ora from "ora";
import { $ } from "zx/core";

const spinner = ora("Deleting database file").start();

await $`rm data/notes.sqlite3`.quiet();

spinner.succeed(chalk.green`Finished deleting database`);
