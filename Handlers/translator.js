const fs = require('fs');

let Translator = require('../../Util/translator');
Translator = new Translator()

module.exports = {
    name: 'messageCreate',
    execute: async (message, client) => {
        if (!message.content.startsWith(client.config.prefix) || message.author.bot) {

            const savedData = JSON.parse(fs.readFileSync("./databases/storage/database.json", "utf8"))
            if (!savedData[message.author.id]) return;
            const translation = await Translator.autoTranslate(message, { from: savedData[message.author.id], to: client.config.base_lang });
            if (translation) return message.channel.send(translation)
        }
    }
}