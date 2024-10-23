// pages/api/auth/status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Use next-auth to get session

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req }); // Get session based on the request

    if (session && session.user && session.user.email) {
        return res.status(200).json({ email: session.user.email }); // Return user data
    }

    return res.status(401).json({ message: 'Unauthorized' }); // User is not logged in
}
