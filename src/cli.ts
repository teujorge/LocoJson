#!/usr/bin/env node

import { program } from "commander";
import { translate } from "./translator";

console.log();
console.log("Hi, I'm your LocoJson CLI tool!");
console.log("I can translate your i18n files to multiple languages.");
console.log("Example usage: '-d ./i18n -s en -t pt,ar'");
console.log("Example usage alt: '--dir=./i18n --source=en --targets=pt,ar'");
console.log("Use '--help' for more information.");
console.log();

program
  .name("translate")
  .description("CLI tool for translating i18n files.")
  .version("0.1.0")
  .requiredOption(
    "-d, --dir <dir>",
    "Directory containing the i18n files to translate"
  )
  .requiredOption(
    "-s, --source <source>",
    'Source language file, e.g., "en.json"'
  )
  .requiredOption(
    "-t, --targets <targets>",
    'Comma-separated list of target languages, e.g., "pt,ar"'
  )
  .action(async (options) => {
    const { dir, source, targets } = options;
    const targetLanguages = targets.split(",");
    try {
      await translate(dir, source, targetLanguages);
      console.log(
        `Translation successful: ${source} -> [${targetLanguages.join(", ")}]`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error during translation: ${error.message}`);
      } else {
        console.error(`Error during translation: ${error}`);
      }
    }
    console.log();
  });

program.parse(process.argv);
