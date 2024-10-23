// app/api/user/[id]/route.ts
import User from '../../../../../models/Users';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return new Response(
                JSON.stringify({ message: 'User not found' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 404,
                }
            );
        }

        return new Response(
            JSON.stringify(user),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error fetching user' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500,
            }
        );
    }
}
