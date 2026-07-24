import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import * as bcrypt from 'bcryptjs'

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

  const client = await clientPromise
  const db = client.db('ts_auth_lab')
  const users = db.collection('users')

  const existingUser = await users.findOne({
    email: body.email
  })
  if (existingUser) {
    return NextResponse.json(
      { success: false, message: 'Email already registered' },
      { status: 409 } // 409 = Conflict, mane already exists
    )
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const result = await users.insertOne({
    name: body.name,
    email: body.email,
    password: hashedPassword, // ekhon plain text, next step e hash korbo
    createdAt: new Date()
  })

  return NextResponse.json({
    success: true,
    message: 'User saved!',
    insertedId: result.insertedId
  })
}
