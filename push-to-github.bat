@echo off
REM Task Board - GitHub Push Script

echo.
echo ================================
echo Task Board - Push to GitHub
echo ================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo Git initialized!
) else (
    echo Git already initialized
)

echo.
echo Adding files...
git add .

echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Initial commit: Task Board application
echo Creating commit: %commit_msg%
git commit -m "%commit_msg%"

echo.
echo Setting main branch...
git branch -M main

echo.
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter repository name (or press Enter for 'task-board-fullstack'): "
if "%repo_name%"=="" set repo_name=task-board-fullstack

set remote_url=https://github.com/%github_username%/%repo_name%.git
echo Remote URL: %remote_url%

REM Check if remote exists
git remote | findstr "origin" >nul
if %errorlevel%==0 (
    echo Removing existing origin...
    git remote remove origin
)

echo Adding remote...
git remote add origin %remote_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ================================
echo Successfully pushed to GitHub!
echo ================================
echo.
echo Next Steps:
echo 1. Deploy backend to Render: https://render.com
echo 2. Deploy frontend to Netlify: https://netlify.com  
echo 3. See DEPLOYMENT.md for detailed instructions
echo.
pause
