@echo off
echo Pushing code to GitHub repository...

REM Initialize Git repository if not already initialized
if not exist .git (
  echo Initializing Git repository...
  git init
)

REM Add all files to Git
echo Adding files to Git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Initial commit: NewsGenius project"

REM Remove origin if it exists
git remote remove origin 2>nul

REM Add the GitHub repository as origin
echo Adding GitHub repository as remote origin...
git remote add origin https://github.com/adimishra21/newsgenius-main.git

REM Rename the branch to main if it's not already
echo Renaming branch to main...
git branch -M main

REM Force push to GitHub
echo Pushing to GitHub...
git push -f origin main

echo Done! Check if the push was successful.
pause 