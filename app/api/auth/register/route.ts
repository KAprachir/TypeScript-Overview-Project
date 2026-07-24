import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { IUser, PublicUser } from '@/types/user'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
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
        apiResponse(false, null, 'Invalid JSON body'),
        { status: 400 }
      )
    }

    const validationResult = registerSchema.safeParse(rawBody)

    if (!validationResult.success) {
      const issue = validationResult.error.issues[0]
      return NextResponse.json(
        apiResponse(false, null, issue ? issue.message : 'Validation failed'),
        { status: 400 }
      )
    }

    const { name, email, password } = validationResult.data

    const client = await clientPromise
    const dbName = process.env.MONGODB_DB || 'ts_auth_lab'
    const db = client.db(dbName)
    const users = db.collection<IUser>('users')

    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        apiResponse(false, null, 'Email already registered'),
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: IUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    }

    const result = await users.insertOne(newUser)

    const publicUser: PublicUser = {
      _id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    }

    return NextResponse.json(apiResponse(true, publicUser), { status: 201 })
  } catch (error) {
    console.error('Registration Error:', error)
    return NextResponse.json(
      apiResponse(false, null, 'An internal server error occurred'),
      { status: 500 }
    )
  }
}
