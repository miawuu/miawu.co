import { Command } from "discord.js";

const command: Command = {
    name: "ping",
    description: "",
    execute: async (msg, args) => {
        msg.reply("pong 🏓");
    },
};
