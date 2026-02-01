# Asynchronous JavaScript Examples

This folder demonstrates the evolution of handling asynchronous operations in JavaScript:
1. **Callbacks** (Callback Hell)
2. **Promises** (Chaining)
3. **Async/Await** (Modern approach)

All examples use the GitHub API to:
- Get user information by username
- Get repositories for a user
- Get commits for a repository

## Files

- `1-callbacks.js` - Demonstrates callback hell with nested callbacks
- `2-promises.js` - Shows how Promises solve callback hell
- `3-async-await.js` - Demonstrates the clean async/await syntax
- `4-parallel-promises.js` - Demonstrates parallel execution with Promise.all()

## Running the Examples

### Run a specific example:

```bash
# Callbacks example
node async-examples/1-callbacks.js [username]

# Promises example
node async-examples/2-promises.js [username]

# Async/Await example
node async-examples/3-async-await.js [username]

# Parallel Promises example (shows sequential vs parallel execution)
node async-examples/4-parallel-promises.js [username]
```

### Default username

If no username is provided, it defaults to `octocat` (GitHub's mascot).

### Example:

```bash
node async-examples/1-callbacks.js torvalds
node async-examples/2-promises.js torvalds
node async-examples/3-async-await.js torvalds
```

## Comparison

### 1. Callbacks (Callback Hell)

**Problems:**
- Deep nesting (pyramid of doom)
- Hard to read and maintain
- Difficult error handling
- Hard to add more operations

**Example:**
```javascript
getGitInfo(username, (error, userInfo) => {
  if (error) return handleError(error);
  
  getRepos(username, (error, repos) => {
    if (error) return handleError(error);
    
    getCommits(username, repos[0].name, (error, commits) => {
      if (error) return handleError(error);
      // Finally done!
    });
  });
});
```

### 2. Promises

**Benefits:**
- Flatter code structure
- Better error handling with `.catch()`
- Easier to chain operations
- Can run operations in parallel with `Promise.all()`

**Example:**
```javascript
getGitInfo(username)
  .then(userInfo => {
    return getRepos(username);
  })
  .then(repos => {
    return getCommits(username, repos[0].name);
  })
  .then(commits => {
    // Done!
  })
  .catch(error => {
    // Handle any error
  });
```

### 3. Async/Await

**Benefits:**
- Looks like synchronous code
- No nesting or chaining
- Standard try/catch for errors
- Can use regular control flow (if/else, loops)
- Still non-blocking and efficient

**Example:**
```javascript
async function getData(username) {
  try {
    const userInfo = await getGitInfo(username);
    const repos = await getRepos(username);
    const commits = await getCommits(username, repos[0].name);
    // Done!
  } catch (error) {
    // Handle error
  }
}
```

## Key Concepts

### Sequential vs Parallel Execution

**Sequential** (one after another):
```javascript
const user = await getGitInfo(username);
const repos = await getRepos(username);
// repos waits for user to complete
```

**Parallel** (at the same time):
```javascript
const [user, repos] = await Promise.all([
  getGitInfo(username),
  getRepos(username)
]);
// Both run simultaneously
```

### Error Handling

- **Callbacks**: Check error in each callback
- **Promises**: Use `.catch()` for the entire chain
- **Async/Await**: Use standard `try/catch` blocks

## Learning Path

1. Start with `1-callbacks.js` to understand the problem
2. Move to `2-promises.js` to see the solution
3. Finish with `3-async-await.js` to see the modern approach
4. Explore `4-parallel-promises.js` to learn about parallel execution and performance optimization

## Parallel Execution

The `4-parallel-promises.js` file demonstrates:

- **Sequential Execution**: Operations run one after another (slower)
  - Total time = sum of all operation times
  - Example: 500ms + 500ms + 500ms = 1500ms

- **Parallel Execution**: Operations run simultaneously (faster)
  - Total time = longest operation time
  - Example: max(500ms, 500ms, 500ms) = 500ms

- **Mixed Execution**: Some sequential, some parallel (practical approach)
  - Use when some operations depend on others

- **Error Handling**: 
  - `Promise.all()` - fails fast if any promise rejects
  - `Promise.allSettled()` - waits for all promises regardless of success/failure

## Notes

- All examples use `setTimeout` with hardcoded data (no network required)
- No external dependencies needed
- These are educational examples - in production, you'd want better error handling and retry logic
