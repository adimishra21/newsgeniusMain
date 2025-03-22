@echo off
echo ===================================================
echo Setting up Git repository with submodule
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
echo Step 2: Removing existing Git repository (if any)...
rmdir /s /q .git
del .gitmodules

echo.
echo Step 3: Initializing new Git repository...
git init

echo.
echo Step 4: Adding newsgenius-main as a submodule...
git submodule add https://github.com/adimishra21/newsgenius-main.git newsgenius-main

echo.
echo Step 5: Adding all files to Git...
git add .

echo.
echo Step 6: Committing changes...
git commit -m "Setup repository with newsgenius-main as submodule"

echo.
echo Step 7: Adding GitHub remote...
git remote add origin https://github.com/adimishra21/newsgenius-main.git

echo.
echo Step 8: Setting up main branch...
git branch -M main

echo.
echo Step 9: Pushing to GitHub...
echo You may be prompted for your GitHub credentials.
echo For password, use a personal access token from: https://github.com/settings/tokens
echo.
git push -f origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ===================================================
  echo Success! Your code with submodule has been pushed to GitHub.
  echo Repository: https://github.com/adimishra21/newsgenius-main
  echo ===================================================
) else (
  echo.
  echo Something went wrong. Please check the error message above.
)

:end
echo.
pause 