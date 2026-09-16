export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      ...,
      asset-> {
        _id,
        url
      }
    },
    mainImageUrl,
    category,
    tags,
    estimatedReadTime,
    featured,
    keyTakeaways,
    experienceHighlight,
    author->{
      name,
      role,
      image {
        ...,
        asset-> {
          _id,
          url
        }
      },
      avatarUrl,
      bio
    }
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    slug,
    publishedAt,
    lastReviewedAt,
    excerpt,
    mainImage {
      ...,
      asset-> {
        _id,
        url
      }
    },
    mainImageUrl,
    category,
    tags,
    estimatedReadTime,
    featured,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset-> {
          _id,
          url
        }
      }
    },
    seo,
    // E-E-A-T fields
    keyTakeaways,
    experienceHighlight,
    reviewedBy,
    citations,
    faqs,
    author->{
      name,
      role,
      image {
        ...,
        asset-> {
          _id,
          url
        }
      },
      avatarUrl,
      avatar,
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
    mainImage {
      ...,
      asset-> {
        _id,
        url
      }
    },
    mainImageUrl,
    category,
    estimatedReadTime,
    author->{
      name,
      image {
        ...,
        asset-> {
          _id,
          url
        }
      },
      avatarUrl
    }
  }
`;
