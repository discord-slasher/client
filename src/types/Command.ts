import { MessageApplicationCommandData ,ChatInputApplicationCommandData, ApplicationCommandPermissionData, CommandInteraction, ContextMenuInteraction } from "discord.js";

interface SlashCommand extends ChatInputApplicationCommandData {
    ownerOnly?: boolean;
    permissions?: ApplicationCommandPermissionData[];
    exec(interaction: CommandInteraction): Promise<void>;
}

interface MessageContextMenu extends MessageApplicationCommandData {
    ownerOnly?: boolean;
    permissions?: ApplicationCommandPermissionData[];
    exec(interaction: ContextMenuInteraction): Promise<void>;
}

export type Command = SlashCommand | MessageContextMenu