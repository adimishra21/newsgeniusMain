@echo off
echo ===================================================
echo Deploy NewsGenius to Vercel
echo ===================================================

echo Step 1: Making sure Git changes are committed...
git add package.json vercel.json
git commit -m "Prepare for Vercel deployment"

echo Step 2: Install Vercel CLI (if not already installed)...
call npm install -g vercel

echo Step 3: Deploy to Vercel...
echo You will need to:
echo 1. Log in to Vercel (browser will open)
echo 2. Link to existing project or create a new one
echo 3. Confirm deployment settings

call vercel

echo ===================================================
echo Deployment process initiated!
echo ===================================================
echo If successful, your app will be live on a Vercel URL
echo You can customize the domain in the Vercel dashboard
echo ===================================================
pause 