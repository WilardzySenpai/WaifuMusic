const { EmbedBuilder, Collection, PermissionsBitField } = require("discord.js");

function check_if_dj(client, member, song) {
  if (!client) return false;
  var roleid = client.settings.get(member.guild.id, `djroles`)
  if (String(roleid) == "") return false;

  var isdj = false;

  for (let i = 0; i < roleid.length; i++) {
    if (!member.guild.roles.cache.get(roleid[i])) continue;
    if (member.roles.cache.has(roleid[i])) isdj = true;
  }

  if (!isdj && !member.permissions.has(PermissionsBitField.Flags.Administrator) && song.user.id != member.id)
    return roleid.map(i => `<@&${i}>`).join(", ");
  else
    return false;
}

module.exports = {
  check_if_dj
}