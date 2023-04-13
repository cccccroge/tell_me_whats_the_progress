// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { exec } = require('child_process');
const { clearInterval } = require('timers');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// test channel
let textChannel;

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    client.channels.fetch('351381396557922307').then(channel => {
        textChannel = channel;
    })
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else if (commandName === 'tell_me_whats_the_progress') {
        let interval;
        let counter = 0;
        interval = setInterval(() => {
            client.emit('reportTheImage');
            counter += 1;
            if (counter > 5) {
                clearInterval(c);
            }
        }, 5000);
        interaction.replay('I will tell you whats the progress');
    }
});

client.on('reportTheImage', async () => {
    const cmd = 'gnome-screenshot -f ./test.png';
    exec(cmd, (error, stdout, stderr) => {});
    textChannel.send({ files: ['test.png'] });
    const abc = '123';
});


// Login to Discord with your client's token
client.login(token);
