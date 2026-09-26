import { getBarbers, createBarber } from "@/lib/barbers";

export async function GET() {
  try {
    const barbers = await getBarbers();

    return Response.json({
      success: true,
      barbers,
    });
  } catch (error) {
    console.error("GET /api/barbers error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch barbers",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.id || !body.name || !body.role) {
      return Response.json(
        {
          success: false,
          message: "id, name and role are required",
        },
        { status: 400 }
      );
    }

    const barber = await createBarber(body);

    return Response.json(
      {
        success: true,
        barber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/barbers error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create barber",
      },
      { status: 500 }
    );
  }
}