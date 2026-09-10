export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category,
    tags,
    estimatedReadTime,
    featured,
    author->{
      name,
      role,
      image,
      bio
    }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category,
    tags,
    estimatedReadTime,
    featured,
    body,
    seo,
    author->{
      name,
      role,
      image,
      bio,
      linkedIn,
      twitter
    }
  }
`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    "_updatedAt": _updatedAt,
    "publishedAt": publishedAt
  }
`;


export const relatedPostsQuery = `
  *[_type == "post" && slug.current != $currentSlug && category == $category] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    category,
    estimatedReadTime,
    author->{
      name,
      image
    }
  }
`;
