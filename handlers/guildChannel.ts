import { Client, GuildChannel, TextChannel } from 'discord.js';

/**
 * @handler Guild Channel Events
 * @related guildChannelUpdate
 */
export async function handleGuildChannelUpdateEvent(
    client: Client,
    oldChannel: GuildChannel,
    newChannel: GuildChannel,
) {
    let emitted = false;
    /**
     * @event guildChannelPermissionsUpdate
     * @description Emitted when channel permissions are updated.
     * @param {DJS:GuildChannel} channel The channel whose permissions have been updated.
     * @example
     * client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
     *   console.log(channel.name+"'s permissions updated!");
     * });
     */
    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
        client.emit(
            'guildChannelPermissionsUpdate',
            newChannel,
            oldChannel.permissionOverwrites,
            newChannel.permissionOverwrites,
        );
        emitted = true;
    }

    /**
     * @event guildChannelTopicUpdate
     * @description Emitted when a channel topic changes.
     * @param {DJS:GuildChannel} channel The channel whose topic have been updated.
     * @param {string} oldTopic The old channel topic.
     * @param {string} newTopic The new channel topic.
     * @example
     * client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
     *   console.log(channel.name+"'s topic changed to " + newTopic +"!");
     * });
     */
    if (oldChannel.type === 'text' && (oldChannel as TextChannel).topic !== (newChannel as TextChannel).topic) {
        client.emit(
            'guildChannelTopicUpdate',
            newChannel,
            (oldChannel as TextChannel).topic,
            (newChannel as TextChannel).topic,
        );
        emitted = true;
    }

    /**
     * @event unhandledGuildChannelUpdate
     * @description Emitted when the guildChannelUpdate event is triggered but discord-logs didn't trigger any custom event.
     * @param {DJS:GuildChannel} oldChannel The channel before the update.
     * @param {DJS:GuildChannel} newChannel The channel after the update.
     * @example
     * client.on("unhandledGuildChannelUpdate", (oldChannel, newChannel) => {
     *   console.log("Channel '"+oldChannel.id+"' was edited but discord-logs couldn't find what was updated...");
     * });
     */
    if (!emitted) {
        client.emit('unhandledGuildChannelUpdate', oldChannel, newChannel);
    }
}
