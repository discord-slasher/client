import { MessageApplicationCommandData, ChatInputApplicationCommandData, CommandInteraction, ContextMenuInteraction, UserApplicationCommandData } from "discord.js";
interface MContextCommand extends MessageApplicationCommandData {
    exec(interaction: ContextMenuInteraction): Promise<void>;
}
interface UContextCommand extends UserApplicationCommandData {
    exec(interaction: ContextMenuInteraction): Promise<void>;
}
export interface SlashCommand extends ChatInputApplicationCommandData {
    exec(interaction: CommandInteraction): Promise<void>;
}
export declare type CTXCommand = MContextCommand | UContextCommand;
export {};
