'use client'

import Link from 'next/link'
import { Clock, Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'
import { useState, useMemo } from 'react'

interface BlogArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readingTime: number
  category: string
  tags: string[]
  featured?: boolean
}

const BLOG_ARTICLES: BlogArticle[] = [
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

Start with one pomodoro and gradually increase. Track your sessions to identify your productivity patterns.`,
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

Modern calendar applications now support timezone-aware scheduling, eliminating many traditional complications.`,
    author: 'James Rodriguez',
    date: '2025-02-10',
    readingTime: 5,
    category: 'Collaboration',
    tags: ['timezones', 'remote-work', 'scheduling'],
    featured: true,
  },
  {
    id: '3',
    title: 'Building Daily Habits That Stick',
    slug: 'building-daily-habits-that-stick',
    excerpt: 'Scientific principles for creating lasting habits that compound into life-changing results.',
    content: `# Building Daily Habits That Stick

Habits are small actions that, when repeated consistently, create exponential results. Understanding habit formation is key to lasting change.

## The Habit Loop

Charles Duhigg's research identifies three components:

1. **Cue**: The trigger that initiates behavior
2. **Routine**: The habit itself
3. **Reward**: The benefit you gain

## The 21-Day Myth

Popular culture claims habits form in 21 days. Research shows it actually takes 66 days on average, with significant variation.

## Strategies for Success

- **Attach to Existing Habits**: Stack new habits with established ones ("After coffee, I meditate")
- **Start Small**: A 2-minute habit is better than a 30-minute one you skip
- **Track Progress**: Visual tracking reinforces commitment
- **Prepare Your Environment**: Remove friction from desired behaviors
- **Find Your Why**: Connect habits to deeper values and goals

## Habit Stacking Examples

- After brushing teeth → 5 minutes of reading
- After lunch → 15-minute walk
- Before bed → journaling

The key is consistency, not perfection. Missing once is a mistake; missing twice is the start of a new (bad) habit.`,
    author: 'Elena Park',
    date: '2025-02-08',
    readingTime: 7,
    category: 'Personal Development',
    tags: ['habits', 'psychology', 'self-improvement'],
    featured: true,
  },
  {
    id: '4',
    title: 'The Science of Deep Work and Focus',
    slug: 'science-of-deep-work',
    excerpt: 'Understand how to create conditions for sustained concentration and meaningful output.',
    content: `# The Science of Deep Work and Focus

Deep work—professional activities performed in a state of undistractedness—produces the highest-value output in knowledge work.

## Why Deep Work Matters

In the information economy, the ability to focus is increasingly rare and therefore increasingly valuable.

## The Challenge: Distraction

Research shows it takes 23 minutes to regain focus after an interruption. Constant notifications make deep focus nearly impossible.

## Creating Deep Work Conditions

1. **Eliminate Digital Distractions**: Notifications, emails, social media
2. **Create Rituals**: Consistent routines signal to your brain it's focus time
3. **Use Time Blocking**: Schedule deep work during peak cognitive hours
4. **Protect Your Space**: Physical isolation from interruptions
5. **Single-Task**: One project at a time, complete attention

## The Default Mode Network

Your brain's DMN activates during unfocused time, enabling creative problem-solving. Strategic breaks are essential.

## Measuring Deep Work

Track hours of deep work weekly. Most knowledge workers average only 3-4 hours daily despite full work schedules.`,
    author: 'Marcus Thompson',
    date: '2025-02-05',
    readingTime: 6,
    category: 'Productivity',
    tags: ['focus', 'deep-work', 'concentration'],
  },
  {
    id: '5',
    title: 'Timer Techniques Beyond Pomodoro',
    slug: 'timer-techniques-beyond-pomodoro',
    excerpt: 'Explore alternative time management methods optimized for different work styles and project types.',
    content: `# Timer Techniques Beyond Pomodoro

While Pomodoro works for many, different work styles benefit from different timing approaches.

## The Ultradian Rhythm Method

This approach aligns work sessions with your body's natural cycles (90-120 minutes of focus, then 15-20 minute breaks).

### Why It Works:
- Matches natural energy fluctuations
- Reduces cognitive overload
- Allows for deeper focus

## Time Boxing

Assign a specific amount of time to each task or project phase.

### Example Schedule:
- 10:00-10:30: Email and communication
- 10:30-12:00: Deep work on Project A
- 12:00-12:30: Team meeting
- 12:30-13:00: Lunch
- 13:00-14:30: Deep work on Project B

## The 52/17 Method

Research from the Draugiem Group found optimal productivity: 52 minutes of focused work, 17 minutes of break.

## Which Method for You?

- **Pomodoro**: Complex, context-switching tasks
- **Ultradian**: Creative, complex projects
- **Time Boxing**: Mixed work types
- **52/17**: Peak performance seekers

Experiment to find your optimal rhythm.`,
    author: 'Lisa Wang',
    date: '2025-02-01',
    readingTime: 5,
    category: 'Productivity',
    tags: ['timers', 'time-management', 'techniques'],
  },
  {
    id: '6',
    title: 'Understanding Stopwatch Accuracy and Precision',
    slug: 'stopwatch-accuracy-precision',
    excerpt: 'The difference between accuracy and precision in time measurement and why it matters for your data.',
    content: `# Understanding Stopwatch Accuracy and Precision

When timing activities, understanding accuracy vs. precision ensures reliable data collection.

## Accuracy vs. Precision

**Accuracy**: How close a measurement is to the true value
**Precision**: How consistently measurements are repeated

A stopwatch might be precise (always same result) but inaccurate (results differ from true time).

## Sources of Error

1. **Human Reaction Time**: ~100-300ms average delay
2. **Device Calibration**: Manufacturing tolerances
3. **Environmental Factors**: Temperature, humidity affecting electronics
4. **Software Delays**: Mobile OS processing time

## Improving Measurements

- Use multiple trials (average reduces random error)
- Account for systematic bias (consistent delay)
- Calibrate equipment regularly
- Record conditions (temperature, device type)
- Use statistical analysis for data

## For Practical Timing

Most modern digital stopwatches are accurate within 0.01 seconds. For fitness and productivity tracking, this precision is more than sufficient.

The key is consistency: using the same device and method across measurements.`,
    author: 'David Kumar',
    date: '2025-01-29',
    readingTime: 4,
    category: 'Technical',
    tags: ['measurement', 'accuracy', 'data'],
  },
  {
    id: '7',
    title: 'World Clock Applications for Remote Teams',
    slug: 'world-clock-remote-teams',
    excerpt: 'How to use world clocks effectively to coordinate across time zones without confusion.',
    content: `# World Clock Applications for Remote Teams

Displaying multiple time zones simultaneously solves coordination challenges for distributed teams.

## Common World Clock Features

1. **Multi-City Display**: View multiple time zones simultaneously
2. **Meeting Time Finder**: Identify overlapping work hours
3. **Timezone Abbreviations**: EST, PST, IST distinctions
4. **DST Handling**: Automatic adjustment for daylight saving time
5. **Favorite Locations**: Quick access to important zones

## Setting Up Your World Clock

### Essential Zones:
- Your current location
- Company headquarters
- Major office locations
- Key client zones

## Best Practices

1. **Use Standard Abbreviations**: UTC+5:30 for clarity
2. **Include in Emails**: Always specify timezone in timestamps
3. **Document Schedules**: Publish team member working hours
4. **Automate Reminders**: Calendar alerts adjusted for recipients' zones
5. **Regular Audits**: Verify displayed times match real zones

## Technology Solutions

Most productivity apps now integrate world clock functionality, reducing the need for third-party tools.`,
    author: 'Sophie Dubois',
    date: '2025-01-26',
    readingTime: 4,
    category: 'Tools & Resources',
    tags: ['world-clock', 'remote-work', 'timezone'],
  },
  {
    id: '8',
    title: 'Time Management for Freelancers',
    slug: 'time-management-freelancers',
    excerpt: 'Unique strategies for managing multiple projects and clients with flexible scheduling.',
    content: `# Time Management for Freelancers

Freelancers face unique challenges: no fixed schedule, multiple clients, and self-imposed deadlines.

## The Challenge

Without external structure, procrastination and over-commitment become constant threats.

## Client-Based Time Blocking

Dedicate specific days or blocks to each major client:
- Monday-Tuesday: Client A
- Wednesday: Client B
- Thursday-Friday: Client C

## Buffer Time is Critical

Always estimate 150% of perceived duration. Unexpected issues always arise.

### Example:
- Estimated project time: 8 hours
- Buffer allocation: 4 hours
- Total scheduled: 12 hours

## Tracking Across Clients

Detailed time tracking enables:
- Accurate invoicing
- Project profitability analysis
- Future estimation improvement
- Client communication

## Tools for Freelancers

- Time tracking: Toggl, Harvest
- Project management: Asana, Monday
- Invoicing: FreshBooks, Wave
- Calendar: Google Calendar with timezone support

## Finding Your Rhythm

Work during your peak hours. If you're creative at night, own it. Flexibility is a freelance advantage.`,
    author: 'Michael Johnson',
    date: '2025-01-23',
    readingTime: 6,
    category: 'Work Styles',
    tags: ['freelance', 'time-management', 'business'],
  },
  {
    id: '9',
    title: 'Seasonal Productivity Patterns and Planning',
    slug: 'seasonal-productivity-patterns',
    excerpt: 'Adapt your work rhythm to seasonal changes and natural productivity fluctuations.',
    content: `# Seasonal Productivity Patterns and Planning

Your productivity naturally fluctuates with seasons. Working with these rhythms, not against them, maximizes output.

## The Seasons

**Spring**: Energy increase, good for new projects
**Summer**: Interruptions more common, protect focus time
**Fall**: Reset, return to intensive work
**Winter**: Introspection, good for planning and review

## Circadian and Seasonal Rhythms

Beyond circadian (24-hour) rhythms, humans experience seasonal patterns affecting:
- Energy levels
- Sleep quality
- Mood and motivation
- Immune function

## Adapting Your Schedule

### Spring/Summer:
- Schedule important projects for spring
- Plan summer as lighter load
- Use summer for maintenance work
- Extend break duration

### Fall/Winter:
- Major projects scheduled for fall
- Winter for strategic planning
- Shorter task duration during winter
- Increase light exposure (light therapy)

## Quarterly Planning

Organize work in quarters aligned with seasonal patterns:
1. Q1: Execution (spring energy)
2. Q2: Maintenance (summer)
3. Q3: Intensive (fall focus)
4. Q4: Planning (winter reflection)

## Long-term Perspective

Viewing your year seasonally prevents burnout and aligns work with natural rhythms.`,
    author: 'Rachel Green',
    date: '2025-01-20',
    readingTime: 5,
    category: 'Personal Development',
    tags: ['seasons', 'productivity', 'planning'],
  },
  {
    id: '10',
    title: 'Digital Distractions: The Cost and Solutions',
    slug: 'digital-distractions-cost-solutions',
    excerpt: 'Quantify the impact of digital interruptions and implement proven distraction-elimination strategies.',
    content: `# Digital Distractions: The Cost and Solutions

Digital distractions cost workers an average of 2.1 hours daily, totaling roughly $588 billion annually in lost productivity.

## The Real Cost

- **Time to Refocus**: 23 minutes after each interruption
- **Cumulative Loss**: 4 interruptions = 92 minutes lost daily
- **Quality Degradation**: Interrupted work contains more errors

## Common Culprits

1. Email and messaging apps
2. Social media notifications
3. News and updates
4. Chat applications
5. Random browser tabs

## Proven Solutions

### Environmental:
- **Phone in Another Room**: Eliminate temptation
- **Close Unnecessary Tabs**: Reduce visual noise
- **Silence Notifications**: All of them
- **Dedicated Focus Space**: Physical separation

### Temporal:
- **Batch Email**: Check 3x daily, not continuously
- **No Notifications After 5pm**: Reclaim evenings
- **Phone-Free Hours**: Sacred focus time
- **Do Not Disturb Mode**: Automate silence

### Behavioral:
- **Website Blockers**: Block distracting sites during work
- **Accountability Partners**: External commitment
- **Reward System**: Incentivize focus sessions
- **Progress Tracking**: Visualize improvement

## The Compounding Effect

One hour of focused work daily compounds to 250 hours annually—skills and projects that transform careers.`,
    author: 'Alex Turner',
    date: '2025-01-17',
    readingTime: 6,
    category: 'Productivity',
    tags: ['distractions', 'focus', 'productivity'],
  },
  {
    id: '11',
    title: 'Meeting Time Efficiency: Respect Your Calendar',
    slug: 'meeting-time-efficiency',
    excerpt: 'Best practices for scheduling, conducting, and following up on meetings that respect everyone\'s time.',
    content: `# Meeting Time Efficiency: Respect Your Calendar

Poorly organized meetings waste more time than perhaps any other work activity.

## The Meeting Crisis

- Average manager spends 23 hours/week in meetings
- 71% of meetings considered unproductive
- 65% say meetings prevent deep work

## Pre-Meeting

1. **Define Clear Objective**: What decision or outcome?
2. **Required Attendees Only**: Smaller meetings move faster
3. **Send Agenda**: Advance notice allows preparation
4. **Set Hard Time Limits**: 15, 30, 45, or 60 minutes only
5. **Book in Calendars**: Respect existing commitments

## During Meeting

- **Start/End On Time**: Non-negotiable
- **Designate Facilitator**: Someone drives conversation
- **Assign Decisions**: Who decides?
- **Capture Action Items**: Owner and deadline
- **Minimize Slides**: Maximize discussion

## Post-Meeting

- **Send Summary**: Within 24 hours
- **Clarify Decisions**: What was decided?
- **List Action Items**: Owner, deadline, status
- **Update Calendars**: Block time for actions
- **Assess Necessity**: Was this meeting needed?

## Async Alternative

Many meetings could be emails or documents. Default to async unless real-time discussion is essential.`,
    author: 'Jennifer Lee',
    date: '2025-01-14',
    readingTime: 5,
    category: 'Workplace',
    tags: ['meetings', 'communication', 'efficiency'],
  },
  {
    id: '12',
    title: 'Analyzing Your Time: Data-Driven Productivity',
    slug: 'analyzing-time-data-driven',
    excerpt: 'Use time tracking data to identify patterns and optimize your productivity system.',
    content: `# Analyzing Your Time: Data-Driven Productivity

You can't improve what you don't measure. Time tracking provides objective data for productivity optimization.

## What to Track

1. **Task Categories**: Work, admin, learning, break
2. **Projects**: Client work, internal projects
3. **Start/End Times**: Duration and scheduling patterns
4. **Context**: Location, energy level, distractions
5. **Outcomes**: Meetings, deliverables, results

## Key Metrics

- **Deep Work Hours**: Uninterrupted focus time daily/weekly
- **Administrative Load**: Meetings, email, admin tasks
- **Task Completion Rate**: Planned vs. actual completion
- **Energy Mapping**: When are you most productive?
- **Project Profitability**: Revenue vs. time invested

## Weekly Review Questions

1. What was my most productive period?
2. When did I feel most energized?
3. What interrupted my focus most?
4. Which tasks took longer than expected?
5. What can I change next week?

## Tools for Analysis

- **Spreadsheets**: Manual tracking, maximum control
- **Toggl**: Automatic categorization
- **RescueTime**: Background tracking
- **Clockify**: Team tracking with analytics

## Using Insights

Data reveals your true time allocation vs. perception. Most people underestimate non-work activities and administrative time.

Adjust your schedule based on data, not intuition.`,
    author: 'Robert Zhang',
    date: '2025-01-11',
    readingTime: 6,
    category: 'Analytics',
    tags: ['time-tracking', 'data', 'productivity'],
  },
  {
    id: '13',
    title: 'Effective Break-Taking: Rest as Productivity',
    slug: 'effective-breaks-productivity',
    excerpt: 'Breaks aren\'t laziness—they\'re essential for sustained high performance and cognitive function.',
    content: `# Effective Break-Taking: Rest as Productivity

Counterintuitively, more breaks improve productivity. Rest is not the opposite of work; it's essential to work.

## The Science of Breaks

Research from the University of Illinois shows task performance sharply declines after 50 minutes of focus.

**Brief breaks restore attention and motivation.**

## Types of Breaks

### Micro Breaks (1-2 minutes)
- Stretch at desk
- Change scenery
- Deep breathing
- Drink water

### Short Breaks (5-15 minutes)
- Brief walk
- Meditation
- Snack
- Social interaction

### Lunch Breaks (30-60 minutes)
- Actual meal, away from desk
- Exercise
- Nature exposure
- Complete context switch

## Break Optimization

- **Timing**: Take breaks before you feel tired
- **Variety**: Mix types to prevent boredom
- **Away From Screen**: Eyes and mind need genuine rest
- **Outdoors**: Natural light resets alertness
- **Social**: Breaks with others provide recovery
- **No Email**: Actually disconnect

## The Recovery Paradox

Taking breaks increases daily output despite reducing "work hours." Quality trumps quantity.

## Post-Break Productivity Boost

Most people experience:
- +15-25% focus improvement for next hour
- Better mood and motivation
- Fewer mistakes
- Better creativity

Stop feeling guilty about breaks. They're part of the job.`,
    author: 'Amanda Foster',
    date: '2025-01-08',
    readingTime: 5,
    category: 'Wellbeing',
    tags: ['breaks', 'wellness', 'productivity'],
  },
  {
    id: '14',
    title: 'Sleep and Productivity: The Overlooked Connection',
    slug: 'sleep-productivity-connection',
    excerpt: 'Why sleep quality directly impacts your daytime productivity and how to optimize it.',
    content: `# Sleep and Productivity: The Overlooked Connection

Sleep is not a luxury—it's the foundation of productive performance.

## The Productivity-Sleep Connection

One night of poor sleep reduces next-day productivity by 30%. Chronic sleep deprivation is cumulative.

## Sleep Stages and Recovery

The complete sleep cycle takes ~90 minutes:
- Light sleep (N1, N2)
- Deep sleep (N3)
- REM sleep (dream stage)

All stages are necessary for cognitive restoration.

## Optimal Sleep Duration

Most adults require 7-9 hours. This isn't negotiable biology.

**Less than 6 hours**: Significant cognitive impairment
**7-9 hours**: Optimal performance
**More than 9 hours**: Associated with health issues

## Sleep Quality Factors

### Promoting Deep Sleep:
- Consistent sleep schedule (same bedtime/wake)
- Dark, cool room (65-68°F optimal)
- No screens 1 hour before bed
- No caffeine after 2pm
- Regular exercise (not before bed)
- Limited alcohol (disrupts deep sleep)

### Circadian Rhythm:
Your body operates on a 24-hour cycle. Consistency matters more than duration.

## Productivity Relationship

- Well-rested: 90+ minute focus capacity
- Sleep-deprived: 20-30 minute focus capacity
- One recovery night partially restores capacity

## The Myth of "I'll sleep when I'm dead"

Chronic sleep deprivation shortens lifespan and significantly increases health risks.

Protecting sleep is the single best investment in long-term productivity.`,
    author: 'Dr. Thomas Hall',
    date: '2025-01-05',
    readingTime: 7,
    category: 'Wellbeing',
    tags: ['sleep', 'health', 'productivity'],
  },
  {
    id: '15',
    title: 'Building Your Personal Productivity System',
    slug: 'personal-productivity-system',
    excerpt: 'Design a productivity system aligned with your values, goals, and natural work patterns.',
    content: `# Building Your Personal Productivity System

The best productivity system is the one you'll actually use. Here's how to design yours.

## Assess Your Baseline

Before optimizing, understand your current state:
- **Energy Patterns**: When are you most alert?
- **Work Style**: Deep focus or flexible multitasking?
- **Environment**: Office, home, coffee shop?
- **Obligations**: Fixed vs. flexible commitments
- **Goals**: What's your real priority?

## System Components

### 1. Planning
- **Quarterly Goals**: 3-month themes
- **Weekly Planning**: Sunday review and setup
- **Daily Priorities**: 3 main tasks maximum

### 2. Execution
- **Time Blocking**: Schedule important work first
- **Focus Technique**: Pomodoro, Ultradian, or custom
- **Environment Design**: Minimize friction, maximize focus
- **Batch Processing**: Group similar tasks

### 3. Tracking
- **Time Logging**: Understand actual allocation
- **Progress Visualization**: Motivation and accountability
- **Outcome Measurement**: Did you achieve goals?

### 4. Reflection
- **Daily Review**: 5 minutes, what worked?
- **Weekly Retrospective**: Patterns and adjustments
- **Monthly Audit**: System effectiveness
- **Quarterly Reset**: Alignment with goals

## Tools to Consider

Start simple: Paper notebook and phone calendar.

Advanced: Time tracker + Project management + Calendar + Note-taking

## System Evolution

Your system will evolve as:
- Your goals change
- Life circumstances shift
- You discover what works
- New tools become available

**Start simple, iterate often, adjust based on results.**

## Key Principles

1. **Alignment**: System matches your values
2. **Simplicity**: You understand every component
3. **Consistency**: You use it daily
4. **Flexibility**: Adjusts to changing needs
5. **Sustainability**: You can maintain it long-term

Your perfect system is the one you actually use every single day.`,
    author: 'Casey Morrison',
    date: '2025-01-02',
    readingTime: 8,
    category: 'Systems',
    tags: ['system', 'productivity', 'planning'],
    featured: true,
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(BLOG_ARTICLES.map((a) => a.category)))
  const tags = Array.from(new Set(BLOG_ARTICLES.flatMap((a) => a.tags)))

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const featuredArticles = BLOG_ARTICLES.filter((a) => a.featured)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">Blog</h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Deep dives into productivity, time management, and building better habits. Developer-focused insights for
            managing your most valuable resource: time.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F4C430]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === null
                  ? 'bg-[#F4C430] text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-[#F4C430] text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {!searchQuery && !selectedCategory && featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-white">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#F4C430]/50 hover:bg-white/10 transition"
                >
                  <div className="mb-3 inline-flex items-center gap-2">
                    <Tag className="w-3 h-3 text-[#F4C430]" />
                    <span className="text-xs font-bold text-[#F4C430] uppercase">{article.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F4C430] transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#F4C430] transition translate-x-0 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles List */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-white">
            {searchQuery ? 'Search Results' : selectedCategory ? selectedCategory : 'All Articles'}
          </h2>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group block bg-white/5 border border-white/10 rounded-lg p-6 hover:border-[#F4C430]/50 hover:bg-white/10 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs font-bold text-[#F4C430] uppercase">{article.category}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-white/60">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F4C430] transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-white/60 line-clamp-2">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readingTime}m
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#F4C430] transition flex-shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40 mb-4">No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
                className="text-[#F4C430] hover:text-[#E0B420] transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
