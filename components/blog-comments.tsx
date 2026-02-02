'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { MessageCircle, Heart, Reply, Trash2, Check } from 'lucide-react';
import {
  getBlogComments,
  addBlogComment,
  deleteBlogComment,
  getBlogPostStats,
  getUserVote,
  trackHelpfulVote,
} from '@/app/actions/blog-comments';

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
  likes_count: number;
  replies?: Comment[];
}

interface BlogCommentsProps {
  postId: string;
  onCommentAdded?: () => void;
}

export default function BlogComments({ postId, onCommentAdded }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [stats, setStats] = useState({ commentsCount: 0, helpfulCount: 0, unhelpfulCount: 0 });
  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load comments and stats
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [commentsRes, statsRes, voteRes] = await Promise.all([
          getBlogComments(postId),
          getBlogPostStats(postId),
          getUserVote(postId),
        ]);

        if (commentsRes.error) {
          setError(commentsRes.error);
        } else {
          setComments(commentsRes.comments);
        }

        if (!statsRes.error) {
          setStats(statsRes.stats);
        }

        if (!voteRes.error) {
          setUserVote(voteRes.vote);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim() || !authorName.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await addBlogComment({
        postId,
        authorName,
        authorEmail,
        content: commentText,
        parentCommentId: replyingTo || undefined,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setSuccessMessage('Comment submitted! It will appear after moderation.');
        setCommentText('');
        setAuthorName('');
        setAuthorEmail('');
        setReplyingTo(null);

        // Refresh comments
        const { comments: updatedComments } = await getBlogComments(postId);
        setComments(updatedComments);
        onCommentAdded?.();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const result = await deleteBlogComment(commentId);
      if (result.error) {
        setError(result.error);
      } else {
        setComments(prev => prev.filter(c => c.id !== commentId));
        setSuccessMessage('Comment deleted successfully');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  const handleHelpfulClick = async (isHelpful: boolean) => {
    try {
      await trackHelpfulVote({ postId, isHelpful });
      setUserVote(isHelpful);

      // Update stats
      const { stats: updatedStats } = await getBlogPostStats(postId);
      if (updatedStats) {
        setStats(updatedStats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record vote');
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`rounded-lg border border-border p-4 ${isReply ? 'ml-8 mt-3' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold">{comment.author_name}</p>
          <p className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-3">{comment.content}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setReplyingTo(comment.id)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Reply size={14} />
          Reply
        </button>
      </div>

      {/* Nested replies */}
      {comment.replies?.map(reply => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Helpful Indicator */}
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-semibold">Was this article helpful?</p>
            <p className="text-sm text-muted-foreground">
              {stats.helpfulCount} people found this helpful
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleHelpfulClick(true)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              userVote === true
                ? 'border-green-500 bg-green-500/10 text-green-500'
                : 'border-border hover:border-green-500'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {userVote === true && <Check size={16} />}
              Yes, helpful
            </span>
          </button>
          <button
            onClick={() => handleHelpfulClick(false)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              userVote === false
                ? 'border-red-500 bg-red-500/10 text-red-500'
                : 'border-border hover:border-red-500'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {userVote === false && <Check size={16} />}
              Not helpful
            </span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageCircle size={20} />
          Comments ({stats.commentsCount})
        </h3>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500 text-sm">
            {successMessage}
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8 bg-muted/50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name *"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your email (optional)"
                value={authorEmail}
                onChange={e => setAuthorEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Share your thoughts... *"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            {replyingTo && (
              <div className="flex items-center justify-between p-2 bg-background rounded border border-border">
                <span className="text-sm text-muted-foreground">Replying to a comment</span>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2 hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </button>
            <p className="text-xs text-muted-foreground">
              Comments are moderated and will appear after review.
            </p>
          </div>
        </form>

        {/* Comments List */}
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
