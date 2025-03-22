// User role constants
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  REPORTER: 'reporter',
  CHANNEL_MEMBER: 'channel_member',
  USER: 'user',
};

// Role permissions
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canManageUsers: true,
    canPublishArticles: true,
    canEditAllArticles: true,
    canDeleteArticles: true,
    canManageChannels: true,
    canManageReporters: true,
    canAccessAnalytics: true,
  },
  [USER_ROLES.EDITOR]: {
    canPublishArticles: true,
    canEditAllArticles: true,
    canDeleteArticles: true,
    canManageChannels: false,
    canManageReporters: false,
    canAccessAnalytics: true,
  },
  [USER_ROLES.CHANNEL_MEMBER]: {
    canPublishArticles: false,
    canEditAllArticles: false,
    canDeleteArticles: false,
    canManageChannels: true,
    canManageReporters: true,
    canAccessAnalytics: true,
    canMonitorArticles: true,
  },
  [USER_ROLES.REPORTER]: {
    canPublishArticles: true,
    canEditAllArticles: false,
    canEditOwnArticles: true,
    canDeleteArticles: false,
    canManageChannels: false,
    canManageReporters: false,
    canAccessAnalytics: false,
  },
  [USER_ROLES.USER]: {
    canPublishArticles: false,
    canEditAllArticles: false,
    canDeleteArticles: false,
    canManageChannels: false,
    canManageReporters: false,
    canAccessAnalytics: false,
  },
};

// Channel structure
export const CHANNEL_MODEL = {
  id: String,
  name: String,
  description: String,
  owner: String, // Channel member ID
  reporters: Array, // Array of reporter IDs
  articles: Array, // Array of article IDs
  createdAt: Date,
  updatedAt: Date,
};

// Function to check if a user has permission
export const hasPermission = (userRole, permission) => {
  if (!userRole || !ROLE_PERMISSIONS[userRole]) {
    return false;
  }
  
  return !!ROLE_PERMISSIONS[userRole][permission];
}; 