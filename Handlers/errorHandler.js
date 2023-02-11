function loadError(client) {
    const { EmbedBuilder, WebhookClient } = require("discord.js");
    const chalk = require("chalk");
    const ee = require('../Config/embed.json');
    const weblog = require('../Config/webhook.json');
    const wbc = new WebhookClient({
        id: weblog.error.id,
        token: weblog.error.token,
    });
    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green('Error Handler') + chalk.white(' Loaded!'));

    process.on("beforeExit", (code) => {
        console.log(chalk.yellow.dim("[AntiCrash] | [BeforeExit_Logs] | [Start] : ==============="));
        console.log(code);
        console.log(chalk.yellow("[AntiCrash] | [BeforeExit_Logs] | [End] : ==============="));
        wbc.send(`${code}`)
    });
    process.on("exit", (error) => {
        // If You Want You Can Use
        console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [Start]  : ==============="));
        console.log(error);
        console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [End] : ==============="));
        wbc.send(`${error}`)
    });
    process.on("unhandledRejection", async (reason, promise) => {
        // Needed
        console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [start] : ==============="));
        console.log(reason);
        console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [end] : ==============="));
        wbc.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.important.ERR_COLOR)
                    .setTitle(`An Error Occured:`)
                    .setDescription(`\`\`\`${reason}\`\`\``)
                    .setTimestamp()
            ]
        })
    });
    process.on("rejectionHandled", (promise) => {
        // If You Want You Can Use
        console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ==============="));
        console.log(promise);
        console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [End] : ==============="));
        wbc.send(`${promise}`);
    });
    process.on("uncaughtException", (err, origin) => {
        // Needed
        console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [Start] : ==============="));
        console.log(err);
        console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [End] : ==============="));
        wbc.send(`${err}, ${origin}`);
    });
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        // Needed
        console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [Start] : ==============="));
        console.log(err);
        console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [End] : ==============="));
        wbc.send(`${err}, ${origin}`);
    });
    process.on("warning", (warning) => {
        // If You Want You Can Use
        console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [Start] : ==============="));
        console.log(warning);
        console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [End] : ==============="));
        wbc.send(`${warning}`);
    });
}

module.exports = { loadError }