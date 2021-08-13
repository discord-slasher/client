import { Client, Intents, ApplicationCommandData, Collection } from 'discord.js'
import { config } from 'dotenv'
import { sync } from 'glob'

import type { Command, Event } from './types'

export default class extends Client {

    public commands
    public rootDir: string

    constructor({ root, gid }: { root?: string, gid: string[] | string }) {
        super({ intents: Intents.FLAGS.GUILDS })
        this.commands = new Collection<string, Command>()

        this.rootDir = root || ''

        this.on('ready', () => {
            this.registerCommands({ gid, global: `${gid}`.toLocaleLowerCase() == 'global' })
        })

        this.on('interactionCreate', interaction => {
            if(!interaction.isCommand()) return
            const cmd: Command | undefined = this.commands.get(interaction.commandName)
            if(!cmd) return
            cmd.exec(interaction)
        })
    }

    loadCommands(): void {
        sync(`${this.rootDir}commands/**/*.js`, { absolute: true }).forEach(i => {
            import(i).then(({ default: command }: { default: Command }) => {
                if(!command) return
                this.commands.set(command.name, command)
            })
        })
    }

    loadEvents(): void {
        sync(`${this.rootDir}events/**/*.js`, { absolute: true }).forEach(i => {
            import(i).then(({ default: { event, exec } } : { default: Event }) => {
                // @ts-expect-error 
                this.on(event, exec.bind(null, this))
            })
        })
    }

    async registerCommands({ gid, global }: { gid: string[] | string, global?: boolean }): Promise<void> {
        if(!this.isReady()) throw new Error('[NOT_READY]: Client needs to logged in before you can set commands')

        const cmds: ApplicationCommandData[] = [...this.commands.values()];

        global ? this.application.commands.set(cmds) : [gid].flat().forEach(i=>this.guilds.cache.get(i)?.commands.set(cmds)) 
    }

    init(token?: string) {

        config()

        this.loadEvents()
        this.loadCommands()
        this.login(token || process.env.DISCORD_TOKEN)
        return this
    }


}

export * from './types'