export function generateConfirmationEmail(email: string, confirmationUrl: string): string {
  const currentYear = new Date().getFullYear()
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your Email - timenow.sbs</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 28px;
      font-weight: 900;
      color: #F4C430;
      letter-spacing: -1px;
      margin-bottom: 10px;
    }
    .logo-sub {
      font-size: 12px;
      color: #F4C430;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 15px;
    }
    .intro-text {
      color: #555;
      margin-bottom: 30px;
      font-size: 16px;
      line-height: 1.8;
    }
    .benefits {
      background: #f8f9fa;
      border-left: 4px solid #F4C430;
      padding: 20px;
      margin: 25px 0;
      border-radius: 6px;
    }
    .benefit-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .benefit-item:last-child {
      margin-bottom: 0;
    }
    .benefit-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: #F4C430;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      font-weight: bold;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .benefit-text {
      color: #333;
      font-size: 14px;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #F4C430 0%, #e6b800 100%);
      color: #1a1a2e;
      padding: 14px 40px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      margin: 30px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(244, 196, 48, 0.3);
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .alternative-link {
      color: #555;
      font-size: 14px;
      margin-top: 20px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
      text-align: center;
    }
    .alternative-link a {
      color: #F4C430;
      text-decoration: none;
      font-weight: 600;
      word-break: break-all;
    }
    .security-note {
      background: #fffaed;
      border: 1px solid #ffe58f;
      padding: 15px;
      border-radius: 6px;
      margin: 25px 0;
      font-size: 13px;
      color: #666;
      line-height: 1.6;
    }
    .security-title {
      font-weight: 600;
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    .footer-text {
      color: #666;
      font-size: 13px;
      margin-bottom: 20px;
    }
    .social-links {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 15px 0;
    }
    .social-link {
      display: inline-block;
      width: 36px;
      height: 36px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 50%;
      text-align: center;
      line-height: 36px;
      text-decoration: none;
      color: #F4C430;
      font-weight: bold;
      transition: all 0.2s;
    }
    .social-link:hover {
      background: #F4C430;
      color: white;
      border-color: #F4C430;
    }
    .footer-links {
      font-size: 12px;
      color: #666;
    }
    .footer-links a {
      color: #F4C430;
      text-decoration: none;
      margin: 0 10px;
    }
    .divider {
      height: 1px;
      background: #e9ecef;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">timenow.sbs</div>
      <div class="logo-sub">Productivity Lab</div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <div class="greeting">Welcome to timenow.sbs! 🎉</div>
      
      <p class="intro-text">
        Thank you for signing up! We're excited to have you join our community of productivity enthusiasts. 
        To get started and unlock all the features, please confirm your email address.
      </p>

      <!-- Benefits Section -->
      <div class="benefits">
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text"><strong>Pomodoro Timer</strong> - Master the art of focused work sessions</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text"><strong>World Clock</strong> - Track time across global time zones effortlessly</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text"><strong>Task Planner</strong> - Organize and prioritize your daily tasks</div>
        </div>
        <div class="benefit-item">
          <div class="benefit-icon">✓</div>
          <div class="benefit-text"><strong>Premium Features</strong> - Unlock advanced analytics and sync</div>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center;">
        <a href="${confirmationUrl}" class="cta-button">Confirm Your Email</a>
      </div>

      <!-- Alternative Link -->
      <div class="alternative-link">
        <p style="margin-bottom: 8px; color: #666; font-size: 13px;">Or copy and paste this link:</p>
        <a href="${confirmationUrl}">${confirmationUrl}</a>
      </div>

      <!-- Security Note -->
      <div class="security-note">
        <div class="security-title">🔒 Security Information</div>
        <p>This confirmation link will expire in 24 hours. If you didn't create this account, you can safely ignore this email. Your account remains secure with our enterprise-grade encryption.</p>
      </div>

      <p style="color: #666; font-size: 14px; margin: 25px 0;">
        If you have any questions or need assistance, feel free to reach out to our support team. We're here to help you make the most of timenow.sbs.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        <p>Stay connected and follow our journey</p>
      </div>

      <div class="social-links">
        <a href="https://twitter.com/timenowsbs" class="social-link" title="Twitter">𝕏</a>
        <a href="https://github.com/rajpolu/timenow-sbs" class="social-link" title="GitHub">⚙</a>
        <a href="https://linkedin.com/company/timenow-sbs" class="social-link" title="LinkedIn">in</a>
      </div>

      <div class="divider"></div>

      <div class="footer-text">
        <p>© ${currentYear} timenow.sbs. All rights reserved.</p>
      </div>

      <div class="footer-links">
        <a href="https://timenow.sbs/privacy">Privacy Policy</a>
        <a href="https://timenow.sbs/terms">Terms of Service</a>
        <a href="https://timenow.sbs/refund">Refund Policy</a>
      </div>

      <p style="color: #999; font-size: 12px; margin-top: 15px;">
        You're receiving this email because you signed up for timenow.sbs with ${email}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function generateWelcomeEmail(email: string, firstName?: string): string {
  const currentYear = new Date().getFullYear()
  const name = firstName || 'Friend'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to timenow.sbs</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'; background: #f5f7fa; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 20px; text-align: center; }
    .logo { font-size: 28px; font-weight: 900; color: #F4C430; }
    .content { padding: 40px 30px; }
    .cta-button { display: inline-block; background: #F4C430; color: #1a1a2e; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 700; }
    .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; color: #666; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">timenow.sbs</div>
    </div>
    <div class="content">
      <h1>Welcome, ${name}! 🚀</h1>
      <p>Your email has been confirmed and your account is now active. You're all set to start maximizing your productivity with timenow.sbs.</p>
      <p style="margin-top: 30px; text-align: center;">
        <a href="https://timenow.sbs/dashboard" class="cta-button">Go to Dashboard</a>
      </p>
    </div>
    <div class="footer">
      <p>© ${currentYear} timenow.sbs. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
