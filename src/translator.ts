import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Translates the i18n JSON file to specified target languages using OpenAI.
 * @param dir Directory containing the i18n files.
 * @param source Filename of the source i18n JSON file, e.g., "en.json".
 * @param targetLanguages Array of target language codes, e.g., ["pt", "ar"].
 */
export async function translate(
  dir: string,
  source: string,
  targetLanguages: string[]
): Promise<void> {
  const sourceFilePath = path.join(dir, `${source}.json`);

  console.log();
  console.log(`Current working directory: ${process.cwd()}`);
  console.log(`Specified Directory: ${dir}`);
  console.log(`Source file path: ${sourceFilePath}`);
  console.log(`Target languages: ${targetLanguages.join(", ")}`);
  console.log();

  try {
    const content = await fs.readFile(sourceFilePath, { encoding: "utf8" });

    for (const lang of targetLanguages) {
      console.log();
      console.log(`Translating to ${lang}`);
      const translatedContent = await translateWithOpenAI(content, lang);
      const targetFilePath = path.join(dir, `${lang}.json`);
      await fs.writeFile(targetFilePath, translatedContent, {
        encoding: "utf8",
      });
      console.log(`File translated and saved to ${targetFilePath}`);
      console.log();
    }
  } catch (error) {
    throw new Error(
      `Failed to translate file: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

/**
 * Uses OpenAI to translate content to the target language.
 * @param content Content of the source file.
 * @param targetLang Target language code.
 */
async function translateWithOpenAI(
  content: string,
  targetLang: string
): Promise<string> {
  const prompt = `Translate the following JSON object (ONLY TRANSLATE THE VALUES, DO NOT CHANGE THE KEYS!) to ${targetLang} in JSON format:\n\n${content}`;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful translation assistant. Make sure to keep all the JSON object keys the exact same.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
  });

  const responseContent = completion.choices[0].message.content;

  // Null check. The response should be a string.
  if (typeof responseContent !== "string") {
    console.log();
    console.error("While translating to", targetLang);
    console.error("Invalid response from OpenAI:", responseContent);
    console.log();
    return "";
  }

  return responseContent;
}
