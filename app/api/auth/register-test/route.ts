import { NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  const body = await req.json()

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      {
        success: false,
        message: 'Missing request fields'
      },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Validation passed!'
  })
}
