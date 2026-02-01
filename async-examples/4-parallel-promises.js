/**
 * PARALLEL PROMISES EXAMPLE
 * 
 * This demonstrates the power of Promise.all() for running
 * multiple async operations in parallel instead of sequentially.
 * 
 * Key benefits:
 * - Much faster when operations don't depend on each other
 * - All promises run simultaneously
 * - Total time = longest operation (not sum of all operations)
 */

/**
 * Get GitHub user information by username (Promise version)
 * Uses setTimeout to simulate async behavior with hardcoded data
 */
function getGitInfo(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
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
        }
      ];
      resolve(commits);
    }, 500); // Simulate 500ms delay
  });
}

/**
 * SEQUENTIAL EXECUTION - One after another
 * 
 * Time: 500ms + 500ms + 500ms = 1500ms total
 * Each operation waits for the previous one to complete
 */
async function demonstrateSequential(username) {
  console.log('\n=== SEQUENTIAL EXECUTION ===\n');
  console.log('Running operations one after another...\n');
  
  const startTime = Date.now();
  
  try {
    // Wait for first operation
    const userInfo = await getGitInfo(username);
    console.log(`✓ User: ${userInfo.name || userInfo.login} (${Date.now() - startTime}ms)`);
    
    // Wait for second operation (starts after first completes)
    const repos = await getRepos(username);
    console.log(`✓ Repos: ${repos.length} found (${Date.now() - startTime}ms)`);
    
    // Wait for third operation (starts after second completes)
    const commits = await getCommits(username, repos[0].name);
    console.log(`✓ Commits: ${commits.length} found (${Date.now() - startTime}ms)`);
    
    const totalTime = Date.now() - startTime;
    console.log(`\n⏱️  Total time: ${totalTime}ms (sequential)`);
    console.log('   Each operation waited for the previous one to finish.\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * PARALLEL EXECUTION - All at the same time
 * 
 * Time: max(500ms, 500ms, 500ms) = 500ms total
 * All operations start simultaneously
 */
async function demonstrateParallel(username) {
  console.log('\n=== PARALLEL EXECUTION ===\n');
  console.log('Running operations simultaneously...\n');
  
  const startTime = Date.now();
  
  try {
    // All three operations start at the same time!
    const [userInfo, repos, commits] = await Promise.all([
      getGitInfo(username),
      getRepos(username),
      getCommits(username, 'Hello-World') // Using known repo name for parallel demo
    ]);
    
    const totalTime = Date.now() - startTime;
    
    console.log(`✓ User: ${userInfo.name || userInfo.login} (${totalTime}ms)`);
    console.log(`✓ Repos: ${repos.length} found (${totalTime}ms)`);
    console.log(`✓ Commits: ${commits.length} found (${totalTime}ms)`);
    
    console.log(`\n⏱️  Total time: ${totalTime}ms (parallel)`);
    console.log('   All operations ran simultaneously!\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * MIXED EXECUTION - Some sequential, some parallel
 * 
 * This shows a practical example where some operations
 * depend on others, but independent operations can run in parallel
 */
async function demonstrateMixed(username) {
  console.log('\n=== MIXED EXECUTION (Sequential + Parallel) ===\n');
  console.log('First get user info, then get repos and commits in parallel...\n');
  
  const startTime = Date.now();
  
  try {
    // First, get user info (needed for context)
    const userInfo = await getGitInfo(username);
    console.log(`✓ User: ${userInfo.name || userInfo.login} (${Date.now() - startTime}ms)\n`);
    
    // Now get repos and commits in parallel (they don't depend on each other)
    const [repos, commits] = await Promise.all([
      getRepos(username),
      getCommits(username, 'Hello-World')
    ]);
    
    const totalTime = Date.now() - startTime;
    
    console.log(`✓ Repos: ${repos.length} found (${totalTime}ms)`);
    console.log(`✓ Commits: ${commits.length} found (${totalTime}ms)`);
    
    console.log(`\n⏱️  Total time: ${totalTime}ms`);
    console.log('   User info first, then repos and commits in parallel.\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/**
 * PARALLEL WITH ERROR HANDLING
 * 
 * Shows how Promise.all() behaves when one promise fails
 */
async function demonstrateParallelWithError() {
  console.log('\n=== PARALLEL WITH ERROR HANDLING ===\n');
  
  // Create a promise that will fail
  const failingPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Simulated error'));
    }, 300);
  });
  
  try {
    // If any promise fails, Promise.all() rejects immediately
    await Promise.all([
      getGitInfo('octocat'),
      getRepos('octocat'),
      failingPromise
    ]);
  } catch (error) {
    console.log('❌ Promise.all() failed because one promise rejected:');
    console.log(`   ${error.message}\n`);
  }
  
  // Use Promise.allSettled() to wait for all promises regardless of success/failure
  console.log('Using Promise.allSettled() to handle partial failures:\n');
  
  const results = await Promise.allSettled([
    getGitInfo('octocat'),
    getRepos('octocat'),
    failingPromise
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`✓ Promise ${index + 1}: Success`);
    } else {
      console.log(`❌ Promise ${index + 1}: ${result.reason.message}`);
    }
  });
  
  console.log('\n=== PARALLEL WITH ERROR HANDLING COMPLETE ===\n');
}

// Run all examples
if (require.main === module) {
  const username = process.argv[2] || 'octocat';
  
  // Run sequential first
  demonstrateSequential(username)
    .then(() => {
      // Then run parallel to show the difference
      return demonstrateParallel(username);
    })
    .then(() => {
      // Then show mixed approach
      return demonstrateMixed(username);
    })
    .then(() => {
      // Finally show error handling
      return demonstrateParallelWithError();
    })
    .catch(console.error);
}

module.exports = {
  getGitInfo,
  getRepos,
  getCommits,
  demonstrateSequential,
  demonstrateParallel,
  demonstrateMixed,
  demonstrateParallelWithError
};
