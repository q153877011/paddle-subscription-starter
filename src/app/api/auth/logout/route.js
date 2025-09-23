import { createSupabaseClient } from '../../lib/supabase.js';

export async function POST(request) {
  // Set CORS headers (development mode)
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // Get the authorization token from the request
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      // Initialize Supabase client
      const supabase = createSupabaseClient();
      
      // Use Supabase to logout
      await supabase.auth.admin.signOut(token);
    }
    
    // Even if there's no token or logout fails, we still return success because the client has already cleared the local token
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Logged out successfully'
      }),
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Error processing logout request:', error);
    // Even if an error occurs, we still return success because the client has already cleared the local token
    return new Response(
      JSON.stringify({ success: true, message: 'Logged out successfully' }),
      { status: 200, headers }
    );
  }
} 