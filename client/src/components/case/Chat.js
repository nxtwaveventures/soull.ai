import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import io from 'socket.io-client';

// This would be configured to your server's address
const socket = io('http://localhost:5000');

const Chat = ({ caseId, userId }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('joinCase', caseId);

        socket.on('previousMessages', (msgs) => {
            setMessages(msgs);
        });

        socket.on('newMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('previousMessages');
            socket.off('newMessage');
        };
    }, [caseId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', { caseId, sender: userId, content: message });
            setMessage('');
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Case Discussion</Typography>
            <Box sx={{ height: 300, border: '1px solid #ccc', borderRadius: 1, p: 2, overflowY: 'auto' }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={msg.content} secondary={msg.sender.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', mt: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
