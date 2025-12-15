#!/bin/bash

# Task Board - GitHub Push Script

echo "🚀 Task Board - Push to GitHub"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Add all files
echo ""
echo "📝 Adding files..."
git add .

# Commit
echo ""
echo "💾 Creating commit..."
read -p "Enter commit message (default: 'Initial commit'): " commit_msg
commit_msg=${commit_msg:-"Initial commit: Task Board application"}
git commit -m "$commit_msg"

# Set main branch
echo ""
echo "🌿 Setting main branch..."
git branch -M main

# Add remote
echo ""
echo "🔗 Adding remote repository..."
read -p "Enter your GitHub username: " github_username
read -p "Enter repository name (default: 'task-board-fullstack'): " repo_name
repo_name=${repo_name:-"task-board-fullstack"}

remote_url="https://github.com/$github_username/$repo_name.git"
echo "Remote URL: $remote_url"

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "Removing existing origin..."
    git remote remove origin
fi

git remote add origin "$remote_url"

# Push
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Render: https://render.com"
echo "2. Deploy frontend to Netlify: https://netlify.com"
echo "3. See DEPLOYMENT.md for detailed instructions"
echo ""
echo "🎉 Done!"
