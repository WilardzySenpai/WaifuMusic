![banner](https://github.com/WilardzySenpai/WaifuMusic/blob/master/Config/images/banner.png?raw=true)

<h1 align="center">🎶 WaifuMusic 🎵</h1>

# WaifuMusic
- Invite our bot directly [here.](https://discord.com/api/oauth2/authorize?client_id=1013477956905091144&permissions=3524689&scope=bot)
- Visit our bot website: [waifumusic](https://waifumusic.ml)
- Vote for WaifuMusic: https://top.gg/bot/1013477956905091144/vote

## 💨 Update 1.3.0

The bot now uses the latest version of discord.js and prefix commands are back again, added more function to it, a music channel where you can type your song and waifu will join the vc where you are in and play the music you entered. More updates information on our support server.

## 💦 Required

- Node.js v18+
- Discord.js v14
- Distube
- ffmpeg
- libsodium-wrappers

## 🔰 First step

To run this correctly on your desktop/local device, please follow these steps.

> To begin, obtain a copy of the code by either cloning it using Git or downloading the zip file.
```
git clone https://github.com/WilardzySenpai/WaifuMusic.git
```
```
https://github.com/WilardzySenpai/WaifuMusic/releases
```
To proceed, after obtaining a copy of the code through cloning or downloading and unzipping the file, open the source code and enter the following command in your console.
```
npm install
```
This command will install the necessary packages as specified in the package.json file.

## 💠 Config

With all packages now downloaded, proceed to the `config.js` file where you will be required to fill in important variables for configuration.
```js
module.exports = {

    WAIFU_TOKEN: process.env.WAIFU_TOKEN, // bot token
    OWNER_ID: "939867069070065714", // your id
    OWNER_TAG: "Hachiki#3819", // your user tag
    OWNER_LINK: "https://discord.com/users/939867069070065714", // https://discord.com/users/paste-ur-id-here
    DEV_GUILD:"1058390757297377331", // dev guild
    MONGO_DB: process.env.MONGO_DB, // database mongodb

    // spotify for distube
    // If spotify_tracks is true then you can play song from spotify more than 100+ the default is *false*
    // You can get these secret and client_id from here: https://developer.spotify.com/dashboard/applications
    WAIFU_TRACKS: parseBoolean(process.env.WAIFU_TRACKS || false),
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,

    YOUTUBE_COOKIE: process.env.YOUTUBE_COOKIE, // youtube cookie to make less lag
    
    MAIN_COLOR: "#2F3136",
    ERR_COLOR: "#ED2828",
    WAIFU_PREFIX: "w!",
    CHANNEL: "1027435338706210847"
}
```
## 💕 Running
Once the necessary variables have been entered in the config.js file, invite your bot to the server you fill in the `config.js` then, use the following command in your console to run your bot.
```
npm run start
```
If you want to start with shards run this.
```
npm run shards
```
- Congratiolations you now have a running bot and play music on vc's!

## 💫 Deploy

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/WilardzySenpai/WaifuMusic)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/WilardzySenpai/WaifuMusic)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Run on Repl.it](https://repl.it/badge/github/WilardzySenpai/WaifuMusic)](https://repl.it/github/SudhanPlayz/Discord-MusicBot)

> NOTE: It is important to note that using this code to publish a bot publicly or advertising it without proper credit is strictly prohibited.

## 🤝 Contributors
- Contribution from others is always welcome to help improve and add new features to the bot.
> While contributions to improve and add new features to the bot are welcome, it should be noted that not all submissions will be accepted into the master branch.

<a href="https://github.com/WilardzySenpai/WaifuMusic/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=WilardzySenpai/WaifuMusic" />
</a>
