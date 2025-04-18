class BlogService {
  static async getBlogPosts() {
    try {
      // Digital Marketing focused RSS feeds
      const defaultFeeds = [
        'https://www.socialmediaexaminer.com/feed/',
        'https://www.searchenginejournal.com/category/digital-marketing/feed/',
        'https://neilpatel.com/blog/feed/',
        'https://www.digitalmarketer.com/blog/feed/',
        'https://www.wordstream.com/feed',
        'https://www.convinceandconvert.com/feed/',
        'https://www.marketingprofs.com/rss/all',
        'https://blog.hubspot.com/marketing/rss.xml',
        'https://moz.com/blog/feed'
      ];

      const allPosts = [];

      // Keywords to filter relevant content
      const relevantKeywords = [
        'digital marketing',
        'seo',
        'social media marketing',
        'content marketing',
        'email marketing',
        'ppc',
        'paid advertising',
        'google ads',
        'facebook ads',
        'instagram marketing',
        'marketing strategy',
        'lead generation',
        'conversion optimization',
        'analytics',
        'marketing automation',
        'branding',
        'digital advertising',
        'marketing trends'
      ];

      // Fetch all feeds in parallel
      const feedPromises = defaultFeeds.map(async (feedUrl) => {
        try {
          const response = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
          );
          const data = await response.json();

          if (data.status === 'ok') {
            // Filter and map the feed items
            const posts = data.items
              .filter(item => {
                const content = (item.title + ' ' + item.description).toLowerCase();
                return relevantKeywords.some(keyword => content.includes(keyword.toLowerCase()));
              })
              .map(item => ({
                id: item.guid || item.link,
                title: item.title,
                content: item.content,
                description: item.description || this.extractDescription(item.content),
                published: new Date(item.pubDate).toLocaleDateString(),
                author: item.author,
                url: item.link,
                image: this.extractBestImage(item),
                source: data.feed.title
              }));

            // Only add posts that have valid images
            const validatedPosts = posts.filter(post => post.image && this.isValidImageUrl(post.image));
            allPosts.push(...validatedPosts);
          }
        } catch (error) {
          console.error(`Error fetching feed ${feedUrl}:`, error);
        }
      });

      await Promise.all(feedPromises);

      // Sort by date (newest first) and limit to most recent posts
      return allPosts
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, 30);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static extractBestImage(item) {
    // Try to get the best quality image in this order:
    // 1. Featured image from the content
    // 2. RSS thumbnail
    // 3. First image from content
    // 4. Default image

    const featuredImage = this.extractFeaturedImage(item.content);
    if (featuredImage) return featuredImage;

    if (item.thumbnail && this.isValidImageUrl(item.thumbnail)) {
      return item.thumbnail;
    }

    const firstImage = this.extractFirstImage(item.content);
    if (firstImage && this.isValidImageUrl(firstImage)) {
      return firstImage;
    }

    return '/default-blog-image.jpg';
  }

  static extractFeaturedImage(content) {
    // Look for featured image class or data attribute
    const featuredMatch = content.match(/<img[^>]*(featured|wp-post-image)[^>]+src="([^"]+)"/);
    return featuredMatch ? featuredMatch[2] : null;
  }

  static extractFirstImage(content) {
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
  }

  static extractDescription(content) {
    // Remove HTML tags and limit to 150 characters
    return content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
  }

  static isValidImageUrl(url) {
    // Check if the URL is valid and points to an image
    return url.match(/\.(jpg|jpeg|png|webp|avif|gif)$/) !== null;
  }
}

export default BlogService;
