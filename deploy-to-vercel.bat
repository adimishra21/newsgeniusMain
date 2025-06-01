@echo off
echo ======= DEPLOYING NEWSGENIUS TO VERCEL =======
echo.

echo Installing Vercel CLI if not already installed...
call npm install -g vercel

echo.
echo Installing all dependencies with legacy peer deps...
call npm install --legacy-peer-deps

echo.
echo Starting Vercel deployment process...
echo A browser window will open for login if needed.
echo.
echo During the deployment process, you'll need to confirm:
echo 1. Link to existing project or create a new one
echo 2. Use default settings? Answer NO to customize
echo 3. Which settings would you like to override? Select: "buildCommand", "outputDirectory", "framework", "installCommand"
echo 4. For Build Command, enter: npm run build
echo 5. For Output Directory, enter: build
echo 6. For Framework, enter: create-react-app
echo 7. For Install Command, enter: npm install --legacy-peer-deps
echo.

echo Starting direct deployment...
call vercel --prod

echo.
echo If the deployment succeeded, your app should now be live on Vercel!
echo The URL should be displayed in the output above.
echo.
pause 