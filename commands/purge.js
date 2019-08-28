exports.run = (client, message, args) => {
    if (message.author.id !== client.config.ownerID && message.author.id !== client.config.subOwnerID) {
        return message.channel.send(client.config.lackPerms)
    }
    var numberOfMessages = message.content.slice(7);
    if (isNaN(numberOfMessages)) {
        return message.channel.send(`Sorry, but "${numberOfMessages}" is not a number, please specify an amount of messages that should be deleted.`);
    }
    if (numberOfMessages > 100) {
        return message.channel.send(`Sorry, but Discord does not allow more than 100 messages to be deleted at once.`);
    }
    let messageCount = parseInt(numberOfMessages);
    message.channel.fetchMessages({ limit: messageCount })
        .then(messages => message.channel.bulkDelete(messages))
        .then(message.channel.send(`${numberOfMessages} messages have been deleted.`));
};

module.exports.help = {
    name: "Purge",
    description: "Deletes the specified amount of messages.",
    usage: `purge [number]`
};