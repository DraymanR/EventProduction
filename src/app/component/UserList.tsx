'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/app/types/user';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<{ users: User[] }>('/api/users');
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user._id?.toString()}>
          {`${user.firstName} ${user.lastName}`}
        </li>
      ))}
    </ul>
  );
}
