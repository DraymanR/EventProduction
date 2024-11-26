import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/lib/db/connectDb';
import mongoose, { ConnectionStates } from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect(); // Ensure the database connection is established

    // Use `ConnectionStates` as the key type
    const connectionStatus: Record<ConnectionStates, string> = {
        [ConnectionStates.uninitialized]: 'Disconnected',
        [ConnectionStates.connected]: 'Connected',
        [ConnectionStates.connecting]: 'Connecting',
        [ConnectionStates.disconnecting]: 'Disconnecting',
        [ConnectionStates.disconnected]: ''
    };

    const state = mongoose.connection.readyState;

    res.status(200).json({
      message: 'Database connection health check',
      status: connectionStatus[state],
    });
  } catch (error) {
    console.error('Database connection error:', error);

    // Handle the error safely
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      message: 'Database connection failed',
      error: errorMessage,
    });
  }
}
