'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Article data - Same as in blog/page.tsx
const BLOG_ARTICLES = [
  {
    id: '1',
    title: 'Mastering the Pomodoro Technique: A Beginner\'s Guide',
    slug: 'pomodoro-technique-beginners-guide',
    excerpt: 'Learn how the Pomodoro Technique can transform your productivity with simple 25-minute work intervals.',
    content: `# Mastering the Pomodoro Technique: A Beginner's Guide

The Pomodoro Technique is a time management method that breaks your workday into focused intervals separated by short breaks. Created by Francesco Cirillo in the late 1980s, this technique has helped millions become more productive.

## What is the Pomodoro Technique?

The word "Pomodoro" is Italian for "tomato." Cirillo named his technique after the tomato-shaped timer he used as a university student.

### The Basic Structure:
- **Work Session**: 25 minutes of focused work
- **Short Break**: 5 minutes to rest
- **Long Break**: 15-30 minutes after 4 complete cycles

## Why It Works

1. **Reduces Procrastination**: The short 25-minute commitment feels manageable
2. **Minimizes Burnout**: Regular breaks prevent mental fatigue
3. **Improves Focus**: Knowing a break is coming helps you concentrate
4. **Tracks Progress**: Completed pomodoros provide tangible progress metrics

## Getting Started

Start with one pomodoro and gradually increase. Track your sessions to identify your productivity patterns.

## Advanced Techniques

Once comfortable with the basic technique, try these variations:

### Pomodoro + Background Music
Studies show that Lo-Fi beats enhance focus. Combine the technique with ambient music for even better concentration.

### Customized Intervals
Some people work better with 45-minute sessions and 15-minute breaks. Experiment to find your optimal rhythm.

### Team Pomodoros
Sync your pomodoros with teammates for shared accountability and focus time.

## Conclusion

The Pomodoro Technique isn't just about time management—it's about creating a sustainable work rhythm that respects your mental energy.`,
    author: 'Sarah Chen',
    date: '2025-02-15',
    readingTime: 6,
    category: 'Productivity',
    tags: ['pomodoro', 'time-management', 'focus'],
    featured: true,
  },
  {
    id: '2',
    title: 'Global Time Zones: Working Across Continents',
    slug: 'global-time-zones-guide',
    excerpt: 'Navigate timezone complexity when managing remote teams and scheduling international meetings.',
    content: `# Global Time Zones: Working Across Continents

Managing a distributed team requires understanding how time zones impact scheduling, communication, and productivity.

## Understanding UTC

UTC (Coordinated Universal Time) is the backbone of the global time system. All time zones are measured as offsets from UTC.

### Common UTC Offsets:
- UTC-8: Pacific Time (Los Angeles)
- UTC+0: Greenwich Mean Time (London)
- UTC+5:30: Indian Standard Time (India)
- UTC+9: Japan Standard Time

## Daylight Saving Time Complications

Not all regions observe DST, and they don't all change on the same date. This creates temporary UTC offset shifts.

## Best Practices for Global Teams

1. Schedule meetings in UTC internally
2. Display all times in participants' local zones
3. Rotate meeting times fairly
4. Use timezone converters for accuracy
5. Document all times with timezone indicators

## Tools That Help

Modern calendar applications now support timezone-aware scheduling, eliminating many traditional complications.

## Remote Work Challenges

When working globally, consider these challenges:
- Meeting fatigue for some time zones
- Async communication becomes essential
- Documentation is critical
- Overlapping hours are valuable`,
    author: 'James Rodriguez',
    date: '2025-02-10',
    readingTime: 5,
    category: 'Collaboration',
    tags: ['timezones', 'remote-work', 'scheduling'],
    featured: true,
  },
  {
    id: '3',
    title: 'Building Daily Habits That Stick: The Science Behind Habit Formation',
    slug: 'building-daily-habits-science',
    excerpt: 'Discover the psychological principles that make habits stick and how to build lasting routines.',
    content: `# Building Daily Habits That Stick: The Science Behind Habit Formation

Habits are the invisible architecture of our daily lives. They determine 40% of our behavior, yet most people don't understand how to build them effectively.

## The Habit Loop

Charles Duhigg's research reveals that every habit consists of three components:

### 1. Cue
The trigger that initiates the behavior. This could be a time of day, location, or emotional state.

### 2. Routine
The behavior itself. What you actually do in response to the cue.

### 3. Reward
The benefit you gain from the behavior. This reinforces the loop.

## The 21-Day Myth

Despite popular belief, habits don't form in 21 days. Research shows it takes 66 days on average, with a range of 18 to 254 days.

## Stack Your Habits

Use habit stacking to build new habits on existing ones. "After I pour my morning coffee, I will do 10 pushups."

## Environmental Design

Make good habits easy and bad habits difficult by designing your environment accordingly.

## Tracking Your Progress

Use a simple calendar to mark each day you complete your habit. Don't break the chain!`,
    author: 'Marcus Thompson',
    date: '2025-02-08',
    readingTime: 7,
    category: 'Personal Development',
    tags: ['habits', 'productivity', 'psychology'],
    featured: false,
  },
  {
    id: '4',
    title: 'Deep Work: Maximizing Focus in a Distracted World',
    slug: 'deep-work-focus-guide',
    excerpt: 'Strategies for achieving deep work and protecting your focus time in an increasingly distracted world.',
    content: `# Deep Work: Maximizing Focus in a Distracted World

In the age of constant notifications and endless distractions, the ability to do deep, focused work has become a superpower.

## What is Deep Work?

Cal Newport defines deep work as "professional activities performed in a state of unbroken concentration that push your cognitive abilities to their limit."

## The Four Rules of Deep Work

### Rule 1: Work Deeply
Create rituals and routines that establish deep work as a non-negotiable priority.

### Rule 2: Embrace Boredom
Train your brain to resist the urge for distraction. Boredom is a feature, not a bug.

### Rule 3: Quit Social Media
The attention economy is designed to fragment your focus. Consider quitting entirely.

### Rule 4: Drain the Shallows
Minimize time spent on shallow tasks that don't require deep focus.

## Implementation Tips

- Time block your calendar
- Use the Pomodoro Technique
- Create a distraction-free environment
- Turn off notifications
- Use website blockers`,
    author: 'Emma Wilson',
    date: '2025-02-05',
    readingTime: 8,
    category: 'Productivity',
    tags: ['deep-work', 'focus', 'minimalism'],
    featured: true,
  },
  {
    id: '5',
    title: 'Sleep and Productivity: How Rest Powers Performance',
    slug: 'sleep-productivity-connection',
    excerpt: 'Explore the critical link between quality sleep and optimal cognitive performance.',
    content: `# Sleep and Productivity: How Rest Powers Performance

While productivity culture often glorifies grinding, science shows that sleep is the ultimate performance enhancer.

## The Sleep-Productivity Connection

Research demonstrates that adequate sleep:
- Improves memory consolidation
- Enhances creative problem-solving
- Increases emotional resilience
- Boosts immune function
- Improves decision-making

## Sleep Architecture

Understanding sleep cycles helps optimize your rest:

### Stage 1-2: Light Sleep (20 min)
Transition from wake to sleep, slight decrease in heart rate.

### Stage 3: Deep Sleep (45 min)
Physical restoration, memory consolidation, and growth hormone release.

### REM Sleep (20 min)
Emotional processing and creative thinking.

## Optimizing Your Sleep Schedule

For cognitive peak performance, aim for 7-9 hours of sleep. Consistency matters more than duration.

## Sleep Hygiene Tips

- Keep your bedroom cool and dark
- Avoid screens 1 hour before bed
- Maintain a consistent sleep schedule
- Limit caffeine after 2 PM`,
    author: 'Dr. Lisa Park',
    date: '2025-02-03',
    readingTime: 6,
    category: 'Health & Wellness',
    tags: ['sleep', 'wellness', 'productivity'],
    featured: false,
  },
]

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const foundArticle = BLOG_ARTICLES.find(a => a.slug === params.slug)
    if (foundArticle) {
      setArticle(foundArticle)
    }
  }, [params.slug])

  if (!mounted) return null

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-white/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4C430] text-black rounded-lg font-bold hover:bg-[#E0B420] transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 text-[#F4C430]" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                  })
                }
              }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Header */}
        <article>
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 bg-[#F4C430]/10 border border-[#F4C430]/30 text-[#F4C430] rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-white/50">{article.readingTime} min read</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight text-white">
              {article.title}
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/60 border-t border-b border-white/10 py-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#F4C430]" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F4C430]" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F4C430]" />
                <span>{article.readingTime} minutes read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div className="space-y-6 text-white/80 leading-relaxed">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('#')) {
                  const level = paragraph.match(/^#+/)[0].length
                  const text = paragraph.replace(/^#+\s/, '')
                  const className = {
                    1: 'text-4xl font-black mb-6 mt-12 text-white',
                    2: 'text-2xl font-bold mb-4 mt-8 text-white',
                    3: 'text-xl font-bold mb-3 mt-6 text-white',
                  }[level] || 'text-lg font-semibold mb-3 text-white'
                  return <h2 key={idx} className={className}>{text}</h2>
                }
                
                if (paragraph.startsWith('-') || paragraph.startsWith('•')) {
                  const items = paragraph.split('\n').filter(l => l.trim())
                  return (
                    <ul key={idx} className="space-y-2 mb-6 list-disc list-inside">
                      {items.map((item, i) => (
                        <li key={i} className="text-white/70">
                          {item.replace(/^[-•]\s/, '')}
                        </li>
                      ))}
                    </ul>
                  )
                }

                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split('\n').filter(l => l.trim())
                  return (
                    <ol key={idx} className="space-y-2 mb-6 list-decimal list-inside">
                      {items.map((item, i) => (
                        <li key={i} className="text-white/70">
                          {item.replace(/^\d+\.\s/, '')}
                        </li>
                      ))}
                    </ol>
                  )
                }

                return <p key={idx} className="text-white/80 leading-relaxed mb-6">{paragraph}</p>
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-white/10">
            {article.tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full hover:border-[#F4C430]/50 transition text-white/70 hover:text-[#F4C430]"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Author Bio */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F4C430]/20 rounded-full flex items-center justify-center text-[#F4C430] font-bold flex-shrink-0">
                {article.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{article.author}</h3>
                <p className="text-sm text-white/60">
                  Productivity expert and freelance writer sharing insights on time management, focus, and personal growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#F4C430]/10 to-transparent border border-[#F4C430]/20 rounded-lg p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-3">Ready to master your time?</h2>
            <p className="text-white/70 mb-6">Start using timenow.sbs to implement these productivity techniques.</p>
            <Link
              href="/timezones"
              className="inline-block px-8 py-3 bg-[#F4C430] text-black rounded-lg font-bold hover:bg-[#E0B420] transition"
            >
              Get Started Free
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-3xl font-bold mb-8">More Articles</h2>
          <div className="grid gap-6">
            {BLOG_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3).map(a => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group block p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#F4C430]/30 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-[#F4C430] transition mb-2">
                      {a.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-3">{a.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>{a.readingTime} min read</span>
                      <span>•</span>
                      <span>{new Date(a.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
