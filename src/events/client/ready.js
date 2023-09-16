module.exports = {
    name: "ready",
    once: true,
    async execute(client){
        console.log(`${client.user.username} has logged in successfully. ID: ${client.user.id}`);
    }
}