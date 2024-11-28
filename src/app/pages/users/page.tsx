import connectDb from '@/app/lib/db/connectDb';
import { UserModel } from '@/app/lib/models/user';
import { User } from '@/app/types/user';

async function getUsers(): Promise<User[]> {
  try {
    await connectDb();
    const users = await UserModel.find().lean<User[]>();
    return users.map(user => ({
      ...user,
      _id: user._id ? user._id.toString() : '', // Provide fallback if _id is undefined
    }));
  } catch (error) {
    console.error('Error in getUsers:', error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id || 'unknown'}> 
            {`${user.firstName} ${user.lastName}`} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
