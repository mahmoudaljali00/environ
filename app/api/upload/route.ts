import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary credentials not configured' },
        { status: 500 }
      )
    }

    // Upload to Cloudinary with signed request
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    uploadFormData.append('api_key', apiKey)
    uploadFormData.append('timestamp', Math.round(Date.now() / 1000).toString())
    uploadFormData.append('folder', 'environ')

    // Generate signature for secure upload
    const timestamp = Math.round(Date.now() / 1000)
    const crypto = require('crypto')
    const signature = crypto
      .createHash('sha256')
      .update(`folder=environ&timestamp=${timestamp}${apiSecret}`)
      .digest('hex')

    uploadFormData.append('signature', signature)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('[/] Cloudinary error:', data)
      return NextResponse.json(
        { error: data.error?.message || 'Upload failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({ url: data.secure_url })
  } catch (error) {
    console.error('[/] Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
