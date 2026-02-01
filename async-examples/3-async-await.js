/**
 * ASYNC/AWAIT EXAMPLE
 * 
 * This demonstrates how async/await makes asynchronous code look
 * and read like synchronous code, while still being non-blocking.
 * 
 * This is the cleanest and most readable approach!
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
 * ASYNC/AWAIT - The cleanest way to handle asynchronous operations
 * 
 * Benefits:
 * - Looks like synchronous code (easy to read)
 * - No nesting or chaining
 * - Standard try/catch for error handling
 * - Can use regular control flow (if/else, loops, etc.)
 * - Still non-blocking and efficient
 */
async function demonstrateAsyncAwait(username) {
  console.log('\n=== ASYNC/AWAIT EXAMPLE ===\n');
  console.log('Getting user info, repos, and commits for:', username);
  console.log('Notice how clean and readable this is...\n');

  try {
    // Wait for user info (looks synchronous, but is actually async!)
    const userInfo = await getGitInfo(username);
    console.log(`✓ User: ${userInfo.name || userInfo.login}`);
    console.log(`  Bio: ${userInfo.bio || 'No bio'}`);
    console.log(`  Public Repos: ${userInfo.public_repos}\n`);

    // Wait for repos
    const repos = await getRepos(username);
    console.log(`✓ Found ${repos.length} repositories`);
    
    if (repos.length > 0) {
      const firstRepo = repos[0];
      console.log(`  First repo: ${firstRepo.name}\n`);

      // Wait for commits
      const commits = await getCommits(username, firstRepo.name);
      console.log(`✓ Found ${commits.length} commits in ${firstRepo.name}`);
      
      if (commits.length > 0) {
        const firstCommit = commits[0];
        console.log(`  Latest commit: ${firstCommit.commit.message.substring(0, 50)}...`);
        console.log(`  Author: ${firstCommit.commit.author.name}`);
        console.log(`  Date: ${firstCommit.commit.author.date}`);
      }
    } else {
      console.log('No repositories found');
    }

    console.log('\n=== ASYNC/AWAIT COMPLETE ===\n');
  } catch (error) {
    // Standard try/catch for error handling
    console.error('Error:', error.message);
    console.log('\n=== ASYNC/AWAIT COMPLETE ===\n');
  }
}

/**
 * ASYNC/AWAIT - Parallel execution with Promise.all()
 * 
 * When operations don't depend on each other, run them in parallel
 * for better performance.
 */
async function demonstrateParallelAsyncAwait(username) {
  console.log('\n=== PARALLEL ASYNC/AWAIT EXAMPLE ===\n');
  console.log('Getting user info and repos in parallel...\n');

  try {
    // Run both operations in parallel using Promise.all()
    const [userInfo, repos] = await Promise.all([
      getGitInfo(username),
      getRepos(username)
    ]);

    console.log(`✓ User: ${userInfo.name || userInfo.login}`);
    console.log(`✓ Found ${repos.length} repositories`);
    console.log('\nBoth operations completed in parallel!');
    console.log('\n=== PARALLEL ASYNC/AWAIT COMPLETE ===\n');
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\n=== PARALLEL ASYNC/AWAIT COMPLETE ===\n');
  }
}

/**
 * ASYNC/AWAIT - Using loops and control flow
 * 
 * This demonstrates how easy it is to use loops and other
 * control structures with async/await.
 */
async function demonstrateAsyncLoops(username) {
  console.log('\n=== ASYNC/AWAIT WITH LOOPS EXAMPLE ===\n');
  console.log('Getting info for multiple repos...\n');

  try {
    const userInfo = await getGitInfo(username);
    console.log(`✓ User: ${userInfo.name || userInfo.login}\n`);

    const repos = await getRepos(username);
    console.log(`✓ Found ${repos.length} repositories\n`);

    // Process first 3 repos sequentially
    for (let i = 0; i < Math.min(3, repos.length); i++) {
      const repo = repos[i];
      const commits = await getCommits(username, repo.name);
      console.log(`  ${repo.name}: ${commits.length} commits`);
    }

    console.log('\n=== ASYNC/AWAIT WITH LOOPS COMPLETE ===\n');
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\n=== ASYNC/AWAIT WITH LOOPS COMPLETE ===\n');
  }
}

// Run the example
if (require.main === module) {
  const username = process.argv[2] || 'octocat';
  demonstrateAsyncAwait(username);
  
  // Uncomment to see parallel execution
  // setTimeout(() => demonstrateParallelAsyncAwait(username), 2000);
  
  // Uncomment to see loops
  // setTimeout(() => demonstrateAsyncLoops(username), 4000);
}

module.exports = {
  getGitInfo,
  getRepos,
  getCommits,
  demonstrateAsyncAwait,
  demonstrateParallelAsyncAwait,
  demonstrateAsyncLoops
};
