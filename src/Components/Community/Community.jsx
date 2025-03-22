import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  Badge,
  useTheme,
  useMediaQuery,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import { getChatThreads, getChatMessages, sendMessage, markMessagesAsRead } from '../../utils/chatAPI';
import { getReporterById, getChannelMemberById } from '../../utils/api';
import Navigation from '../Navigation/Navigation';

// Common emojis
const EMOJI_LIST = [
  '😊', '😂', '😍', '👍', '👋', '🎉', '❤️', '🔥', '👏', '🙏',
  '😎', '🤔', '😢', '😭', '😡', '😱', '🤣', '😴', '🥳', '🤩',
  '👌', '✌️', '🤞', '🤝', '👊', '✅', '⭐', '🌟', '💯', '🙌'
];

const Community = ({ theme }) => {
  const [chatThreads, setChatThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
=======
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
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
  const messagesEndRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

<<<<<<< HEAD
=======
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

>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
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
<<<<<<< HEAD
    if (selectedThread) {
      fetchMessages();
      markMessagesAsRead(selectedThread.id, currentUser.id);
    }
  }, [selectedThread]);
=======
    if (selectedChat) {
      fetchMessages();
      markMessagesAsRead(selectedChat, currentUser.id);
    }
  }, [selectedChat]);
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e

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
<<<<<<< HEAD
      const messages = await getChatMessages(selectedThread.id);
=======
      const messages = await getChatMessages(selectedChat);
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
<<<<<<< HEAD
    if ((!newMessage.trim() && !selectedFile) || !selectedThread) return;

    setSending(true);
    try {
      const otherParticipant = selectedThread.participants.find(p => p.id !== currentUser.id);
      let messageContent = newMessage;
      
      // If there's a file, create a message with the file
      if (selectedFile) {
        const fileUrl = URL.createObjectURL(selectedFile);
        messageContent = {
          type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
          content: fileUrl,
          fileName: selectedFile.name,
          fileSize: selectedFile.size
        };
      }

      const message = await sendMessage(currentUser.id, otherParticipant.id, messageContent);
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setSelectedFile(null);
      
      // Update chat threads with new message
      setChatThreads(prev => prev.map(thread => 
        thread.id === selectedThread.id
          ? {
              ...thread,
              lastMessage: typeof messageContent === 'string' ? messageContent : `Sent ${selectedFile.type.startsWith('image/') ? 'an image' : 'a file'}`,
=======
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
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
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

<<<<<<< HEAD
  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setEmojiAnchorEl(null);
  };

  const handleEmojiButtonClick = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiMenuClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUploadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFileUploadClose = () => {
    setAnchorEl(null);
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
    handleFileUploadClose();
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
    handleFileUploadClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

=======
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

<<<<<<< HEAD
  const renderMessageContent = (message) => {
    if (typeof message.content === 'object') {
      if (message.content.type === 'image') {
        return (
          <Box>
            <img 
              src={message.content.content} 
              alt="Shared" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} 
            />
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              {message.content.fileName}
            </Typography>
          </Box>
        );
      } else {
        return (
          <Box>
            <a 
              href={message.content.content} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <Typography variant="body1">
                📎 {message.content.fileName}
              </Typography>
            </a>
            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
              {(message.content.fileSize / 1024).toFixed(2)} KB
            </Typography>
          </Box>
        );
      }
    }
    return <Typography variant="body1">{message.content}</Typography>;
=======
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
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
<<<<<<< HEAD
    <Grid container xs={12} className={`px-5 lg:px-36 justify-between ${theme}`}>
      {/* Navigation Section */}
      <Grid item xs={0} lg={2.5} className="hidden lg:block w-full relative">
        <Navigation theme={theme} />
      </Grid>

      {/* Chat Section */}
      <Grid item xs={12} lg={9.5} className="w-full relative">
        <Paper elevation={3} sx={{ height: 'calc(100vh - 100px)', display: 'flex', overflow: 'hidden' }}>
          {/* Chat Threads List */}
          <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', overflow: 'auto' }}>
            <List>
              {chatThreads.map((thread) => (
                <React.Fragment key={thread.id}>
                  <ListItem
                    button
                    selected={selectedThread?.id === thread.id}
                    onClick={() => setSelectedThread(thread)}
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
          </Box>

          {/* Chat Messages Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedThread ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {selectedThread.participantDetails?.name}
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
                        {renderMessageContent(message)}
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
                    <Grid item>
                      <Tooltip title="Add emoji">
                        <IconButton
                          onClick={handleEmojiButtonClick}
                          color="primary"
                        >
                          <EmojiEmotionsIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Attach file">
                        <IconButton
                          onClick={handleFileUploadClick}
                          color="primary"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Send image">
                        <IconButton
                          onClick={handleImageUpload}
                          color="primary"
                        >
                          <ImageIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
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
                        disabled={(!newMessage.trim() && !selectedFile) || sending}
                      >
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>

                  {/* Custom Emoji Picker Menu */}
                  <Menu
                    anchorEl={emojiAnchorEl}
                    open={Boolean(emojiAnchorEl)}
                    onClose={handleEmojiMenuClose}
                    PaperProps={{
                      sx: {
                        maxHeight: 300,
                        width: 280,
                      },
                    }}
                  >
                    <Box sx={{ p: 1 }}>
                      <Grid container spacing={1}>
                        {EMOJI_LIST.map((emoji, index) => (
                          <Grid item key={index}>
                            <IconButton
                              onClick={() => handleEmojiClick(emoji)}
                              sx={{ fontSize: '1.5rem', padding: '8px' }}
                            >
                              {emoji}
                            </IconButton>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Menu>

                  {/* File Upload Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleFileUploadClose}
                  >
                    <MenuItem onClick={handleImageUpload}>
                      <ImageIcon sx={{ mr: 1 }} /> Send Image
                    </MenuItem>
                    <MenuItem onClick={handleFileUpload}>
                      <AttachFileIcon sx={{ mr: 1 }} /> Send File
                    </MenuItem>
                  </Menu>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />

                  {/* Selected file preview */}
                  {selectedFile && (
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        Selected: {selectedFile.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setSelectedFile(null)}
                        sx={{ ml: 'auto' }}
                      >
                        ×
                      </IconButton>
                    </Box>
                  )}
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
          </Box>
        </Paper>
      </Grid>
    </Grid>
=======
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
>>>>>>> e2f698f08add8842de45a8b997d24bd25067372e
  );
};

export default Community; 