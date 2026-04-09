# Course Tracker

A workflow tracker for managing community education courses — from planning and contracts through to reporting.

Built with Next.js 14, Vercel Postgres, and NextAuth.

---

## Deploying to Vercel (step by step)

### 1. Put the code on GitHub

1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click **New repository**, give it a name like `dldc-course-tracker`, set it to **Private**, and click **Create repository**
3. Upload all these files to the repository (drag and drop works on GitHub)

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in with your GitHub account
2. Click **Add New → Project**
3. Find your `dldc-course-tracker` repository and click **Import**
4. Leave all settings as default and click **Deploy**

### 3. Add a Postgres database

1. In your Vercel project, go to the **Storage** tab
2. Click **Create Database → Postgres**
3. Follow the prompts — choose the free tier
4. Once created, Vercel automatically adds the `POSTGRES_URL` and related variables to your project

### 4. Set your environment variables

In your Vercel project go to **Settings → Environment Variables** and add:

| Name | Value |
|------|-------|
| `NEXTAUTH_SECRET` | A long random string — generate one at [generate-secret.vercel.app](https://generate-secret.vercel.app/32) |
| `NEXTAUTH_URL` | Your Vercel deployment URL, e.g. `https://dldc-course-tracker.vercel.app` |
| `ADMIN_PASSWORD` | The password you want to use to log in |

Click **Save** after adding each one, then go to **Deployments** and click **Redeploy**.

### 5. Set up the database tables

Once deployed, visit this URL in your browser (replace with your actual domain):

```
https://your-app.vercel.app/api/setup
```

You should see: `{"message":"Database tables created successfully."}`

That's it — your app is live!

---

## Using the app

- Visit your Vercel URL and log in with the password you set
- Click **+ New course** to create a course and open its workflow checklist
- Tick off tasks as you complete them — progress saves automatically
- Return to the dashboard any time to see all courses and their progress

---

## Running locally (optional)

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
