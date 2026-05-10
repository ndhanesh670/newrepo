// Read all posts from localStorage
export const getPosts = () => JSON.parse(localStorage.getItem('posts') || '[]');

// Save all posts to localStorage
export const savePosts = (posts) => localStorage.setItem('posts', JSON.stringify(posts));

// Add a new post
export const addPost = (post) => {
  const posts = getPosts();
  const newPost = {
    ...post,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    likes: [], // Array of usernames who liked it
  };
  posts.unshift(newPost); // Add to beginning of array (feed)
  savePosts(posts);
  return newPost;
};

// Toggle like for a user on a specific post
export const toggleLike = (postId, username) => {
  const posts = getPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return null;

  const post = posts[postIndex];
  const hasLiked = post.likes.includes(username);

  if (hasLiked) {
    post.likes = post.likes.filter(u => u !== username);
  } else {
    post.likes.push(username);
  }

  savePosts(posts);
  return posts[postIndex]; // Return updated post
};
