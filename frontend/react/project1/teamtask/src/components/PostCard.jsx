import { useState } from 'react';
import { toggleLike } from '../utils/posts';
import { getCurrentUser } from '../utils/auth';

const PostCard = ({ post, onLikeToggle }) => {
  const currentUser = getCurrentUser();
  const [likes, setLikes] = useState(post.likes || []);
  const hasLiked = likes.includes(currentUser?.username);

  const handleLike = () => {
    if (!currentUser) return;
    
    // Optimistic UI update
    const updatedLikes = hasLiked
      ? likes.filter(u => u !== currentUser.username)
      : [...likes, currentUser.username];
      
    setLikes(updatedLikes);
    
    // Actual storage update
    toggleLike(post.id, currentUser.username);
    
    if (onLikeToggle) {
      onLikeToggle();
    }
  };

  // Format date nicely
  const date = new Date(post.timestamp);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);

  return (
    <div className="glass-card mb-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 hover:border-white/20">
      <div className="p-4 flex items-center gap-3 border-b border-white/5">
        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {post.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-white tracking-wide">{post.author}</h3>
          <p className="text-xs text-slate-400 font-medium">{formattedDate}</p>
        </div>
      </div>
      
      {post.image && (
        <div className="w-full bg-black/40">
          <img 
            src={post.image} 
            alt="Post content" 
            className="w-full max-h-[600px] object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        {post.caption && (
          <p className="text-slate-200 whitespace-pre-wrap mb-5 leading-relaxed text-[15px]">
            {post.caption}
          </p>
        )}
        
        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <button 
            onClick={handleLike}
            className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
              hasLiked 
                ? 'text-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                : 'text-slate-400 hover:text-pink-400 hover:bg-white/5'
            }`}
            aria-label={hasLiked ? "Unlike" : "Like"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 transition-transform duration-300 ${hasLiked ? 'scale-110' : 'hover:scale-110 active:scale-95'}`} 
              fill={hasLiked ? "currentColor" : "none"} 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={hasLiked ? 0 : 2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
          <span className="font-semibold text-sm text-slate-300">
            {likes.length} {likes.length === 1 ? 'like' : 'likes'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
