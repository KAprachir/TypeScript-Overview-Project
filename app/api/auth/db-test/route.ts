import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET () {
  try {
    const client = await clientPromise
    await client.db('admin').command({ ping: 1 })
    return NextResponse.json({ success: true, message: 'MongoDB connected!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: 'Connection failed' },
      { status: 500 }
    )
  }
}
