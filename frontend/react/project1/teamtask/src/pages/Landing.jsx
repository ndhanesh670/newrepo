import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { getPosts } from '../utils/posts';

const Landing = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    setPosts(getPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6">
        <PostForm onPostCreated={loadPosts} />
        
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12 glass-card">
              <h3 className="text-xl font-medium text-slate-200 mb-2">No posts yet</h3>
              <p className="text-slate-400">Be the first to share something!</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLikeToggle={loadPosts} 
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Landing;
