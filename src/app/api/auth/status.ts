// pages/api/auth/status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for session management

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure the request method is GET
    if (req.method === 'GET') {
        // Check the user's session
        const session = await getSession({ req }); // Get session data for the request

        if (session) {
            // User is logged in
            return res.status(200).json({ isLoggedIn: true });
        } else {
            // User is not logged in
            return res.status(200).json({ isLoggedIn: false });
        }
    } else {
        // Method not allowed
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
