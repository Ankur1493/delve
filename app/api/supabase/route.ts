import { NextResponse } from 'next/server'

const config = {
  clientId: process.env.SUPA_CONNECT_CLIENT_ID!,
  clientSecret: process.env.SUPA_CONNECT_CLIENT_SECRET!,
  authorizationEndpointUri: 'https://api.supabase.com/v1/oauth/authorize',
  tokenUri: 'https://api.supabase.com/v1/oauth/token',
  redirectUri: process.env.SUPA_REDIRECT_URI!,
}

export async function GET() {
  // Create the OAuth authorization URL
  const authUrl = `${config.authorizationEndpointUri}?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=all`

  // Redirect the user to the Supabase OAuth consent page
  return NextResponse.redirect(authUrl)
}
