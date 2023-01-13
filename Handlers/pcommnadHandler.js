function loadPrefixCommand(client) {
  const fs = require('fs');
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");
  const { green, white } = require('chalk');

  const commandFolders = fs.readdirSync("./Commands");
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFiles = require(`../Commands/${folder}/${file}`);

      client.commands.set(commandFiles.name, commandFiles)
      if (commandFiles.aliases && Array.isArray(commandFiles.aliases)) {
        commandFiles.aliases.forEach(alias => {
          client.aliases.set(alias, commandFiles.name)
        })
      }
      
      table.addRow(file, "✅ Nice");
      continue;
    }
  }
  console.log(white('[') + green('INFO') + white('] ') + green(`${client.commands.size} `) + white('Prefix') + green(' Loaded!'));
}

module.exports = { loadPrefixCommand }