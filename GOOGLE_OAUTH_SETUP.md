# Google OAuth 2.0 Configuration Guide

## Overview
This guide explains how to configure Google OAuth for timenow.sbs using your Google OAuth Client ID and Secret.

## Prerequisites
- Google Cloud Console account
- Project created in Google Cloud Console
- OAuth 2.0 credentials generated

## Step 1: Add Environment Variables

Once you have your Google OAuth credentials, add them to your Vercel project:

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 2: Configure in Supabase

### Add Google OAuth Provider:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication → Providers**
3. Find **Google** provider and enable it
4. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret

### Authorized Redirect URI:
Configure this in both Supabase and Google Cloud Console:
- Development: `http://localhost:3000/auth/callback`
- Production: `https://yourdomain.com/auth/callback`

## Step 3: Update OAuth Callback Handler

The callback is already configured at `/app/auth/callback/route.ts` and handles:
- Exchange authorization code for session
- Set secure HTTP-only cookies
- Redirect to dashboard or home

## Step 4: Test OAuth Flow

1. **Local Testing:**
   - Run `npm run dev`
   - Visit `/` and click "Continue with Google"
   - Verify redirect to Google login
   - Confirm callback returns to app

2. **Production Testing:**
   - Deploy to Vercel
   - Test with production credentials
   - Verify email confirmation still works

## Environment Variables Reference

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Project Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Project Settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Project Settings (keep secret) |

## Troubleshooting

### "Invalid Client ID"
- Verify Client ID matches exactly (no spaces)
- Check in Supabase Auth → Providers → Google

### "Redirect URI mismatch"
- Ensure callback URL matches in Google Cloud Console
- Use exact format: `https://domain.com/auth/callback`

### "User not created"
- Check email confirmation settings in Supabase
- Verify custom email template is active
- Check email is being sent correctly

## Security Best Practices

- ✅ Keep Client Secret secure (never commit to git)
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS for production
- ✅ Configure CORS properly in Supabase
- ✅ Regularly rotate secrets

## Next Steps

1. Provide your Google OAuth credentials
2. Add environment variables to Vercel
3. Configure Google provider in Supabase
4. Test OAuth flow end-to-end
5. Deploy and monitor in production
