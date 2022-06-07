const {MessageEmbed, WebhookClient} = require("discord.js")
const MAX_MESSAGE_LENGTH = 40

module.exports.send = (id, token, repo, branch, url, commits, size) =>
    new Promise((resolve, reject) => {
        let client
        console.log('Preparing Webhook...')
        try {
            client = new WebhookClient({id: id, token: token})
        } catch (error) {
            console.log('Error creating Webhook')
            reject(error.message)
            return
        }

        client.send({embeds: [createEmbed(repo, branch, url, commits, size)]}).then(() => {
            console.log('Successfully sent the message!')
            resolve()
        }, reject)
    })

function createEmbed(repo, branch, url, commits, size) {
    console.log('Constructing Embed...')
    const latest = commits[0]
    console.log(latest)
    return new MessageEmbed()
        .setColor(0x00bb22)
        //.setTitle(size + (size == 1 ? " Commit was " : " Commits were ") + "added to " + repo + " (" + branch + ")")
        .setAuthor({
            name: `${size} ${size === 1 ? 'commit was' : 'commits were'} pushed by ${latest.author.username}`,
            iconURL: `https://github.com/${latest.author.username}.png?size=32`,
        })
        .setDescription(`${getChangeLog(commits, size)}`)
        .addField('Repository', `[${url}]`, true)
        .addField('Branch', branch, true)
        .setTimestamp(Date.parse(latest.timestamp))
}


function getChangeLog(commits, size) {
    let changelog = ''
    for (const i in commits) {
        if (i > 7) {
            changelog += `+ ${size - i} more...\n`
            break
        }

        const commit = commits[i]
        const sha = commit.id.substring(0, 6)
        const message =
            commit.message.length > MAX_MESSAGE_LENGTH
                ? commit.message.substring(0, MAX_MESSAGE_LENGTH) + '...'
                : commit.message
        changelog += `[\`${sha}\`](${commit.url}) — ${message}\n`
    }

    return changelog
}
