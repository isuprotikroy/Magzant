class AuthService {
  // Use environment variables for credentials
  static ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
  static ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // Comprehensive environment configuration logging
  static logEnvironmentConfig() {
    console.group('🔍 Authentication Environment Configuration');
    console.log('📋 Admin Username (from .env):', this.ADMIN_USERNAME);
    console.log('🔑 Admin Password Length:', 
      this.ADMIN_PASSWORD ? this.ADMIN_PASSWORD.length : '❌ Not set'
    );
    console.log('🌐 Full Environment:', import.meta.env);
    console.groupEnd();
  }

  // Robust token-based authentication
  static login(username, password) {
    // Comprehensive logging for login attempt
    console.group('🔐 Authentication Attempt');
    console.log('📝 Input Username:', username);
    console.log('🔑 Input Password Length:', password ? password.length : '❌ No password');

    try {
      // Validate inputs with detailed logging
      if (!username || !password) {
        console.error('❌ Invalid Input: Username or Password missing');
        console.groupEnd();
        return false;
      }

      // Normalize and trim inputs
      const trimmedUsername = username.trim().toLowerCase();
      const trimmedPassword = password.trim();

      // Log comparison details
      console.log('🕵️ Credential Comparison:');
      console.log('Expected Username:', this.ADMIN_USERNAME.trim().toLowerCase());
      console.log('Input Username:', trimmedUsername);
      console.log('Username Match:', 
        trimmedUsername === this.ADMIN_USERNAME.trim().toLowerCase()
      );
      console.log('Password Length Match:', 
        trimmedPassword.length === this.ADMIN_PASSWORD.trim().length
      );

      // Validate credentials with extreme precision
      const isUsernameValid = 
        trimmedUsername === this.ADMIN_USERNAME.trim().toLowerCase();
      const isPasswordValid = 
        trimmedPassword === this.ADMIN_PASSWORD.trim();

      if (isUsernameValid && isPasswordValid) {
        // Generate secure token with a consistent, predictable structure
        const token = this.generateSecureToken();
        
        // Store authentication details
        localStorage.setItem('adminToken', token);
        localStorage.setItem('isAdminAuthenticated', 'true');
        localStorage.setItem('authTimestamp', Date.now().toString());
        
        console.log('✅ Authentication Successful');
        console.log('🎫 Token Generated:', token);
        console.groupEnd();
        
        return true;
      } else {
        console.error('❌ Authentication Failed');
        console.error('Username Valid:', isUsernameValid);
        console.error('Password Valid:', isPasswordValid);
        console.groupEnd();
        
        return false;
      }
    } catch (error) {
      console.error('🆘 Unexpected Authentication Error:', error);
      console.groupEnd();
      return false;
    }
  }

  static logout() {
    try {
      console.group('🚪 Logout Process');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('isAdminAuthenticated');
      localStorage.removeItem('authTimestamp');
      console.log('✅ Logout Completed Successfully');
      console.groupEnd();
    } catch (error) {
      console.error('❌ Logout Failed:', error);
    }
  }

  static isAuthenticated() {
    console.group('🔍 Authentication Verification');
    
    const token = localStorage.getItem('adminToken');
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    const authTimestamp = localStorage.getItem('authTimestamp');

    console.log('🔑 Token Exists:', !!token);
    console.log('🚦 Authentication Flag:', isAuth);
    console.log('⏰ Auth Timestamp:', authTimestamp);

    // Validate authentication
    if (!isAuth || !token || !authTimestamp) {
      console.log('❌ Authentication Failed: Missing Required Items');
      console.groupEnd();
      return false;
    }

    // Check session duration
    const sessionDuration = Date.now() - parseInt(authTimestamp);
    const MAX_SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    const isValid = this.validateToken(token) && sessionDuration < MAX_SESSION_DURATION;
    
    console.log('🕰️ Session Duration:', sessionDuration, 'ms');
    console.log('✅ Overall Authentication:', isValid);
    console.groupEnd();

    return isValid;
  }

  // Secure token generation with a consistent, simple structure
  static generateSecureToken() {
    const timestamp = Date.now();
    const username = this.ADMIN_USERNAME;
    const secretKey = 'SOCIAL_SANSTHA_SECRET';
    
    // Create a simple, consistent token structure
    return btoa(JSON.stringify({
      timestamp,
      username,
      secretKey
    }));
  }

  // Enhanced token validation
  static validateToken(token) {
    console.group('🔐 Token Validation');
    
    if (!token) {
      console.log('❌ No Token Provided');
      console.groupEnd();
      return false;
    }
    
    try {
      // Decode and parse the token
      const decodedToken = JSON.parse(atob(token));
      
      // Validate token structure and contents
      if (!decodedToken.timestamp || 
          !decodedToken.username || 
          !decodedToken.secretKey) {
        console.error('❌ Invalid Token Structure');
        console.groupEnd();
        return false;
      }

      // Check username matches
      if (decodedToken.username !== this.ADMIN_USERNAME) {
        console.error('❌ Token Username Mismatch');
        console.groupEnd();
        return false;
      }

      // Check secret key
      if (decodedToken.secretKey !== 'SOCIAL_SANSTHA_SECRET') {
        console.error('❌ Invalid Secret Key');
        console.groupEnd();
        return false;
      }

      const tokenAge = Date.now() - decodedToken.timestamp;
      const MAX_TOKEN_AGE = 24 * 60 * 60 * 1000; // 24 hours
      
      const isValid = tokenAge < MAX_TOKEN_AGE;
      
      console.log('⏳ Token Age:', tokenAge, 'ms');
      console.log('✅ Token Valid:', isValid);
      console.groupEnd();

      return isValid;
    } catch (error) {
      console.error('🆘 Token Validation Error:', error);
      console.groupEnd();
      return false;
    }
  }
}

export default AuthService;
