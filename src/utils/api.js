// Mock data for reporters
const reporters = {
  user3: {
    id: 'user3',
    name: 'Sarah Johnson',
    role: 'reporter',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    bio: 'Entertainment reporter with 5 years of experience',
    articles: ['a1', 'a2']
  },
  user5: {
    id: 'user5',
    name: 'Michael Chen',
    role: 'reporter',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    bio: 'Movie critic and entertainment journalist',
    articles: ['a3', 'a4']
  }
};

// Mock data for channel members
const channelMembers = {
  user7: {
    id: 'user7',
    name: 'Emma Wilson',
    role: 'channel_member',
    profileImage: 'https://i.pravatar.cc/150?img=7',
    bio: 'Film enthusiast and regular contributor',
    subscriptions: ['entertainment', 'movies']
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get reporter by ID
export const getReporterById = async (reporterId) => {
  await delay(300);
  return reporters[reporterId] || null;
};

// Get channel member by ID
export const getChannelMemberById = async (memberId) => {
  await delay(300);
  return channelMembers[memberId] || null;
};

// Get user by ID (reporter or channel member)
export const getUserById = async (userId) => {
  await delay(300);
  return reporters[userId] || channelMembers[userId] || null;
}; 