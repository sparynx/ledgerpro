import { NextRequest, NextResponse } from 'next/server';

const IMGBB_API_KEY = '4b27bb460f5d33bf3591bbecb7a4192f';
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    // Upload to ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append('key', IMGBB_API_KEY);
    imgbbFormData.append('image', base64String);
    imgbbFormData.append('name', file.name);

    const imgbbResponse = await fetch(IMGBB_API_URL, {
      method: 'POST',
      body: imgbbFormData,
    });

    if (!imgbbResponse.ok) {
      throw new Error('Failed to upload image to ImgBB');
    }

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      throw new Error(imgbbData.error?.message || 'ImgBB upload failed');
    }

    return NextResponse.json({
      success: true,
      url: imgbbData.data.url,
      deleteUrl: imgbbData.data.delete_url,
      thumbnail: imgbbData.data.thumb?.url,
      title: imgbbData.data.title,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
