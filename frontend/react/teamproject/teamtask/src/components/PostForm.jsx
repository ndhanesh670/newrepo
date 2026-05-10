import { useState, useRef } from 'react';
import { getCurrentUser } from '../utils/auth';
import { addPost } from '../utils/posts';

const PostForm = ({ onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  
  const user = getCurrentUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Image must be less than 2MB for localStorage');
        return;
      }
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim() && !imagePreview) {
      setError('Please add a caption or an image');
      return;
    }

    const newPost = {
      author: user.username,
      caption: caption.trim(),
      image: imagePreview,
    };

    addPost(newPost);
    setCaption('');
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError('');
    
    // Notify parent to refresh feed
    if (onPostCreated) {
      onPostCreated();
    }
  };

  return (
    <div className="glass-card p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-4 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all text-white placeholder-slate-400 text-[15px]"
            rows="3"
            placeholder={`What's on your mind, ${user?.username}?`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        {imagePreview && (
          <div className="mb-4 relative">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="max-h-64 w-auto rounded-lg object-contain border border-white/10 shadow-lg" 
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white rounded-full p-1.5 hover:bg-red-500 transition-all border border-white/20"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              ref={fileInputRef}
            />
            <label 
              htmlFor="image-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add Image
            </label>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
