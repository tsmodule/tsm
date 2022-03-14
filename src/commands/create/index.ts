/* eslint-disable no-console */
import chalk from "chalk";
import { createShell } from "await-shell";
import ora from "ora";

import { copyTemplate } from "./lib/createTemplate";
import { rewritePkgJson } from "./lib/rewritePkgJson";

// @ts-ignore - Need to add initializeShell() to await-shell.
globalThis.SHELL_OPTIONS = {
  stdio: ["ignore", "ignore", "inherit"],
};

export const create = async (name: string, { react = false }) => {
  const shell = createShell();
  const spinner = ora(`Creating new module ${chalk.blueBright(name)}.`).start();

  /**
   * Always copy default template.
   */
  await copyTemplate("default", name);

  /**
   * Copy other template files as needed.
   */
  if (react) {
    await copyTemplate("react", name);
  }

  await rewritePkgJson(name);

  spinner.succeed("Project created.");

  /**
   * Install dependencies in the created directory.
   */
  process.chdir(name);
  const dependencies = [];
  const devDependencies = ["@tsmodule/tsmodule"];

  if (!react) {
    devDependencies.push("@types/node");
  } else {
    dependencies.push("react", "react-dom");
    devDependencies.push(
      "@types/react",
      "@types/react-dom",
      "next",
      "eslint",
      "eslint-config-next",
      "tailwindcss",
      "postcss",
      "postcss-import",
      "autoprefixer",
    );
  }

  if (dependencies.length) {
    await shell.run(`yarn add ${dependencies.join(" ")}`);
  }

  if (devDependencies.length) {
    await shell.run(`yarn add -D ${devDependencies.join(" ")}`);
  }

  spinner.succeed("Dependencies installed.");

  await shell.run("git init");

  spinner.succeed("Git initialized.");
};