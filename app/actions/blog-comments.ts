'use server';

import { getSupabaseClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

interface CommentData {
  postId: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  parentCommentId?: string;
}

interface HelpfulVoteData {
  postId: string;
  isHelpful: boolean;
  ipAddress?: string;
}

// Get comments for a post
export async function getBlogComments(postId: string) {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .eq('is_spam', false)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data with nested replies
    const comments = data
      .filter(c => !c.parent_comment_id)
      .map(c => ({
        ...c,
        replies: data.filter(r => r.parent_comment_id === c.id),
      }));

    return { comments, error: null };
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { comments: [], error: error instanceof Error ? error.message : 'Failed to fetch comments' };
  }
}

// Add a new comment
export async function addBlogComment(data: CommentData) {
  try {
    const supabase = getSupabaseClient();

    // Check for spam (basic check)
    const spamKeywords = ['viagra', 'casino', 'lottery'];
    const isLikelySpam = spamKeywords.some(keyword => 
      data.content.toLowerCase().includes(keyword)
    );

    const { data: newComment, error } = await supabase
      .from('blog_comments')
      .insert([
        {
          post_id: data.postId,
          author_name: data.authorName,
          author_email: data.authorEmail,
          content: data.content,
          parent_comment_id: data.parentCommentId || null,
          is_approved: !isLikelySpam, // Auto-approve non-spam
          is_spam: isLikelySpam,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { comment: newComment, error: null };
  } catch (error) {
    console.error('Failed to add comment:', error);
    return { comment: null, error: error instanceof Error ? error.message : 'Failed to add comment' };
  }
}

// Update a comment
export async function updateBlogComment(commentId: string, content: string) {
  try {
    const supabase = getSupabaseClient();

    const { data: user } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { data: comment, error: fetchError } = await supabase
      .from('blog_comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (fetchError || comment?.user_id !== user.user.id) {
      throw new Error('Unauthorized');
    }

    const { data: updatedComment, error } = await supabase
      .from('blog_comments')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;

    return { comment: updatedComment, error: null };
  } catch (error) {
    console.error('Failed to update comment:', error);
    return { comment: null, error: error instanceof Error ? error.message : 'Failed to update comment' };
  }
}

// Delete a comment
export async function deleteBlogComment(commentId: string) {
  try {
    const supabase = getSupabaseClient();

    const { data: user } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { data: comment, error: fetchError } = await supabase
      .from('blog_comments')
      .select('user_id')
      .eq('id', commentId)
      .single();

    if (fetchError || comment?.user_id !== user.user.id) {
      throw new Error('Unauthorized');
    }

    const { error } = await supabase
      .from('blog_comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete comment' };
  }
}

// Track helpful vote
export async function trackHelpfulVote(data: HelpfulVoteData) {
  try {
    const supabase = getSupabaseClient();

    // Get user ID if authenticated, otherwise use IP
    const { data: user } = await supabase.auth.getUser();
    const userId = user?.user?.id || null;

    const { data: vote, error } = await supabase
      .from('blog_helpful_votes')
      .upsert(
        {
          post_id: data.postId,
          user_id: userId,
          is_helpful: data.isHelpful,
          ip_address: data.ipAddress,
        },
        { onConflict: 'post_id,user_id' }
      )
      .select()
      .single();

    if (error) throw error;

    return { vote, error: null };
  } catch (error) {
    console.error('Failed to track helpful vote:', error);
    return { vote: null, error: error instanceof Error ? error.message : 'Failed to track vote' };
  }
}

// Get post stats
export async function getBlogPostStats(postId: string) {
  try {
    const supabase = getSupabaseClient();

    const [
      { count: commentsCount },
      { count: helpfulCount },
      { count: unhelpfulCount },
    ] = await Promise.all([
      supabase
        .from('blog_comments')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)
        .eq('is_approved', true)
        .eq('is_spam', false),
      supabase
        .from('blog_helpful_votes')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)
        .eq('is_helpful', true),
      supabase
        .from('blog_helpful_votes')
        .select('id', { count: 'exact', head: true })
        .eq('post_id', postId)
        .eq('is_helpful', false),
    ]);

    return {
      stats: {
        commentsCount: commentsCount || 0,
        helpfulCount: helpfulCount || 0,
        unhelpfulCount: unhelpfulCount || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error('Failed to get post stats:', error);
    return { stats: null, error: error instanceof Error ? error.message : 'Failed to get stats' };
  }
}

// Get user's vote on a post
export async function getUserVote(postId: string) {
  try {
    const supabase = getSupabaseClient();
    const { data: user } = await supabase.auth.getUser();

    if (!user) {
      return { vote: null, error: null };
    }

    const { data, error } = await supabase
      .from('blog_helpful_votes')
      .select('is_helpful')
      .eq('post_id', postId)
      .eq('user_id', user.user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows found

    return { vote: data?.is_helpful ?? null, error: null };
  } catch (error) {
    console.error('Failed to get user vote:', error);
    return { vote: null, error: error instanceof Error ? error.message : 'Failed to get vote' };
  }
}
