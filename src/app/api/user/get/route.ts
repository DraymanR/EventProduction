import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/app/lib/db/connectDb';
import { UserModel } from '@/app/lib/models/user';
import { User, UsersResponse } from '@/app/types/user';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to the database
    await connectDb();

    // Extract query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await UserModel.find()
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean<User[]>(); // Convert to plain JavaScript object

    // Map `_id` to a string for the response
    const formattedUsers = users.map(user => ({
      ...user,
      _id: user._id?.toString() || '', // Convert to string or fallback to an empty string
    }));

    // Count total users for pagination metadata
    const total = await UserModel.countDocuments();

    // Build response
    const response: UsersResponse = {
      users: formattedUsers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
