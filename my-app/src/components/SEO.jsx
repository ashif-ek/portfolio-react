import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website', 
  noIndex = false,
  structuredData = null 
}) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://ashif-ek.vercel.app';
  const fullUrl = `${siteUrl}${pathname}`;
  
  const defaultTitle = 'Ashif E.K | Digital Architect & Software Engineer';
  const defaultDescription = 'Ashif E.K – Digital Architect & Software Engineer specializing in React, Django, and modern web solutions. Explore projects, skills, and achievements.';
  const defaultKeywords = 'Ashif E.K, Portfolio, React, Django, Web Development, Software Engineer, Digital Architect';
  const defaultImage = `${siteUrl}/social-preview.png`; // Ensure this exists or fallback to something valid

  const metaTitle = title ? `${title} | Ashif E.K` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="Ashif E.K Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
