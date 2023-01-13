function loadslashCommands(client) {
  const ascii = require("ascii-table");
  const { PermissionsBitField } = require('discord.js');
  const fs = require("fs");
  const table = new ascii().setHeading("slashCommands", "Status");
  const { green, white } = require('chalk');

  let slashCommandsArray = [];
  let developerArray = [];

  const slashCommandsFolders = fs.readdirSync("./slashCommands");
  for (const folder of slashCommandsFolders) {
    const slashCommandFiles = fs
      .readdirSync(`./slashCommands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of slashCommandFiles) {
      const slashCommandFile = require(`../slashCommands/${folder}/${file}`);

      // client.slashCommands.set(slashCommandFile.name, slashCommandFile);

      if (slashCommandFile.developer) developerArray.push({
        name: slashCommandFile.name,
        description: slashCommandFile.description,
        type: slashCommandFile.type,
        options: slashCommandFile.options ? slashCommandFile.options : null,
        default_permission: slashCommandFile.default_permission ? slashCommandFile.default_permission : null,
        default_member_permissions: slashCommandFile.default_member_permissions ? PermissionsBitField.resolve(slashCommandFile.default_member_permissions).toString() : null
      })
      else slashCommandsArray.push({
        name: slashCommandFile.name,
        description: slashCommandFile.description,
        type: slashCommandFile.type,
        options: slashCommandFile.options ? slashCommandFile.options : null,
        default_permission: slashCommandFile.default_permission ? slashCommandFile.default_permission : null,
        default_member_permissions: slashCommandFile.default_member_permissions ? PermissionsBitField.resolve(slashCommandFile.default_member_permissions).toString() : null
      })

      if (slashCommandFile.name) {
        client.slashCommands.set(slashCommandFile.name, slashCommandFile)
        table.addRow(file.split('.js')[0], '✅ Success')
      } else {
        table.addRow(file.split('.js')[0], '⛔ Error')
      }
    }
  }

  client.application.commands.set(slashCommandsArray);

  const devGuildID = client.guilds.cache.get(client.important.DEV_GUILD)
  devGuildID.commands.set(developerArray)

  console.log(white('[') + green('INFO') + white('] ') + green(`${client.slashCommands.size} `) + white('Interactions') + green(' Loaded!'));
}

module.exports = { loadslashCommands }

