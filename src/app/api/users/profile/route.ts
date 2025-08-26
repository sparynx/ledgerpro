import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const firebaseUid = searchParams.get('firebaseUid');

    if (!firebaseUid) {
      return NextResponse.json(
        { message: 'Firebase UID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firebaseUid, email, displayName, photoURL, username, stateCode } = body;

    if (!firebaseUid || !email || !username || !stateCode) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { firebaseUid },
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.firebaseUid === firebaseUid) {
        // Update existing user profile
        const updatedUser = await prisma.user.update({
          where: { firebaseUid },
          data: {
            email,
            displayName,
            photoURL,
            username,
            stateCode,
          },
        });

        return NextResponse.json(updatedUser);
      } else {
        return NextResponse.json(
          { message: 'Username or email already exists' },
          { status: 409 }
        );
      }
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        firebaseUid,
        email,
        displayName,
        photoURL,
        username,
        stateCode,
        isAdmin: false,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error('Error creating user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 