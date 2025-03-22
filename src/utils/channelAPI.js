import { USER_ROLES } from '../models/userRoles';

// Mock data for channels
const mockChannels = [
  {
    id: 'ch1',
    name: 'Entertainment Channel',
    description: 'All about movies, TV shows, and celebrity news',
    owner: 'user3',
    reporters: ['user5', 'user6', 'user7'],
    articles: ['article1', 'article2', 'article5'],
    createdAt: new Date('2023-01-15').toISOString(),
    updatedAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: 'ch2',
    name: 'Sports Channel',
    description: 'Latest sports news and updates',
    owner: 'user4',
    reporters: ['user8', 'user9'],
    articles: ['article3', 'article4'],
    createdAt: new Date('2023-02-10').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
  },
  {
    id: 'ch3',
    name: 'Technology News',
    description: 'Updates on the latest in technology and gadgets',
    owner: 'user3',
    reporters: ['user7', 'user10'],
    articles: ['article6', 'article7'],
    createdAt: new Date('2023-03-05').toISOString(),
    updatedAt: new Date('2024-02-20').toISOString(),
  }
];

// Mock data for reporters
const mockReporters = [
  {
    id: 'user5',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Entertainment reporter with 5 years of experience',
    profilePic: 'https://randomuser.me/api/portraits/women/65.jpg',
    channels: ['ch1'],
  },
  {
    id: 'user6',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Celebrity news specialist',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    channels: ['ch1'],
  },
  {
    id: 'user7',
    name: 'Sarah Lee',
    email: 'sarah.lee@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Technology and entertainment reporter',
    profilePic: 'https://randomuser.me/api/portraits/women/33.jpg',
    channels: ['ch1', 'ch3'],
  },
  {
    id: 'user8',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Sports analyst with focus on football',
    profilePic: 'https://randomuser.me/api/portraits/men/86.jpg',
    channels: ['ch2'],
  },
  {
    id: 'user9',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Sports reporter specializing in Olympic coverage',
    profilePic: 'https://randomuser.me/api/portraits/women/27.jpg',
    channels: ['ch2'],
  },
  {
    id: 'user10',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    role: USER_ROLES.REPORTER,
    bio: 'Technology reviewer and analyst',
    profilePic: 'https://randomuser.me/api/portraits/men/42.jpg',
    channels: ['ch3'],
  }
];

// Mock data for channel members
const mockChannelMembers = [
  {
    id: 'user3',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    role: USER_ROLES.CHANNEL_MEMBER,
    bio: 'Managing entertainment and technology channels',
    profilePic: 'https://randomuser.me/api/portraits/men/92.jpg',
    channels: ['ch1', 'ch3'],
  },
  {
    id: 'user4',
    name: 'Lisa Johnson',
    email: 'lisa.johnson@example.com',
    role: USER_ROLES.CHANNEL_MEMBER,
    bio: 'Sports channel manager with 10 years of experience',
    profilePic: 'https://randomuser.me/api/portraits/women/60.jpg',
    channels: ['ch2'],
  }
];

// API functions for channels
export const getAllChannels = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChannels);
    }, 300);
  });
};

export const getChannelById = async (channelId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const channel = mockChannels.find(ch => ch.id === channelId);
      if (channel) {
        resolve(channel);
      } else {
        reject(new Error('Channel not found'));
      }
    }, 300);
  });
};

export const getChannelsByMemberId = async (memberId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const channels = mockChannels.filter(ch => ch.owner === memberId);
      resolve(channels);
    }, 300);
  });
};

export const getChannelsByReporterId = async (reporterId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const channels = mockChannels.filter(ch => ch.reporters.includes(reporterId));
      resolve(channels);
    }, 300);
  });
};

// API functions for reporters
export const getAllReporters = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReporters);
    }, 300);
  });
};

export const getReporterById = async (reporterId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reporter = mockReporters.find(r => r.id === reporterId);
      if (reporter) {
        resolve(reporter);
      } else {
        reject(new Error('Reporter not found'));
      }
    }, 300);
  });
};

export const getReportersByChannelId = async (channelId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const channel = mockChannels.find(ch => ch.id === channelId);
      if (channel) {
        const reporters = mockReporters.filter(r => channel.reporters.includes(r.id));
        resolve(reporters);
      } else {
        resolve([]);
      }
    }, 300);
  });
};

// API functions for channel members
export const getAllChannelMembers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChannelMembers);
    }, 300);
  });
};

export const getChannelMemberById = async (memberId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = mockChannelMembers.find(m => m.id === memberId);
      if (member) {
        resolve(member);
      } else {
        reject(new Error('Channel member not found'));
      }
    }, 300);
  });
};

// Function to add reporter to channel
export const addReporterToChannel = async (channelId, reporterId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const channelIndex = mockChannels.findIndex(ch => ch.id === channelId);
      const reporterExists = mockReporters.some(r => r.id === reporterId);
      
      if (channelIndex === -1) {
        reject(new Error('Channel not found'));
        return;
      }
      
      if (!reporterExists) {
        reject(new Error('Reporter not found'));
        return;
      }
      
      if (mockChannels[channelIndex].reporters.includes(reporterId)) {
        reject(new Error('Reporter already in channel'));
        return;
      }
      
      // Add reporter to channel
      mockChannels[channelIndex].reporters.push(reporterId);
      mockChannels[channelIndex].updatedAt = new Date().toISOString();
      
      // Add channel to reporter
      const reporterIndex = mockReporters.findIndex(r => r.id === reporterId);
      if (reporterIndex !== -1) {
        if (!mockReporters[reporterIndex].channels.includes(channelId)) {
          mockReporters[reporterIndex].channels.push(channelId);
        }
      }
      
      resolve(mockChannels[channelIndex]);
    }, 300);
  });
};

// Function to remove reporter from channel
export const removeReporterFromChannel = async (channelId, reporterId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const channelIndex = mockChannels.findIndex(ch => ch.id === channelId);
      
      if (channelIndex === -1) {
        reject(new Error('Channel not found'));
        return;
      }
      
      if (!mockChannels[channelIndex].reporters.includes(reporterId)) {
        reject(new Error('Reporter not in channel'));
        return;
      }
      
      // Remove reporter from channel
      mockChannels[channelIndex].reporters = mockChannels[channelIndex].reporters.filter(id => id !== reporterId);
      mockChannels[channelIndex].updatedAt = new Date().toISOString();
      
      // Remove channel from reporter
      const reporterIndex = mockReporters.findIndex(r => r.id === reporterId);
      if (reporterIndex !== -1) {
        mockReporters[reporterIndex].channels = mockReporters[reporterIndex].channels.filter(id => id !== channelId);
      }
      
      resolve(mockChannels[channelIndex]);
    }, 300);
  });
}; 