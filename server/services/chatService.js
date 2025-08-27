const Message = require('../models/Message');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinCase', async (caseId) => {
            socket.join(caseId);
            console.log(`Client joined case: ${caseId}`);

            // Send previous messages
            const messages = await Message.find({ caseId }).populate('sender', 'name');
            socket.emit('previousMessages', messages);
        });

        socket.on('sendMessage', async (data) => {
            const { caseId, sender, content } = data;
            const message = new Message({
                caseId,
                sender,
                content,
                // In a real app, recipient would be handled more dynamically
                recipient: '60c72b0f9b1d8c001f8e4d8c'
            });
            await message.save();

            const populatedMessage = await Message.findById(message._id).populate('sender', 'name');

            io.to(caseId).emit('newMessage', populatedMessage);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
