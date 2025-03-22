import React, { useState, useEffect, useRef } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  TextField, 
  IconButton, 
  Divider, 
  Badge,
  CircularProgress,
  InputAdornment,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Fab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import Navigation from '../Navigation/Navigation';
import { getChatThreads, getChatMessages, sendMessage, markMessagesAsRead } from '../../utils/chatAPI';
import { getReporterById, getChannelMemberById } from '../../utils/api';

const Community = ({ theme }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [newChatRecipient, setNewChatRecipient] = useState('');
  const messagesEndRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const [chatThreads, setChatThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  
  const [chatList, setChatList] = useState([
    { 
      id: 1, 
      name: 'Entertainment Team', 
      avatar: '/avatar1.jpg', 
      lastMessage: 'Did you see the latest movie review?', 
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    { 
      id: 2, 
      name: 'Sports Reporters', 
      avatar: '/avatar2.jpg', 
      lastMessage: 'The match coverage looks great!', 
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: 'Technology Channel', 
      avatar: '/avatar3.jpg', 
      lastMessage: 'We need an article on the new AI developments.', 
      time: 'Monday',
      unread: 3,
      online: true
    },
    { 
      id: 4, 
      name: 'Business News', 
      avatar: '/avatar4.jpg', 
      lastMessage: 'Market trends report is ready for review.', 
      time: 'Aug 15',
      unread: 0,
      online: false
    },
    { 
      id: 5, 
      name: 'Education Writers', 
      avatar: '/avatar5.jpg', 
      lastMessage: 'University rankings article needs updates.', 
      time: 'Aug 10',
      unread: 1,
      online: true
    }
  ]);

  const [chatMessages, setChatMessages] = useState({
    1: [
      { id: 1, sender: 'other', text: 'Hey team, I need your input on the latest movie review', time: '10:15 AM' },
      { id: 2, sender: 'me', text: 'I can help with that. Which movie are we covering?', time: '10:20 AM' },
      { id: 3, sender: 'other', text: 'Avatar 3 - we need to have it ready by tomorrow', time: '10:25 AM' },
      { id: 4, sender: 'other', text: 'Did you see the latest movie review?', time: '10:30 AM' },
    ],
    2: [
      { id: 1, sender: 'other', text: 'The football match coverage needs more photos', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'I\'ll get those uploaded today', time: 'Yesterday' },
      { id: 3, sender: 'other', text: 'The match coverage looks great!', time: 'Yesterday' },
    ],
    3: [
      { id: 1, sender: 'me', text: 'I\'m working on a new AI article', time: 'Monday' },
      { id: 2, sender: 'other', text: 'Great! When can we expect it?', time: 'Monday' },
      { id: 3, sender: 'other', text: 'We need an article on the new AI developments.', time: 'Monday' },
    ],
    4: [
      { id: 1, sender: 'other', text: 'Can you review the quarterly report?', time: 'Aug 15' },
      { id: 2, sender: 'me', text: 'Yes, I\'ll do it this afternoon', time: 'Aug 15' },
      { id: 3, sender: 'other', text: 'Market trends report is ready for review.', time: 'Aug 15' },
    ],
    5: [
      { id: 1, sender: 'other', text: 'We need to update the education section', time: 'Aug 10' },
      { id: 2, sender: 'me', text: 'I\'ll start on it right away', time: 'Aug 10' },
      { id: 3, sender: 'other', text: 'University rankings article needs updates.', time: 'Aug 10' },
    ]
  });

  // Mock current user for demonstration
  const currentUser = {
    id: 'user5',
    name: 'John Doe',
    role: 'reporter'
  };

  useEffect(() => {
    fetchChatThreads();
  }, [currentUser.id]);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      markMessagesAsRead(selectedChat, currentUser.id);
    }
  }, [selectedChat]);

  const fetchChatThreads = async () => {
    try {
      const threads = await getChatThreads(currentUser.id);
      const threadsWithDetails = await Promise.all(
        threads.map(async (thread) => {
          const otherParticipant = thread.participants.find(p => p.id !== currentUser.id);
          const participantDetails = otherParticipant.role === 'reporter'
            ? await getReporterById(otherParticipant.id)
            : await getChannelMemberById(otherParticipant.id);
          
          return {
            ...thread,
            participantDetails
          };
        })
      );
      setChatThreads(threadsWithDetails);
    } catch (error) {
      console.error('Error fetching chat threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const messages = await getChatMessages(selectedChat);
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    setSending(true);
    try {
      const otherParticipant = chatThreads.find(t => t.id === selectedChat)?.participants.find(p => p.id !== currentUser.id);
      const message = await sendMessage(currentUser.id, otherParticipant.id, newMessage);
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Update chat threads with new message
      setChatThreads(prev => prev.map(thread => 
        thread.id === selectedChat
          ? {
              ...thread,
              lastMessage: message.content,
              lastMessageTime: message.timestamp,
              unreadCount: 0
            }
          : thread
      ));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    
    // Mark as read when selected
    setChatList(chatList.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          unread: 0
        };
      }
      return chat;
    }));
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const createNewChat = () => {
    if (!newChatRecipient.trim()) return;
    
    const newChatId = Math.max(...chatList.map(chat => chat.id)) + 1;
    
    const newChat = {
      id: newChatId,
      name: newChatRecipient,
      avatar: '',
      lastMessage: 'Start a conversation',
      time: 'Just now',
      unread: 0,
      online: false
    };
    
    setChatList([newChat, ...chatList]);
    setChatMessages({
      ...chatMessages,
      [newChatId]: []
    });
    
    setNewChatRecipient('');
    setShowNewChatDialog(false);
    setSelectedChat(newChatId);
  };
  
  // Filter chats based on search query
  const filteredChats = searchQuery 
    ? chatList.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatList;
  
  const getMessageStatusIcon = (status) => {
    switch(status) {
      case 'sent':
        return <CheckIcon fontSize="small" sx={{ opacity: 0.5 }} />;
      case 'delivered':
        return <DoneAllIcon fontSize="small" sx={{ opacity: 0.5 }} />;
      case 'read':
        return <DoneAllIcon fontSize="small" color="primary" />;
      default:
        return null;
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Chat Threads List */}
        <Grid item xs={12} md={4} sx={{ borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
          <List>
            {chatThreads.map((thread) => (
              <React.Fragment key={thread.id}>
                <ListItem
                  button
                  selected={selectedChat === thread.id}
                  onClick={() => handleChatSelect(thread.id)}
                >
                  <ListItemAvatar>
                    <Badge
                      color="primary"
                      variant="dot"
                      invisible={thread.unreadCount === 0}
                    >
                      <Avatar src={thread.participantDetails?.profileImage}>
                        {thread.participantDetails?.name?.[0]}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={thread.participantDetails?.name}
                    secondary={
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      >
                        {thread.lastMessage}
                      </Typography>
                    }
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatMessageTime(thread.lastMessageTime)}
                  </Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>

        {/* Chat Messages Area */}
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  {chatThreads.find(t => t.id === selectedChat)?.participantDetails?.name}
                </Typography>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.senderId === currentUser.id ? 'flex-end' : 'flex-start',
                      mb: 1
                    }}
                  >
                    <Paper
                      sx={{
                        p: 1.5,
                        maxWidth: '70%',
                        backgroundColor: message.senderId === currentUser.id
                          ? 'primary.main'
                          : 'background.paper',
                        color: message.senderId === currentUser.id
                          ? 'primary.contrastText'
                          : 'text.primary'
                      }}
                    >
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          textAlign: 'right',
                          mt: 0.5,
                          opacity: 0.7
                        }}
                      >
                        {formatMessageTime(message.timestamp)}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={sending}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sending}
                    >
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start chatting
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Community; 