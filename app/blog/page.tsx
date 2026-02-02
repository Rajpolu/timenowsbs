'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Twitter, Linkedin, Mail, Copy } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  image: string;
  isHelpful?: boolean;
  likes: number;
  commentsCount: number;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering Time Management: The Pomodoro Technique',
    excerpt: 'Learn how to boost your productivity using the time-tested Pomodoro Technique. Break your work into focused intervals and achieve more in less time.',
    content: 'The Pomodoro Technique is a simple yet powerful time management method invented by Francesco Cirillo. This article explores how to implement it effectively...',
    author: 'Alex Chen',
    authorImage: '/placeholder-user.jpg',
    publishedAt: '2025-02-01',
    readingTime: 5,
    category: 'Productivity',
    image: '/placeholder.jpg',
    likes: 234,
    commentsCount: 12,
  },
  {
    id: '2',
    title: 'Global Time Zones Explained: Never Miss a Meeting Again',
    excerpt: 'Understanding world time zones can be confusing. Discover practical tips for scheduling meetings across different continents without confusion.',
    content: 'Working with a global team requires understanding how time zones work. This comprehensive guide breaks down everything you need to know...',
    author: 'Sarah Martinez',
    authorImage: '/placeholder-user.jpg',
    publishedAt: '2025-01-28',
    readingTime: 7,
    category: 'Collaboration',
    image: '/placeholder.jpg',
    likes: 156,
    commentsCount: 8,
  },
];

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(BLOG_POSTS[0]);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleHelpfulClick = (postId: string, isHelpful: boolean) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [postId]: isHelpful,
    }));
  };

  const handleShareClick = (platform: string) => {
    if (!selectedPost) return;

    const url = `${window.location.origin}/blog/${selectedPost.id}`;
    const title = selectedPost.title;
    const text = selectedPost.excerpt;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: 'Anonymous User',
        content: commentText,
        timestamp: new Date().toLocaleDateString(),
        replies: [],
      };
      setComments(prev => [newComment, ...prev]);
      setCommentText('');
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="timenow.sbs" className="w-8 h-8" />
              <span className="font-bold text-lg">timenow.sbs Blog</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Post List */}
          <div className="lg:col-span-2">
            {!selectedPost ? (
              <div className="space-y-6">
                {BLOG_POSTS.map(post => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="cursor-pointer rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-balance">{post.title}</h2>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.publishedAt}</span>
                          <span>By {post.author}</span>
                        </div>
                      </div>
                      <div className="hidden sm:block w-24 h-24 rounded-lg bg-muted flex-shrink-0" />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <article className="space-y-8">
                {/* Featured Image */}
                <div className="w-full h-96 rounded-lg bg-muted" />

                {/* Article Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                      {selectedPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{selectedPost.readingTime} min read</span>
                  </div>
                  <h1 className="text-4xl font-bold text-balance">{selectedPost.title}</h1>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4 py-4 border-y border-border">
                    <div className="w-12 h-12 rounded-full bg-muted" />
                    <div className="flex-1">
                      <p className="font-semibold">{selectedPost.author}</p>
                      <p className="text-sm text-muted-foreground">{selectedPost.publishedAt}</p>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>

                {/* Engagement Section */}
                <div className="space-y-6 py-8 border-y border-border">
                  {/* Was This Helpful? */}
                  <div className="bg-muted/50 rounded-lg p-6">
                    <p className="font-semibold mb-4">Was this article helpful?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleHelpfulClick(selectedPost.id, true)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          helpfulVotes[selectedPost.id] === true
                            ? 'border-green-500 bg-green-500/10 text-green-500'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        Yes, helpful
                      </button>
                      <button
                        onClick={() => handleHelpfulClick(selectedPost.id, false)}
                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                          helpfulVotes[selectedPost.id] === false
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        Not helpful
                      </button>
                    </div>
                  </div>

                  {/* Social Sharing */}
                  <div>
                    <p className="font-semibold mb-4">Share this article</p>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => handleShareClick('twitter')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
                      >
                        <Twitter size={18} />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShareClick('linkedin')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] text-white hover:bg-[#084a94] transition-colors"
                      >
                        <Linkedin size={18} />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShareClick('facebook')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white hover:bg-[#1366d9] transition-colors"
                      >
                        <Share2 size={18} />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShareClick('whatsapp')}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#1fb855] transition-colors"
                      >
                        <Share2 size={18} />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShareClick('copy')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors ${
                          copiedUrl ? 'bg-green-500/10 border-green-500' : ''
                        }`}
                      >
                        <Copy size={18} />
                        {copiedUrl ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>

                  {/* Like Section */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                      <Heart size={20} />
                      <span>{selectedPost.likes} likes</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6">
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
                  >
                    <MessageCircle size={24} />
                    Comments ({comments.length + selectedPost.commentsCount})
                  </button>

                  {showComments && (
                    <div className="space-y-6">
                      {/* Comment Form */}
                      <div className="bg-muted/50 rounded-lg p-6">
                        <textarea
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                          placeholder="Share your thoughts..."
                          className="w-full bg-background border border-border rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          rows={4}
                        />
                        <button
                          onClick={handleAddComment}
                          className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Post Comment
                        </button>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.map(comment => (
                          <div key={comment.id} className="border border-border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold">{comment.author}</p>
                              <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-muted-foreground">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-primary hover:underline font-semibold"
                >
                  ← Back to blog
                </button>
              </article>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Posts */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {BLOG_POSTS.map(post => (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="text-left hover:text-primary transition-colors"
                  >
                    <p className="font-semibold text-sm line-clamp-2">{post.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{post.publishedAt}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['Productivity', 'Collaboration', 'Tips & Tricks', 'Resources'].map(cat => (
                  <button
                    key={cat}
                    className="text-sm px-3 py-1 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-lg border border-primary bg-primary/5 p-6">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest productivity tips delivered to your inbox.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-3"
              />
              <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 hover:opacity-90 transition-opacity font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
