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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={0} sx={{ height: '100vh' }}>
      <Grid item xs={12} lg={2.5} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation active="communities" theme={theme} />
      </Grid>

      <Grid item xs={12} lg={9.5} sx={{ height: '100vh', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Community Chat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connect with other reporters and news channels
            </Typography>
          </Box>

          <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
            {/* Chat List */}
            <Grid item xs={12} md={4} sx={{ 
              borderRight: 1, 
              borderColor: 'divider',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <TextField
                  fullWidth
                  placeholder="Search chats..."
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <List sx={{ flexGrow: 1, overflow: 'auto', pt: 0 }}>
                {chatList.map((chat) => (
                  <ListItem 
                    key={chat.id}
                    button
                    selected={selectedChat === chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    sx={{ 
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&.Mui-selected': {
                        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: chat.online ? 'success.main' : 'grey.500',
                            width: 12,
                            height: 12,
                            borderRadius: '50%'
                          }
                        }}
                      >
                        <Avatar src={chat.avatar} alt={chat.name} />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={chat.name}
                      secondary={chat.lastMessage}
                      primaryTypographyProps={{
                        fontWeight: chat.unread > 0 ? 'bold' : 'normal'
                      }}
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontWeight: chat.unread > 0 ? 'bold' : 'normal'
                      }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                        {chat.time}
                      </Typography>
                      {chat.unread > 0 && (
                        <Badge badgeContent={chat.unread} color="primary" />
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Fab 
                  size="small" 
                  color="primary" 
                  onClick={() => setShowNewChatDialog(true)}
                  sx={{ boxShadow: 2 }}
                >
                  <AddIcon />
                </Fab>
              </Box>
            </Grid>

            {/* Chat Messages */}
            <Grid item xs={12} md={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: chatList.find(c => c.id === selectedChat)?.online ? 'success.main' : 'grey.500',
                            width: 12,
                            height: 12,
                            borderRadius: '50%'
                          }
                        }}
                      >
                        <Avatar 
                          src={chatList.find(c => c.id === selectedChat)?.avatar} 
                          alt={chatList.find(c => c.id === selectedChat)?.name}
                        />
                      </Badge>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {chatList.find(c => c.id === selectedChat)?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {chatList.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Mute Notifications</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Clear Chat</MenuItem>
                    </Menu>
                  </Box>

                  {/* Messages */}
                  <Box sx={{ 
                    flexGrow: 1, 
                    overflow: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
                  }}>
                    {chatMessages[selectedChat].map((msg) => (
                      <Box
                        key={msg.id}
                        sx={{
                          display: 'flex',
                          justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            maxWidth: '70%',
                            borderRadius: 2,
                            bgcolor: msg.sender === 'me' 
                              ? 'primary.main' 
                              : theme === 'dark' ? 'grey.800' : 'grey.100',
                            color: msg.sender === 'me' ? 'white' : 'text.primary'
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            alignItems: 'center',
                            mt: 0.5,
                            gap: 0.5 
                          }}>
                            <Typography variant="caption" color={msg.sender === 'me' ? 'white' : 'text.secondary'}>
                              {msg.time}
                            </Typography>
                            {msg.sender === 'me' && getMessageStatusIcon('read')}
                          </Box>
                        </Paper>
                      </Box>
                    ))}
                    <div ref={messagesEndRef} />
                  </Box>

                  {/* Message Input */}
                  <Box sx={{ 
                    p: 2, 
                    borderTop: 1, 
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Tooltip title="Attach Files">
                      <IconButton color="primary">
                        <AttachFileIcon />
                      </IconButton>
                    </Tooltip>
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      variant="outlined"
                      size="small"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Tooltip title="Emoji">
                      <IconButton color="primary">
                        <EmojiEmotionsIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton 
                      color="primary" 
                      disabled={!newMessage.trim() || sending}
                      onClick={handleSendMessage}
                    >
                      {sending ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '100%',
                  p: 3,
                  textAlign: 'center'
                }}>
                  <img 
                    src="/chat-placeholder.svg" 
                    alt="Select a chat"
                    style={{ 
                      width: '200px', 
                      marginBottom: '24px',
                      opacity: 0.7
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Welcome to Community Chat
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                    Select a chat from the list to start messaging, or create a new chat with the + button.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Community; 