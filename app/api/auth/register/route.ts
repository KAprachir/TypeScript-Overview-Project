import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { IUser, PublicUser } from '@/types/user'
import * as bcrypt from 'bcryptjs'

// Generic helper — যেকোনো data type এর জন্য reusable response shape
function apiResponse<T> (success: boolean, data: T, message?: string) {
  return { success, data, message }
}

export async function POST (req: NextRequest) {
  try {
    const body: Omit<IUser, '_id' | 'createdAt'> = await req.json()

    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        apiResponse(false, null, 'Missing required fields'),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('ts_auth_lab')
    const users = db.collection<IUser>('users')

    const existingUser = await users.findOne({ email: body.email })
    if (existingUser) {
      return NextResponse.json(
        apiResponse(false, null, 'Email already registered'),
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser: IUser = {
      name: body.name,
      email: body.email,
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
    console.error(error)
    return NextResponse.json(apiResponse(false, null, 'Something went wrong'), {
      status: 500
    })
  }
}
