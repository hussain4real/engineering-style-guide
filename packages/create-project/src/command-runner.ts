import { spawn } from "node:child_process";
import type { CommandRunner, CommandSpec, Logger } from "./types.js";

export class LocalCommandRunner implements CommandRunner {
  constructor(private readonly logger: Logger) {}

  run(command: CommandSpec): Promise<void> {
    this.logger.info(`Running ${command.description}`);

    return new Promise((resolve, reject) => {
      const child = spawn(command.command, command.args, {
        cwd: command.cwd,
        stdio: "inherit",
        shell: false
      });

      child.on("error", reject);
      child.on("exit", (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(
          new Error(
            `${command.description} failed with exit code ${code ?? "unknown"}: ${command.command} ${command.args.join(" ")}`
          )
        );
      });
    });
  }
}

export class RecordingCommandRunner implements CommandRunner {
  readonly commands: CommandSpec[] = [];

  async run(command: CommandSpec): Promise<void> {
    this.commands.push(command);
  }
}

export const consoleLogger: Logger = {
  info(message: string) {
    console.log(message);
  },
  warn(message: string) {
    console.warn(message);
  }
};
