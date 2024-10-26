import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

dbConnect();

export async function GET() {
  try {
    const postItems = await PostItem.find().select('-__v');
    return new Response(JSON.stringify(postItems), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const postItem = await request.json();
    const savedItem = await new PostItem({ ...postItem }).save();

    return new Response(JSON.stringify(savedItem), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 201,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postItem = await PostItem.findByIdAndDelete(params.id);
    if (!postItem) {
      return new Response(
        JSON.stringify({ message: 'No Item Found for this ID' }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(postItem), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
      status: 500,
    });
  }
}