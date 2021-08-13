import { ChatInputApplicationCommandData, ApplicationCommandPermissionData, CommandInteraction } from "discord.js";
export interface Command extends ChatInputApplicationCommandData {
    ownerOnly?: boolean;
    permissions?: ApplicationCommandPermissionData[];
    exec(interaction: CommandInteraction): Promise<void>;
}
