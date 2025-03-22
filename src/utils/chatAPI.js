// Mock data for chat messages
const messages = {
  m1: {
    id: 'm1',
    senderId: 'user3',
    receiverId: 'user5',
    content: 'Hey, I saw your article about the new movie release. Great work!',
    timestamp: '2024-03-20T10:30:00Z',
    read: false
  },
  m2: {
    id: 'm2',
    senderId: 'user5',
    receiverId: 'user3',
    content: 'Thank you! I\'m still working on the follow-up piece.',
    timestamp: '2024-03-20T10:35:00Z',
    read: true
  },
  m3: {
    id: 'm3',
    senderId: 'user3',
    receiverId: 'user5',
    content: 'Looking forward to reading it!',
    timestamp: '2024-03-20T10:40:00Z',
    read: false
  }
};

// Mock data for chat threads
const threads = {
  t1: {
    id: 't1',
    participants: [
      { id: 'user3', role: 'reporter' },
      { id: 'user5', role: 'reporter' }
    ],
    lastMessage: 'Looking forward to reading it!',
    lastMessageTime: '2024-03-20T10:40:00Z',
    unreadCount: 1
  },
  t2: {
    id: 't2',
    participants: [
      { id: 'user5', role: 'reporter' },
      { id: 'user7', role: 'channel_member' }
    ],
    lastMessage: 'When is the next article coming out?',
    lastMessageTime: '2024-03-19T15:20:00Z',
    unreadCount: 0
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get chat threads for a user
export const getChatThreads = async (userId) => {
  await delay(500); // Simulate network delay
  return Object.values(threads).filter(thread => 
    thread.participants.some(p => p.id === userId)
  );
};

// Get messages for a specific chat thread
export const getChatMessages = async (threadId) => {
  await delay(300);
  return Object.values(messages)
    .filter(msg => {
      const thread = threads[threadId];
      return thread.participants.some(p => p.id === msg.senderId) &&
             thread.participants.some(p => p.id === msg.receiverId);
    })
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

// Send a new message
export const sendMessage = async (senderId, receiverId, content) => {
  await delay(500);
  const newMessage = {
    id: `m${Object.keys(messages).length + 1}`,
    senderId,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  messages[newMessage.id] = newMessage;
  
  // Update or create thread
  const threadId = Object.keys(threads).find(tid => {
    const thread = threads[tid];
    return thread.participants.some(p => p.id === senderId) &&
           thread.participants.some(p => p.id === receiverId);
  }) || `t${Object.keys(threads).length + 1}`;
  
  if (!threads[threadId]) {
    threads[threadId] = {
      id: threadId,
      participants: [
        { id: senderId, role: 'reporter' },
        { id: receiverId, role: 'reporter' }
      ],
      lastMessage: content,
      lastMessageTime: newMessage.timestamp,
      unreadCount: 1
    };
  } else {
    threads[threadId] = {
      ...threads[threadId],
      lastMessage: content,
      lastMessageTime: newMessage.timestamp,
      unreadCount: threads[threadId].unreadCount + 1
    };
  }
  
  return newMessage;
};

// Mark messages as read in a thread
export const markMessagesAsRead = async (threadId, userId) => {
  await delay(300);
  const thread = threads[threadId];
  if (!thread) return;
  
  // Mark all messages in the thread as read for this user
  Object.values(messages).forEach(msg => {
    if (msg.receiverId === userId && !msg.read) {
      msg.read = true;
    }
  });
  
  // Reset unread count
  threads[threadId] = {
    ...thread,
    unreadCount: 0
  };
}; 