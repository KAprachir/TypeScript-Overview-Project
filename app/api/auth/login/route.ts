import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { IUser, PublicUser } from '@/types/user'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

function apiResponse<T> (success: boolean, data: T, message?: string) {
  return { success, data, message }
}

export async function POST (req: NextRequest) {
  try {
    let rawBody: unknown
    try {
      rawBody = await req.json()
    } catch {
      return NextResponse.json(
        apiResponse(false, null, 'Invalid JSON payload'),
        { status: 400 }
      )
    }

    const validationResult = loginSchema.safeParse(rawBody)
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0]
      return NextResponse.json(
        apiResponse(false, null, issue ? issue.message : 'Validation failed'),
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    const client = await clientPromise
    const dbName = process.env.MONGODB_DB || 'ts_auth_lab'
    const db = client.db(dbName)
    const users = db.collection<IUser>('users')

    const user = await users.findOne({ email })
    if (!user) {
      return NextResponse.json(
        apiResponse(false, null, 'Invalid email or password'),
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        apiResponse(false, null, 'Invalid email or password'),
        { status: 401 }
      )
    }

    const publicUser: PublicUser = {
      _id: user._id ? user._id.toString() : undefined,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }

    return NextResponse.json(
      apiResponse(true, publicUser, 'Logged in successfully'),
      { status: 200 }
    )
  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json(
      apiResponse(false, null, 'An internal server error occurred'),
      { status: 500 }
    )
  }
}
