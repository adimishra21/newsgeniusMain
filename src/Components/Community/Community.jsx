import React, { useState, useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

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
    if (selectedThread) {
      fetchMessages();
      markMessagesAsRead(selectedThread.id, currentUser.id);
    }
  }, [selectedThread]);

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
      const messages = await getChatMessages(selectedThread.id);
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
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
  );
};

export default Community; 