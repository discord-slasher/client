import { Client, Collection } from 'discord.js';
import type { Command } from './types';
export default class extends Client {
    commands: Collection<string, Command>;
    rootDir: string;
    constructor({ root, gid }: {
        root?: string;
        gid: string[] | string;
    });
    loadCommands(): void;
    loadEvents(): void;
    registerCommands({ gid, global }: {
        gid: string[] | string;
        global?: boolean;
    }): Promise<void>;
    init(token?: string): this;
}
export * from './types';
