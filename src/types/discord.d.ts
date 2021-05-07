import { Message, APIMessage, Structures } from "discord.js";

declare module "discord.js" {
    interface Command {
        name: string;
        description: string;
        execute: (message: Message, args: string[]) => Promise<unknown>;
    }
}
