exports.run = (client, message) => {
    try {
        if (message.guild.id !== "517008998445350922") return message.channel.send(`> This command can only be used in the following server: https://discord.gg/Xn7B6fH.`);
        if (message.channel.id !== "649886193911332885") return message.channel.send(`> This command can only be used in <#649886193911332885>.`);
        if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send(`> I can't send you embeds because I don't have permissions to send embedded messages, <@${message.author.id}>.`);

        const Discord = require("discord.js");

        const profileEmbed = new Discord.RichEmbed()
            .setColor("#219DCD")
            .setAuthor("<@649737913537658931> Leaderboard", message.guild.iconURL)
            .setThumbnail("https://i.imgur.com/gpraYi7.png")
            //Glaze
            .addField(`1st place`, `<@${client.config.ownerID} with 10 points`, false)
            //Cris
            .addField("2nd place", `<@492847613754736650> with 13944 points`, false)

            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp();

        return message.channel.send(profileEmbed);

    } catch (e) {
        // send msg to owner
        let members = message.channel.members;
        let owner = members.find('id', client.config.ownerID);
        owner.send(`> An error occurred while <@${message.member.user.id}> tried to use a command in <#${message.channel.id}>, check console for more information.`);

        // log error
        console.log(e);

        // return confirmation
        return message.channel.send(`> An error has occurred trying to run the command, <@${message.author.id}>, please use "${client.config.prefix}report" to report the issue.`);
    };
};

module.exports.help = {
    name: null,
    description: null,
    usage: null
}; 