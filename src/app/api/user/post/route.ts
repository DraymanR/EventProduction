import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/app/lib/db/connectDb';
import { UserModel } from '@/app/lib/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb(); 

  if (req.method === 'POST') {
    try {
      const { firstName, lastName, userName, email, password, title, phone, language, address } = req.body;

      // Create a new user
      const newUser = new UserModel({
        firstName,
        lastName,
        userName,
        email,
        password,
        title,
        phone,
        language,
        address,
      });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
