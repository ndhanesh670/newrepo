import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { useTheme } from "./Theme";
import { MessageSquare, Send, Trash2, MessageCircleOff } from "lucide-react";

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const Comments = ({ animeId }) => {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`bw_comments_${animeId}`);
    if (stored) {
      setComments(JSON.parse(stored));
    }
  }, [animeId]);

  const saveComments = (updated) => {
    setComments(updated);
    localStorage.setItem(`bw_comments_${animeId}`, JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    
    const commentObj = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };

    saveComments([...comments, commentObj]);
    setNewComment("");
  };

  const handleDelete = (id) => {
    saveComments(comments.filter((c) => c.id !== id));
  };

  return (
    <div className={`mt-10 p-6 rounded-2xl border ${isDark ? "bg-white/4 border-white/8" : "bg-white border-gray-200 shadow-sm"}`}>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-cyan-400" />
        <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className={`flex-1 px-4 py-3 rounded-xl border outline-none transition-all ${
              isDark ? "bg-zinc-900 border-white/10 text-white focus:border-cyan-500" : "bg-gray-50 border-gray-200 focus:border-cyan-400"
            }`}
          />
          <button type="submit" disabled={!newComment.trim()} className="btn-primary !px-4 disabled:opacity-50 disabled:cursor-not-allowed">
            <Send size={18} />
          </button>
        </form>
      ) : (
        <div className={`p-4 rounded-xl mb-8 text-center text-sm ${isDark ? "bg-zinc-900 text-gray-400" : "bg-gray-100 text-gray-600"}`}>
          Please log in to add a comment.
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className={`p-4 rounded-xl flex gap-4 ${isDark ? "bg-zinc-900" : "bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
              {comment.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-sm mr-2">{comment.username}</span>
                  <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {timeAgo(comment.timestamp)}
                  </span>
                </div>
                {currentUser && currentUser.id === comment.userId && (
                  <button onClick={() => handleDelete(comment.id)} className="text-red-500 hover:text-red-400 p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 fade-in-up">
            <MessageCircleOff size={40} className={`mb-3 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-center font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
