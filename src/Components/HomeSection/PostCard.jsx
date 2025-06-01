import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Card, CardContent, CardHeader, CardActions, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import { FavoriteBorder, Favorite, ChatBubbleOutline, Repeat, Share, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { articleAPI, reactionAPI, commentAPI } from '../../config/api.config';
import ReplyModal from './ReplyModal';
import { format } from 'date-fns';
import AutoTranslatedText from '../Common/AutoTranslatedText';
import { LanguageContext } from '../../utils/contexts';

// Debug helper function to ensure dates are handled safely
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (err) {
    console.error('Error formatting date:', dateString, err);
    return 'Invalid date';
  }
};

// Helper to safely format content
const safeContent = (content) => {
  if (typeof content === 'string') return content;
  if (content === null || content === undefined) return '';
  if (typeof content === 'object') return JSON.stringify(content);
  return String(content);
};

const PostCard = ({ article }) => {
  // Safety check for article
  const safeArticle = article || {};
  const { language } = useContext(LanguageContext);
  
  // Log article to help debug
  useEffect(() => {
    console.log('Article data:', safeArticle);
  }, [safeArticle]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [sharesCount, setSharesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userRole = localStorage.getItem('userRole');
  const currentUserId = localStorage.getItem('userId');
  const isAuthor = (safeArticle.userId === currentUserId) || (safeArticle.user?.id === currentUserId);
  const canModifyArticle = ['REPORTER', 'CHANNEL'].includes(userRole) && isAuthor;

  useEffect(() => {
    const fetchReactions = async () => {
      if (!safeArticle.id) {
        console.error('Article ID is missing, cannot fetch reactions');
        return;
      }
      
      try {
        const [likesResponse, commentsResponse, sharesResponse] = await Promise.all([
          reactionAPI.getLikes(safeArticle.id),
          commentAPI.getComments(safeArticle.id),
          reactionAPI.getShares(safeArticle.id)
        ]);

        setLikesCount(likesResponse.data.length);
        setLiked(likesResponse.data.some(like => like.userId === currentUserId));
        
        // Process comments to ensure they have valid content
        const processedComments = commentsResponse.data.map(comment => {
          // Make a shallow copy to avoid modifying the original data
          const processedComment = {...comment};
          
          // Debug log to see what's in the comment content
          console.log('Raw comment content:', comment.content, 'Type:', typeof comment.content);
          
          // Make sure the content is a string
          if (typeof processedComment.content !== 'string') {
            if (processedComment.content === null || processedComment.content === undefined) {
              processedComment.content = 'Comment';
            } else if (typeof processedComment.content === 'object') {
              // If it's an object, try to extract the content property or stringify it
              if (processedComment.content.content && typeof processedComment.content.content === 'string') {
                processedComment.content = processedComment.content.content;
              } else {
                try {
                  processedComment.content = JSON.stringify(processedComment.content);
                } catch (e) {
                  processedComment.content = 'Comment';
                }
              }
            } else {
              processedComment.content = String(processedComment.content);
            }
          }
          
          // Final log to confirm the processed content
          console.log('Processed comment content:', processedComment.content);
          
          return processedComment;
        });
        
        setComments(processedComments);
        setCommentsCount(processedComments.length);
        setSharesCount(sharesResponse.data.length);
      } catch (err) {
        console.error('Error fetching reactions:', err);
      }
    };

    fetchReactions();
  }, [safeArticle.id, currentUserId]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await articleAPI.deleteArticle(safeArticle.id);
      window.location.reload();
    } catch (err) {
      setError('Failed to delete article');
    }
    handleMenuClose();
  };

  const handleLike = async () => {
    try {
      if (liked) {
        await reactionAPI.unlikeArticle(safeArticle.id);
        setLikesCount(prev => prev - 1);
      } else {
        await reactionAPI.likeArticle(safeArticle.id);
        setLikesCount(prev => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      setError('Failed to update like');
    }
  };

  const handleReply = () => {
    setShowReplyModal(true);
  };

  const handleShare = async () => {
    try {
      await reactionAPI.shareArticle(safeArticle.id);
      setSharesCount(prev => prev + 1);
    } catch (err) {
      setError('Failed to share article');
    }
  };

  const handleProfileClick = () => {
    const profileId = safeArticle.user?.id || safeArticle.userId;
    if (profileId) {
      navigate(`/profile/${profileId}`);
    } else {
      console.error('No user ID available for this article');
    }
  };

  const handleArticleClick = () => {
    navigate(`/articledetails/${safeArticle.id}`);
  };

  const onCommentSubmit = async (content) => {
    try {
      // Ensure content is a string even if an object is passed
      const contentString = typeof content === 'string'
        ? content
        : (content && typeof content === 'object' && (content.content || typeof content.get === 'function'))
          ? (content.content || content.get('content') || '')
          : '';
      
      console.log('Submitting comment with content:', contentString);
      
      // Send the content directly as a string
      const response = await commentAPI.addComment(safeArticle.id, contentString);
      
      // Log the response
      console.log('Comment added response:', response);
      
      // Ensure the comment content is a string
      const newComment = {...response.data};
      if (typeof newComment.content !== 'string') {
        newComment.content = String(newComment.content || 'Comment');
      }
      
      setComments([...comments, newComment]);
      setCommentsCount(prev => prev + 1);
      setShowReplyModal(false);
    } catch (err) {
      setError('Failed to add comment');
      console.error('Error adding comment:', err);
    }
  };

  // Get content safely
  const content = safeContent(safeArticle.content);
  const userName = safeArticle.user?.name || safeArticle.userName || 'Unknown User';
  const userImage = safeArticle.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  // If we have an invalid article, render nothing
  if (!safeArticle || typeof safeArticle !== 'object' || !safeArticle.id) {
    console.error('Invalid article data', safeArticle);
    return (
      <Card className="shadow-md rounded-lg overflow-hidden p-4">
        <Typography color="error">
          <AutoTranslatedText text="Error: Invalid article data" component="span" />
        </Typography>
      </Card>
    );
  }

  return (
    <Card className="shadow-md rounded-lg overflow-hidden">
      <CardHeader
        avatar={
          <Avatar
            src={userImage}
            onClick={handleProfileClick}
            className="cursor-pointer"
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuClick}>
            <MoreHoriz />
          </IconButton>
        }
        title={
          <Box onClick={handleProfileClick} className="cursor-pointer">
            <AutoTranslatedText 
              text={userName} 
              component="span" 
              typographyProps={{ fontWeight: 'bold' }}
              showIndicator={false} 
            />
          </Box>
        }
        subheader={
          <AutoTranslatedText 
            text={formatDate(safeArticle.createdAt || safeArticle.updatedAt)} 
            component="span" 
            showIndicator={false}
          />
        }
      />
      <CardContent onClick={handleArticleClick} className="cursor-pointer">
        <AutoTranslatedText 
          text={content} 
          component="body1" 
          typographyProps={{ paragraph: true }}
          showIndicator={true}
        />
        {safeArticle.image && (
          <img 
            src={safeArticle.image} 
            alt="Article" 
            className="w-full h-auto rounded-md mt-2" 
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLike}>
          {liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {likesCount}
        </Typography>
        <IconButton aria-label="comment" onClick={handleReply}>
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {commentsCount}
        </Typography>
        <IconButton aria-label="share" onClick={handleShare}>
          <Share />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {sharesCount}
        </Typography>
      </CardActions>

      {comments.length > 0 && (
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <AutoTranslatedText text="Comments" component="span" />
          </Typography>
          {comments.map((comment, index) => (
            <Box key={comment.id || index} sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Avatar
                src={comment.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user?.name || 'User')}`}
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="subtitle2">
                  <AutoTranslatedText 
                    text={comment.user?.name || 'User'} 
                    component="span" 
                    showIndicator={false}
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <AutoTranslatedText 
                    text={comment.content} 
                    component="span" 
                    showIndicator={true}
                  />
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {canModifyArticle && (
          <MenuItem onClick={handleDelete}>
            <AutoTranslatedText text="Delete" component="span" />
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <AutoTranslatedText text="Cancel" component="span" />
        </MenuItem>
      </Menu>

      <ReplyModal
        open={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        onSubmit={onCommentSubmit}
        title={<AutoTranslatedText text="Add a comment" component="span" />}
      />
      
      {error && (
        <CardContent>
          <Typography color="error">
            <AutoTranslatedText text={error} component="span" />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default PostCard;
