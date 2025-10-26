import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Api from "./Api";
import LoadingSpinner from "./LoadingSpinner";
import LazyImage from "./LazyImage"; // ✅ Import the reusable component

/* 🛑 Removed the local LazyImage component definition */

/* ✅ Main BlogPost Component */
const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const res = await Api.get(`/blogs?slug=${slug}`);
      if (res.data.length > 0) setPost(res.data[0]);
      else setError(true);
    } catch (err) {
      console.error("❌ Error fetching post:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const formattedDate = useMemo(() => {
    if (!post?.date) return "";
    return new Date(post.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [post]);

  /* 🌀 Loading State */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  /* ❌ Error / Not Found */
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-light mb-4">Post not found</h1>
        <Link
          to="/blog"
          className="relative z-50 inline-flex items-center text-sm text-gray-400 hover:text-cyan-300 transition-all duration-200 group pointer-events-auto"
        >
          <svg
            className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to writings
        </Link>
      </div>
    );
  }

  /* ✅ Main Render */
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-2xl py-12">
        {/* --- Back Button (Always clickable) --- */}
        <div className="relative z-50 mb-6 mt-8 pointer-events-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-300 font-normal transition-all duration-200 group"
          >
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to writings
          </Link>
        </div>

        {/* --- Article Header --- */}
        <header className="mb-10 border-b border-gray-800 pb-5">
          <h1 className="text-3xl font-semibold text-white mb-3 leading-snug tracking-tight">
            {post.title}
          </h1>
          <time className="block text-xs text-gray-400 font-mono">
            {formattedDate}
          </time>
        </header>

        {/* --- Featured Image --- */}
        {post.imageUrl && (
          /* ✅ This wrapper provides the border, shape, and shadow */
          <div className="mb-10 rounded-xl overflow-hidden shadow-xl relative z-10 border border-gray-800">
            <LazyImage src={post.imageUrl} alt={post.title} />
          </div>
        )}

        {/* --- Markdown Content --- */}
        <article
          className="prose prose-invert max-w-none
                       prose-p:text-gray-300 prose-p:leading-relaxed
                       prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                       prose-h1:mt-10 prose-h2:mt-8 prose-h3:mt-6
                       prose-a:text-cyan-400 hover:prose-a:text-cyan-300
                       prose-code:bg-gray-800 prose-code:text-cyan-300 prose-code:px-1.5 prose-code:rounded
                       prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg
                       prose-hr:border-gray-700 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* --- Footer Back Link--- */}
        <div className="mt-16 pt-8 border-t border-gray-800 relative z-50 pointer-events-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-300 transition-all duration-200 group"
          >
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to writings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;