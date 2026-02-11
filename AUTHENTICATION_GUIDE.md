# Authentication System Documentation

## Overview

timenow.sbs uses Supabase for secure, production-ready authentication with Row Level Security (RLS) for data protection. The system supports email/password authentication and OAuth providers (Google, Facebook, GitHub).

## Architecture

### Core Components

1. **Supabase Integration**
   - Server-side: `/lib/supabase/server.ts` - Creates server client with secure cookie handling
   - Client-side: `/lib/supabase/client.ts` - Browser client for client-side operations
   - Middleware: `/lib/supabase/middleware.ts` - Handles session refresh and token management

2. **Authentication Files**
   - `/lib/auth.ts` - Server-side auth utilities (getSession, getUser, getCurrentUserProfile)
   - `/components/session-provider.tsx` - React context for session state across app
   - `/app/actions/auth.ts` - Server actions for auth operations (signOut, getCurrentUser)
   - `/app/auth/logout/route.ts` - Logout API endpoint
   - `/components/auth-modal.tsx` - Sign up/Sign in UI modal

3. **Auth Routes**
   - `/app/auth/page.tsx` - Auth landing page with modal
   - `/app/auth/callback/route.ts` - OAuth callback handler
   - `/app/auth/logout/route.ts` - Logout handler
   - `/app/auth/checkout-success/route.ts` - Stripe checkout callback

## Authentication Flow

### Email/Password Authentication

1. User submits email and password in AuthModal
2. Supabase creates auth session and sends confirmation email
3. User clicks confirmation link (redirects to `/auth/callback`)
4. Server exchanges code for session
5. User profile created in `user_profiles` table
6. User redirected to `/dashboard`

### OAuth Authentication (Google, Facebook, GitHub)

1. User clicks OAuth provider button
2. Redirected to provider login
3. Provider redirects to `/auth/callback` with authorization code
4. Server exchanges code for Supabase session
5. User profile auto-created via database trigger
6. User redirected to `/dashboard`

## Protected Routes

Protected routes require authentication middleware. The proxy.ts middleware:
- Refreshes user sessions on every request
- Validates JWT tokens via cookies
- Redirects unauthenticated users to `/auth/login` for protected paths

## Database Tables with RLS

All tables use Row Level Security (RLS) to ensure users only access their own data:

### user_profiles
- Stores user email and basic profile info
- RLS: Users can only view, insert, update their own profile

### pomodoro_sessions
- Tracks completed Pomodoro sessions
- RLS: Users can only view/modify their own sessions

### tasks
- Daily planner tasks
- RLS: Users can only manage their own tasks

### saved_timezones
- User-saved timezone configurations
- RLS: Users can only access their own timezones

### subscriptions
- Stripe subscription data
- RLS: Users can only view/update their own subscription

## Usage Examples

### Getting Current User (Server)

```tsx
import { getCurrentUser } from "@/app/actions/auth"

export default async function Page() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth")
  }
  
  return <div>Welcome, {user.email}</div>
}
```

### Using Session Context (Client)

```tsx
"use client"

import { useSession } from "@/components/session-provider"

export function UserMenu() {
  const { user, loading, signOut } = useSession()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not signed in</div>
  
  return (
    <div>
      <p>{user.email}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
```

### Getting User Profile (Server)

```tsx
import { getUserProfile } from "@/app/actions/auth"

export default async function Page() {
  const profile = await getUserProfile()
  
  return <div>{profile?.email}</div>
}
```

### Signing Out (Client)

```tsx
import { signOut } from "@/app/actions/auth"

export function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
```

## Security Features

1. **Row Level Security (RLS)** - Database-level access control
2. **Secure Cookies** - HTTP-only, SameSite cookies for session storage
3. **Token Refresh** - Automatic token refresh via middleware
4. **Password Hashing** - Supabase handles bcrypt hashing
5. **Email Verification** - Required before full account access
6. **OAuth Flows** - Industry-standard PKCE + state for OAuth security

## Environment Variables

Required Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Private service role (server-only)
- `SUPABASE_JWT_SECRET` - JWT secret for token validation

## Session Management

Sessions are managed through:
1. **Cookies** - Secure, HTTP-only storage of session tokens
2. **Middleware** - On every request, tokens are validated and refreshed
3. **Context** - Client-side state synchronized with server via hooks

The SessionProvider should wrap your app in layout.tsx for consistent session state.

## Error Handling

Common authentication errors:
- "User already registered" - Email already has account
- "Invalid credentials" - Wrong password
- "Email not confirmed" - User needs to confirm email
- "OAuth error" - Provider authentication failed

All errors are caught and displayed in AuthModal for user feedback.

## Testing Authentication

1. Sign up with test email
2. Check email for confirmation link
3. Click link to confirm
4. Sign in with credentials
5. Access protected routes
6. Use OAuth providers to test multi-auth flows

## Maintenance

- Monitor Supabase dashboard for auth events
- Review RLS policies if data access issues occur
- Keep Supabase client libraries updated
- Regularly audit session and token logs
