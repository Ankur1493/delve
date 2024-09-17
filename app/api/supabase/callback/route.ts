import { NextResponse } from 'next/server'
import { connectSupabase } from '@/data/supabase'
import { auth } from '@/auth'

const config = {
  clientId: process.env.SUPA_CONNECT_CLIENT_ID!,
  clientSecret: process.env.SUPA_CONNECT_CLIENT_SECRET!,
  tokenUri: 'https://api.supabase.com/v1/oauth/token',
  redirectUri: process.env.SUPA_REDIRECT_URI!,
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  const session = await auth();
  const userId = session?.user?.id

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
  }
  if (!userId) {
    return NextResponse.json({ error: 'No userId code provided' }, { status: 401 })
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await fetch(config.tokenUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.redirectUri,
    }),
  })

  const tokens = await tokenResponse.json()
  const accessToken = tokens.access_token

  const supabaseConnected = await connectSupabase({ userId, accessToken })

  if (!supabaseConnected.status) {
    return NextResponse.json({ error: 'failed to connect, try again' }, { status: 200 })
  }
  return NextResponse.redirect("https://delve-kohl.vercel.app/dashboard")
}
