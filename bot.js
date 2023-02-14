const { ask } = require('./ai.js');
const { Client, Partials, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const colors = require('colors');
const config = require('./config.js');

const AuthToken = config.Client.TOKEN
const blacklist = config.Users.BLACKLIST
const APIkey = config.Client.APIkey

const client = new Client({
    intents:
      [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent]
  });

client.login(AuthToken)
  .catch( (err) => {
        console.error(`[CRASH] Something went wrong while logging to Ermis' account!`)
        console.error(`[CRASH] Error from Discord:` + err)
  });

client.on('ready', () => {

    console.log(`[READY] Ermis is ready and up to go!`.black)
    console.log(`[LOGIN] Logged in as ${client.user.tag}!`.black);

    client.user.setPresence('online');
    console.log(`[ONLINE] Account status set to online!`.black)

    client.channels.cache.get('984880000593449043').send(`**[READY]** Ermis has been deployed to Discord! | **Guilds:** ${client.guilds.cache.size}`);

});

process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
});


client.on('messageCreate', async (message) => {

    if ( message.author.id == client.user.id ) return;
    if ( message.author.bot == true ) return;   
    if ( !message.channel ) return;

        const prompt =  message.content
        const answer = await ask(prompt)

    if ( message.content == 'e$ping' ) {

        var ping = new EmbedBuilder()
        .setDescription(`:ping_pong: **Ping:** ${client.ws.ping} ms!`);
        message.channel.send({ embeds: [ping] })
    }

    if ( message.content.toLowerCase().includes('ermis') ) {

            if ( blacklist.some( ID => message.author.id.includes(ID) ) ) return;

        message.channel.sendTyping();

        await message.reply(`${answer}`).catch( (err) => {
            console.log('Error! ' + err)
        })

        console.log(`[PROMPT]: ${message.author.tag} asked: ${message.content} in ${message.guild.name}!`.black);
        
        return;
    }

});
