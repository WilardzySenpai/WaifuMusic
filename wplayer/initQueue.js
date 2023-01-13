module.exports = async (client, queue) => {
    let data = client.settings.get(queue.id);
    queue.autoplay = Boolean(data.defaultautoplay);
    queue.volume = Number(data.defaultvolume);
}