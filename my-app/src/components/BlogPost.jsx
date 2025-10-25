import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Api from './Api';
import LoadingSpinner from './LoadingSpinner';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await Api.get(`/blogs?slug=${slug}`);
        if (res.data.length > 0) {
          setPost(res.data[0]);
        } else {
          console.error("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-3xl py-20">
          <div className="text-center">
            <h1 className="text-2xl font-light text-white mb-4">Post not found</h1>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 font-normal transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-2xl py-12">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 font-normal mb-8 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to writings
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-light text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500">
            <time className="text-xs font-mono">
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert max-w-none
                          prose-p:text-gray-300 prose-p:leading-relaxed
                          prose-h1:text-xl prose-h1:font-light prose-h1:mt-8 prose-h1:mb-4
                          prose-h2:text-lg prose-h2:font-light prose-h2:mt-6 prose-h2:mb-3
                          prose-h3:text-base prose-h3:font-normal prose-h3:mt-4 prose-h3:mb-2
                          prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                          prose-ul:text-gray-300 prose-ol:text-gray-300
                          prose-li:text-gray-300
                          prose-blockquote:border-l-cyan-400 prose-blockquote:text-gray-400
                          prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
                          prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 font-normal transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to writings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;