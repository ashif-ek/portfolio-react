import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { blogs as mockBlogs } from '../data/mockData';
import Api from './Api';
import LazyImage from "./LazyImage";



const BlogSection = () => {
  // Hybrid Data Strategy: Init with mock, update with API
  const [allPosts, setAllPosts] = useState(mockBlogs);

  useEffect(() => {
    Api.get('/blogs?_sort=date&_order=desc')
      .then(res => setAllPosts(res.data))
      .catch(err => console.error("Failed to fetch fresh blogs", err));
  }, []);
  const [showAll, setShowAll] = useState(false);

  // Loading and Error states removed
  // Fetch logic removed

  const postsToShow = showAll ? allPosts : allPosts.slice(0, 3);

  // --- Render Section Content ---
  const renderContent = () => {
    //  3. Re-ordered logic
    // Priority 1: Show an error if the fetch failed


    // Priority 2: Show posts (either fallback or fetched)
    // This now renders *even if* isLoading is true
    if (allPosts.length > 0) {
      return (
        <div className="space-y-8">
          {postsToShow.map((post) => (
            <article
              key={post.id}
              className="group border-b border-gray-700 pb-6 last:border-b-0 last:pb-0 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* --- Image is now a Link --- */}
                <Link to={`/blog/${post.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-md border border-gray-700 overflow-hidden group-hover:border-gray-500 transition-colors duration-300">
                    <LazyImage
                      src={
                        post.imageUrl ||
                        "https://placehold.co/150x150/ffffff/999999?text=No+Image"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
                {/* --- End Modification --- */}

                <div className="flex-1 min-w-0">
                  <Link to={`/blog/${post.slug}`}>
                    {/* --- Added transform classes for hover --- */}
                    <h3 className="text-lg font-normal text-white group-hover:text-gray-200 line-clamp-2 leading-snug mb-2 transform origin-left transition-all duration-300 group-hover:scale-[101.5%]">
                      {post.title}
                    </h3>
                    {/* --- End Modification --- */}
                  </Link>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-3">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-xs text-gray-500 font-mono whitespace-nowrap">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs text-gray-400 hover:text-white font-medium transition-colors duration-200"
                    >
                      Read more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    }

    // Priority 3: Show loading spinner ONLY if we have no posts at all


    // Priority 4: If not loading, no error, and no posts, show empty state
    return (
      <div className="text-center text-gray-400 py-8">
        <div className="text-sm">No articles yet</div>
      </div>
    );
  };

  return (
    <section id="blog" className="py-12 bg-gray-900">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* --- Header --- */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light text-white mb-2">Writings</h2>
          <div className="w-12 h-px bg-gray-600 mx-auto"></div>
        </div>

        {/* --- Blog List --- */}
        <div className="min-h-[200px]">{renderContent()}</div>

        {/* --- Show More/Less Button --- */}
        {allPosts.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-gray-400 hover:text-gray-300 font-normal px-4 py-2 border border-gray-600 hover:border-gray-500 rounded-sm transition-all duration-200 hover:bg-gray-800/50"
            >
              {showAll ? "Show less" : `Show all (${allPosts.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
