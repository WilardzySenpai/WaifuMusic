const { Client, GatewayIntentBits, ActivityType, Partials, Collection, WebhookClient } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages,
  MessageContent, GuildMessageReactions,
  GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;
//load our events
const { loadEvents } = require("../Handlers/eventHandler.js");
const { loadslashCommands } = require("../Handlers/commandHandler.js");
const { loadPrefixCommand } = require("../Handlers/pcommnadHandler.js");
const { loadError } = require("../Handlers/errorHandler.js");
const { loadButtons } = require("../Handlers/buttonsHandler.js");
const { loadwplayer } = require("../Handlers/wplayerHandler.js");
const { loadDatabase } = require("../Handlers/loadDatabase.js");
const { loadPlayer } = require("../Handlers/loadPlayer.js");
const { loadUpdate } = require("../Handlers/loadUpdate.js");
const { readdirSync } = require('fs');
const Enmap = require('enmap');

const chalk = require('chalk');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DeezerPlugin } = require("@distube/deezer");
const filters = require(`../Config/filters.json`);

const client = new Client({
  shards: "auto",
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildMessageReactions, GuildVoiceStates],
  partials: [User, Message, GuildMember, ThreadMember, Reaction, Channel],
});
module.exports = client;

// client variables
client.commands = new Collection();
client.categories = readdirSync("./slashCommands/");
client.aliases = new Collection()
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.buttons = new Collection();
client.config = require("../Config/config.json");
client.important = require('./config');
client.emoji = require("../Config/emoji.json");
client.embed = require("../Config/embed.json");
client.maps = new Map();

// Loading Database
client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings" });
client.usernews = new Enmap({ name: "news", dataDir: "./databases/news" });

// load player
client.distube = new DisTube(client, {
  leaveOnEmpty: false,
  emptyCooldown: 60,
  leaveOnFinish: false,
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  nsfw: true, // make the nsfw songs possible to play!
  youtubeCookie: client.important.YOUTUBE_COOKIE,
  customFilters: filters,
  //   searchSongs: 5,
  plugins: [
    new SpotifyPlugin(),
    waifuCheckSpoti(client),
    new SoundCloudPlugin(),
    new YtDlpPlugin({ update: true }),
    new DeezerPlugin()
  ]
})

client.login(client.important.WAIFU_TOKEN).then(() => {
  // console.log(`client logged in as ${client.user.username}`);
  // client.user.setPresence({
  //   activities: [{ name: `Processing`, type: ActivityType.Playing }],
  //   status: 'idle',
  // });
  loadEvents(client);
  loadslashCommands(client);
  loadPrefixCommand(client);
  loadError(client);
  loadButtons(client);
  loadwplayer(client);
  loadDatabase(client);
  loadPlayer(client);
  loadUpdate(client);
}).catch((err) => console.log(err));

function waifuSpotiisOn(client) {
  return new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: true,
    api: {
      clientId: client.important.SPOTIFY_CLIENT_ID,
      clientSecret: client.important.SPOTIFY_SECRET,
    }
  })
}

function waifuSpotiisOff() {
  return new SpotifyPlugin({
    emitEventsAfterFetching: true,
  })
}

function waifuCheckSpoti(client) {
  if (client.important.WAIFU_TRACKS) {
    console.log(chalk.green("[") + chalk.yellow.bold("WAIFU_TRACKS") + chalk.green("]") + chalk.yellow(" You enabled the Spotify more tracks!"))
    return waifuSpotiisOn(client)
  } else {
    console.log(chalk.green("[") + chalk.yellow.bold("WAIFU_TRACKS") + chalk.green("]") + chalk.red(" You disabled the Spotify more tracks!"))
    return waifuSpotiisOff()
  }
}