import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Heart } from 'lucide-react';

const PeerSupport = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    // Load posts from local storage or use defaults
    const savedPosts = JSON.parse(localStorage.getItem('forumPosts') || '[]');
    if (savedPosts.length === 0) {
      setPosts([
        { id: 1, title: "Anxiety about upcoming finals", content: "Does anyone have tips for calming down before a big exam?", author: "Student_24", likes: 5 },
        { id: 2, title: "Feeling lonely on campus", content: "It's my first year and I'm struggling to make friends.", author: "Newbie_1", likes: 12 },
      ]);
    } else {
      setPosts(savedPosts);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: 'Student', 
      likes: 0,
      date: new Date().toLocaleDateString()
    };
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('forumPosts', JSON.stringify(updatedPosts));
    setShowForm(false);
    setNewPost({ title: '', content: '' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Community Forum</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus size={20} /> New Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 animate-fade-in-scale-up">
          <input 
            className="w-full mb-4 p-3 border rounded-lg" 
            placeholder="Title" 
            value={newPost.title} 
            onChange={e => setNewPost({...newPost, title: e.target.value})} 
            required 
          />
          <textarea 
            className="w-full mb-4 p-3 border rounded-lg" 
            placeholder="Share your thoughts..." 
            rows="4"
            value={newPost.content} 
            onChange={e => setNewPost({...newPost, content: e.target.value})} 
            required 
          />
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Post</button>
        </form>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-slate-900">{post.title}</h3>
            <p className="text-slate-600 mt-2 mb-4 text-sm leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-4">
              <span>Posted by {post.author}</span>
              <div className="flex gap-4">
                <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer"><Heart size={14} /> {post.likes}</span>
                <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer"><MessageSquare size={14} /> Reply</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerSupport;