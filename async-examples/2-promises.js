/**
 * PROMISES EXAMPLE
 * 
 * This demonstrates how Promises solve the callback hell problem
 * by allowing us to chain operations instead of nesting them.
 * 
 * Notice how the code is flatter and easier to read.
 */

/**
 * Get GitHub user information by username (Promise version)
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getGitInfo(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Hardcoded user data
      const userInfo = {
        login: username,
        name: username === 'octocat' ? 'The Octocat' : `${username} User`,
        bio: username === 'octocat' ? 'GitHub\'s mascot' : 'Software developer',
        public_repos: 8
      };
      resolve(userInfo);
    }, 500); // Simulate 500ms delay
  });
}

/**
 * Get repositories for a GitHub user (Promise version)
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getRepos(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Hardcoded repos data
      const repos = [
        { name: 'Hello-World', description: 'My first repository' },
        { name: 'octocat', description: 'GitHub mascot project' },
        { name: 'Spoon-Knife', description: 'A test repository' }
      ];
      resolve(repos);
    }, 500); // Simulate 500ms delay
  });
}

/**
 * Get commits for a specific repository (Promise version)
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getCommits(username, repoName) {
  return new Promise((resolve) => {
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
      resolve(commits);
    }, 500); // Simulate 500ms delay
  });
}

/**
 * PROMISES - Using .then() chaining to avoid callback hell
 * 
 * Benefits:
 * - Flatter code structure (no deep nesting)
 * - Better error handling with .catch()
 * - Easier to read the flow of execution
 * - Can chain multiple operations
 */
function demonstratePromises(username) {
  console.log('\n=== PROMISES EXAMPLE ===\n');
  console.log('Getting user info, repos, and commits for:', username);
  console.log('Notice the flat structure and chaining...\n');

  // Chain promises instead of nesting callbacks
  getGitInfo(username)
    .then((userInfo) => {
      console.log(`✓ User: ${userInfo.name || userInfo.login}`);
      console.log(`  Bio: ${userInfo.bio || 'No bio'}`);
      console.log(`  Public Repos: ${userInfo.public_repos}\n`);

      // Return the next promise to chain
      return getRepos(username);
    })
    .then((repos) => {
      console.log(`✓ Found ${repos.length} repositories`);
      if (repos.length > 0) {
        const firstRepo = repos[0];
        console.log(`  First repo: ${firstRepo.name}\n`);

        // Return the next promise to chain
        return getCommits(username, firstRepo.name);
      } else {
        throw new Error('No repositories found');
      }
    })
    .then((commits) => {
      console.log(`✓ Found ${commits.length} commits`);
      if (commits.length > 0) {
        const firstCommit = commits[0];
        console.log(`  Latest commit: ${firstCommit.commit.message.substring(0, 50)}...`);
        console.log(`  Author: ${firstCommit.commit.author.name}`);
        console.log(`  Date: ${firstCommit.commit.author.date}`);
      }
      console.log('\n=== PROMISES COMPLETE ===\n');
    })
    .catch((error) => {
      // Single error handler for all promises in the chain
      console.error('Error:', error.message);
      console.log('\n=== PROMISES COMPLETE ===\n');
    });
}

/**
 * PROMISES - Using Promise.all() for parallel operations
 * 
 * This demonstrates how Promises can run operations in parallel
 * instead of sequentially, which is much faster.
 */
function demonstrateParallelPromises(username) {
  console.log('\n=== PARALLEL PROMISES EXAMPLE ===\n');
  console.log('Getting user info and repos in parallel...\n');

  // Run both operations in parallel
  Promise.all([
    getGitInfo(username),
    getRepos(username)
  ])
    .then(([userInfo, repos]) => {
      console.log(`✓ User: ${userInfo.name || userInfo.login}`);
      console.log(`✓ Found ${repos.length} repositories`);
      console.log('\nBoth operations completed in parallel!');
      console.log('\n=== PARALLEL PROMISES COMPLETE ===\n');
    })
    .catch((error) => {
      console.error('Error:', error.message);
      console.log('\n=== PARALLEL PROMISES COMPLETE ===\n');
    });
}

// Run the example
if (require.main === module) {
  const username = process.argv[2] || 'octocat';
  demonstratePromises(username);
  
  // Uncomment to see parallel execution
  // setTimeout(() => demonstrateParallelPromises(username), 2000);
}

module.exports = {
  getGitInfo,
  getRepos,
  getCommits,
  demonstratePromises,
  demonstrateParallelPromises
};
