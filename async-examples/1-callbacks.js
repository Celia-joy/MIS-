/**
 * CALLBACK HELL EXAMPLE
 * 
 * This demonstrates the "callback hell" or "pyramid of doom" problem
 * where nested callbacks make code hard to read and maintain.
 * 
 * Notice how the code indents deeper and deeper with each nested callback.
 */

/**
 * Get GitHub user information by username
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getGitInfo(username, callback) {
  // Simulate async operation with setTimeout
  setTimeout(() => {
    // Hardcoded user data
    const userInfo = {
      login: username,
      name: username === 'octocat' ? 'The Octocat' : `${username} User`,
      bio: username === 'octocat' ? 'GitHub\'s mascot' : 'Software developer',
      public_repos: 8
    };
    callback(null, userInfo);
  }, 500); // Simulate 500ms delay
}

/**
 * Get repositories for a GitHub user
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getRepos(username, callback) {
  // Simulate async operation with setTimeout
  setTimeout(() => {
    // Hardcoded repos data
    const repos = [
      { name: 'Hello-World', description: 'My first repository' },
      { name: 'octocat', description: 'GitHub mascot project' },
      { name: 'Spoon-Knife', description: 'A test repository' }
    ];
    callback(null, repos);
  }, 500); // Simulate 500ms delay
}

/**
 * Get commits for a specific repository
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getCommits(username, repoName, callback) {
  // Simulate async operation with setTimeout
  setTimeout(() => {
    // Hardcoded commits data
    const commits = [
      {
        commit: {
          message: 'Initial commit: Add README and basic structure',
          author: {
            name: username === 'octocat' ? 'The Octocat' : `${username}`,
            date: '2024-01-15T10:30:00Z'
          }
        }
      },
      {
        commit: {
          message: 'Update documentation and fix typos',
          author: {
            name: username === 'octocat' ? 'The Octocat' : `${username}`,
            date: '2024-01-20T14:45:00Z'
          }
        }
      },
      {
        commit: {
          message: 'Add new feature: user authentication',
          author: {
            name: username === 'octocat' ? 'The Octocat' : `${username}`,
            date: '2024-01-25T09:15:00Z'
          }
        }
      }
    ];
    callback(null, commits);
  }, 500); // Simulate 500ms delay
}

/**
 * CALLBACK HELL - Nested callbacks make this hard to read and maintain
 * 
 * Notice the pyramid shape and deep nesting:
 * - Each callback is nested inside the previous one
 * - Error handling is repetitive
 * - Hard to see the flow of execution
 * - Difficult to add more operations
 */
function demonstrateCallbackHell(username) {
  console.log('\n=== CALLBACK HELL EXAMPLE ===\n');
  console.log('Getting user info, repos, and commits for:', username);
  console.log('Notice the deep nesting and pyramid shape...\n');

  // First, get user info
  getGitInfo(username, (error, userInfo) => {
    if (error) {
      console.error('Error getting user info:', error.message);
      return;
    }

    console.log(`✓ User: ${userInfo.name || userInfo.login}`);
    console.log(`  Bio: ${userInfo.bio || 'No bio'}`);
    console.log(`  Public Repos: ${userInfo.public_repos}\n`);

    // Then, get repos (nested inside user info callback)
    getRepos(username, (error, repos) => {
      if (error) {
        console.error('Error getting repos:', error.message);
        return;
      }

      console.log(`✓ Found ${repos.length} repositories`);
      if (repos.length > 0) {
        const firstRepo = repos[0];
        console.log(`  First repo: ${firstRepo.name}\n`);

        // Finally, get commits (nested inside repos callback - CALLBACK HELL!)
        getCommits(username, firstRepo.name, (error, commits) => {
          if (error) {
            console.error('Error getting commits:', error.message);
            return;
          }

          console.log(`✓ Found ${commits.length} commits in ${firstRepo.name}`);
          if (commits.length > 0) {
            const firstCommit = commits[0];
            console.log(`  Latest commit: ${firstCommit.commit.message.substring(0, 50)}...`);
            console.log(`  Author: ${firstCommit.commit.author.name}`);
            console.log(`  Date: ${firstCommit.commit.author.date}`);
          }

          console.log('\n=== CALLBACK HELL COMPLETE ===\n');
        });
      } else {
        console.log('No repositories found');
        console.log('\n=== CALLBACK HELL COMPLETE ===\n');
      }
    });
  });
}

// Run the example
if (require.main === module) {
  const username = process.argv[2] || 'octocat';
  demonstrateCallbackHell(username);
}

module.exports = {
  getGitInfo,
  getRepos,
  getCommits,
  demonstrateCallbackHell
};
