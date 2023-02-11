function loadPrefixCommand(client) {
  const fs = require('fs');
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Commands", "Status");
  const chalk = require('chalk');

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
  console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green(`${client.commands.size} `) + chalk.white('Prefix') + chalk.green(' Loaded!'));
}

module.exports = { loadPrefixCommand }