@echo off
echo ===================================================
echo GitHub Push Helper for NewsGenius
echo ===================================================

echo Checking Git installation...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Git not found! Please install Git from https://git-scm.com/downloads
  goto :end
)

echo.
echo Step 1: Configuring Git...
git config --global core.autocrlf false
git config --global core.safecrlf false

echo.
echo Step 2: Initializing Git repository...
git init

echo.
echo Step 3: Adding all files to Git...
git add .

echo.
echo Step 4: Committing changes...
set /p commit_msg="Enter a commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Initial commit of NewsGenius project
git commit -m "%commit_msg%"

echo.
echo Step 5: Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/adimishra21/newsgenius-main.git

echo.
echo Step 6: Setting up main branch...
git branch -M main

echo.
echo Step 7: Pushing to GitHub...
echo You may be prompted for your GitHub credentials.
echo For password, use a personal access token from: https://github.com/settings/tokens
echo.
git push -f origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ===================================================
  echo Success! Your code has been pushed to GitHub.
  echo Repository: https://github.com/adimishra21/newsgenius-main
  echo ===================================================
) else (
  echo.
  echo Something went wrong. Please check the error message above.
)

:end
echo.
pause 