#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

// run "node git " cli command to make it automate the git actions
const { execSync } = require('child_process');
const path = require('path');

const commitMessages = [
  "🔄 Updated codebase",
  "🐛 Fixed minor bugs",
  "♻️ Refactored some functions",
  "⚡ Improved performance",
  "🚀 Added a new feature",
  "🧹 Cleaned up unused code",
  "🎨 Tweaked UI styles",
  "📱 Enhanced mobile responsiveness",
  "🔥 Fixed a critical bug",
  "🏗️ Refactored component structure",
  "🗑️ Removed deprecated code",
  "🛡️ Enhanced error messages",
  "✨ Polished user experience",
  "🏷️ Defined and improved type safety",
  "🧑‍💻 Improved code quality",
  "📌 Refactored and optimized logic",
  "🎭 Enhanced UI/UX interactions",
  "🔧 Fixed inconsistencies in the UI",
  "📊 Improved data visualization",
  "🚀 Boosted app responsiveness",
  "⚙️ Standardized code formatting"
];
// Function to execute git commands
function executeGitCommands() {
  try {
    // Get current directory name for logging
    const currentDir = path.basename(process.cwd());
    
    console.log(`\n🚀 Starting git automation for: ${currentDir}\n`);
    
    // Stage all files
    console.log('📁 Staging all files...');
    execSync('git add .', { stdio: 'inherit' });
    
    // Select a random commit message
    const randomIndex = Math.floor(Math.random() * commitMessages.length);
    const commitMessage = commitMessages[randomIndex];
    
    // Commit with the random message
    console.log(`📝 Committing with message: "${commitMessage}"`);
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    // Push to remote repository
    console.log('🚀 Pushing to remote repository...');
    execSync('git push', { stdio: 'inherit' });
    
    console.log('\n✅ Git automation completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run the function
executeGitCommands();