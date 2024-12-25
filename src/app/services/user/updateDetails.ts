import { User } from '@/app/types/user';
import { getBaseUrl  } from '@/app/services/config/axios';

const baseUrl = getBaseUrl();

export const updateUserDetails = async (userData: Partial<User>): Promise<{ user: User; message: string }> => {
  try {
    const response = await fetch(`${baseUrl}/api/users/put`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user details');
    }

    const data = await response.json();
    return {
      user: data.user,
      message: data.message
    };
  } catch (error) {
    throw error;
  }
};