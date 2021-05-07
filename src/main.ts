import { Client, Collection, Command } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "../.env" });

const client = new Client();
let commands: Collection<string, Command> = new Collection();

const commandFiles = fs.readdirSync("./commands").filter((d) => d.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on("message", async (msg) => {
    if (msg.author.bot || !msg.cleanContent.startsWith(process.env.PREFIX!)) return;

    const args = msg.cleanContent.slice(process.env.PREFIX!.length).split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (!commands.has(command!)) return;

    try {
        commands.get(command!)?.execute(msg, args);
    } catch (err) {
        console.log(err);
        msg.channel.send("something went wrong");
    }
});

client.login(process.env.TOKEN);
