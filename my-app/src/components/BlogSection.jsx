import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Api from "./Api";
import LazyImage from "./LazyImage"; // ✅ Import the reusable component

const BlogSection = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data with Axios ---
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await Api.get("/blogs?_sort=date&_order=desc");
        setAllPosts(res.data);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching blog posts:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  const postsToShow = showAll ? allPosts : allPosts.slice(0, 3);

  // --- Render Section Content ---
  const renderContent = () => {
    if (isLoading)
      return (
        <div className="min-h-[200px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );

    if (error)
      return (
        <div className="text-center text-gray-400 py-8 px-4 max-w-md mx-auto">
          <div className="text-sm">{error}</div>
        </div>
      );

    if (allPosts.length === 0)
      return (
        <div className="text-center text-gray-400 py-8">
          <div className="text-sm">No articles yet</div>
        </div>
      );

    return (
      <div className="space-y-8">
        {postsToShow.map((post) => (
          <article
            key={post.id}
            className="group border-b border-gray-700 pb-6 last:border-b-0 last:pb-0 hover:border-gray-600 transition-colors duration-300"
          >
            <div className="flex items-start space-x-4">
              {/* ✅ FIX: Replaced <img> with <LazyImage> inside a sized, styled wrapper */}
              <div className="w-24 h-24 flex-shrink-0 rounded-md border border-gray-700 overflow-hidden">
                <LazyImage
                  src={
                    post.imageUrl ||
                    "https://placehold.co/150x150/ffffff/999999?text=No+Image"
                  }
                  alt={post.title}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* ✅ FIX: Title is now the link for SEO & Accessibility */}
                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-normal text-white group-hover:text-gray-200 line-clamp-2 leading-snug transition-colors duration-200 mb-2">
                    {post.title}
                  </h3>
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
                  {/* 🛑 REMOVED: The old "Read more" link is gone */}
                </div>
              </div>
            </div>
          </article>
        ))}
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