import { ClientEvents } from 'discord.js'
import Client from '..'

export type Event = {
    [K in keyof ClientEvents]: {
        name: string;
        event: K;
        exec(client: Client, ...args: ClientEvents[K]): Promise<void>;
    }
}[keyof ClientEvents]