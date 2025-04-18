import { v4 as uuidv4 } from 'uuid';

class AIBlogService {
  static feeds = [
    'https://www.socialmediaexaminer.com/feed/',
    'https://www.searchenginejournal.com/feed/',
    'https://neilpatel.com/blog/feed/',
    'https://www.digitalmarketer.com/blog/feed/',
    'https://www.wordstream.com/feed'
  ];

  static async generateBlog() {
    try {
      // 1. Get random feed
      const feedUrl = this.feeds[Math.floor(Math.random() * this.feeds.length)];
      
      // 2. Fetch and parse RSS feed using RSS to JSON API (free)
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feed');
      }

      const data = await response.json();
      
      if (data.status !== 'ok' || !data.items || data.items.length === 0) {
        throw new Error('No items in feed');
      }

      // 3. Get random post from feed
      const post = data.items[Math.floor(Math.random() * data.items.length)];
      
      // 4. Generate content using HuggingFace
      const content = await this.generateContent(post.title);
      
      // 5. Get an AI-generated image for the post
      const imageUrl = await this.getImage(post.title);

      // 6. Create blog post object
      const blogPost = {
        id: uuidv4(),
        title: post.title,
        content: content,
        description: this.extractDescription(content),
        published: new Date(post.pubDate).toLocaleDateString(),
        author: post.author || 'Marketing Expert',
        image: imageUrl,
        source: data.feed.title,
        createdAt: new Date().toISOString(),
        originalLink: post.link
      };

      // 7. Save to local storage
      this.saveBlogPost(blogPost);

      return blogPost;
    } catch (error) {
      console.error('Error in generateBlog:', error);
      throw error;
    }
  }

  static async createPost(postData) {
    try {
      // Generate content using HuggingFace
      const content = await this.generateContent(postData.title);
      
      // Get an AI-generated image for the post
      const imageUrl = await this.getImage(postData.title);

      // Create the blog post object
      const blogPost = {
        id: uuidv4(),
        title: postData.title,
        content: content,
        description: this.extractDescription(content),
        published: new Date().toLocaleDateString(),
        author: postData.author || 'Admin',
        image: imageUrl,
        source: 'Social Sanstha',
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      this.saveBlogPost(blogPost);

      return blogPost;
    } catch (error) {
      console.error('Error in createPost:', error);
      throw error;
    }
  }

  static async generateContent(topic) {
    const prompt = `Write a comprehensive blog post about ${topic}. The post should be informative, engaging, and well-structured. Include an introduction, main points, and a conclusion.`;
    
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 800,
              temperature: 0.7,
              top_p: 0.9,
              do_sample: true,
              return_full_text: false,
            },
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate content');
      }

      const data = await response.json();
      
      if (!data || !data[0] || !data[0].generated_text) {
        throw new Error('Invalid response from AI model');
      }

      // Clean up the generated text
      let content = data[0].generated_text.trim();
      
      // Format the content with HTML
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      content = paragraphs.map(p => `<p>${p.trim()}</p>`).join('\n\n');

      return content;
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  static async generatePost(topic) {
    try {
      // Generate content using HuggingFace
      const content = await this.generateContent(topic);
      
      // Get an AI-generated image for the post
      const imageUrl = await this.getImage(topic);

      // Create the blog post object
      const blogPost = {
        id: uuidv4(),
        title: topic,
        content: content,
        description: this.extractDescription(content),
        published: new Date().toLocaleDateString(),
        author: 'AI Writer',
        image: imageUrl,
        source: 'Generated by AI',
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      this.saveBlogPost(blogPost);
      return blogPost;
    } catch (error) {
      console.error('Error in generatePost:', error);
      throw error;
    }
  }

  static async getImage(topic) {
    try {
      const keywords = [
        'digital marketing',
        'social media',
        'business',
        'technology',
        'office',
        'success',
        'innovation',
        'startup'
      ];
      
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const searchQuery = `${topic} ${randomKeyword}`;

      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
            'Cache-Control': 'no-cache'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }

      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.error('Error fetching image:', error);
      // Return a default image if the API fails
      return 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000';
    }
  }

  static extractDescription(content) {
    // Remove HTML tags and get first 150 characters
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.substring(0, 150) + '...';
  }

  static saveBlogPost(blogPost) {
    try {
      const posts = JSON.parse(localStorage.getItem('aiBlogPosts') || '[]');
      posts.unshift(blogPost);
      // Keep only the last 50 posts to manage storage
      const limitedPosts = posts.slice(0, 50);
      localStorage.setItem('aiBlogPosts', JSON.stringify(limitedPosts));
    } catch (error) {
      console.error('Error saving blog post:', error);
      throw new Error('Failed to save blog post');
    }
  }

  static getBlogPosts() {
    try {
      return JSON.parse(localStorage.getItem('aiBlogPosts') || '[]');
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return [];
    }
  }

  static deletePost(postId) {
    try {
      const posts = JSON.parse(localStorage.getItem('aiBlogPosts') || '[]');
      const updatedPosts = posts.filter(post => post.id !== postId);
      localStorage.setItem('aiBlogPosts', JSON.stringify(updatedPosts));
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  }

  static scheduleNextPost() {
    // Generate a new post every 24 hours
    setInterval(async () => {
      try {
        await this.generateBlog();
      } catch (error) {
        console.error('Error in scheduled blog generation:', error);
      }
    }, 24 * 60 * 60 * 1000);
  }
}

export default AIBlogService;
