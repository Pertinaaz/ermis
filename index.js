const { ShardingManager } = require('discord.js');
const colors = require('colors');
const config = require('./config.js')

const AuthToken = config.Client.TOKEN

const manager = new ShardingManager('./bot.js', { token: AuthToken });

manager.on( 'shardCreate', shard => console.log( `[MANAGER] Successfully launched shard ${shard.id}!`.black ) );

manager.spawn();