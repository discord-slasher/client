"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const glob_1 = require("glob");
class default_1 extends discord_js_1.Client {
    constructor({ root, gid }) {
        super({ intents: discord_js_1.Intents.FLAGS.GUILDS });
        this.commands = new discord_js_1.Collection();
        this.rootDir = root || '';
        this.on('ready', () => {
            this.registerCommands(gid);
        });
        this.on('interactionCreate', interaction => {
            if (!interaction.isCommand())
                return;
            const cmd = this.commands.get(interaction.commandName);
            if (!cmd)
                return;
            cmd.exec(interaction);
        });
    }
    loadCommands() {
        glob_1.sync(`${this.rootDir}commands/**/*.js`, { absolute: true }).forEach(i => {
            Promise.resolve().then(() => __importStar(require(i))).then(({ default: command }) => {
                if (!command)
                    return;
                this.commands.set(command.name, command);
            });
        });
    }
    loadEvents() {
        glob_1.sync(`${this.rootDir}events/**/*.js`, { absolute: true }).forEach(i => {
            Promise.resolve().then(() => __importStar(require(i))).then(({ default: { event, exec } }) => {
                // @ts-expect-error 
                this.on(event, exec.bind(null, this));
            });
        });
    }
    async registerCommands(gid) {
        if (!this.isReady())
            throw new Error('[NOT_READY]: Client needs to logged in before you can set commands');
        const cmds = [...this.commands.values()];
        `${gid}`.toLowerCase() == 'global' ? [gid].flat().forEach(i => this.guilds.cache.get(i)?.commands.set(cmds)) : this.application.commands.set(cmds);
    }
    init(token) {
        dotenv_1.config();
        this.loadEvents();
        this.loadCommands();
        this.login(token || process.env.DISCORD_TOKEN);
        return this;
    }
}
exports.default = default_1;
__exportStar(require("./types"), exports);
