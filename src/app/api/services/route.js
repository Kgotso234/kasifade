import {
  getServices,
  createService,
} from "@/lib/services";

export async function GET() {
  try {
    const services = await getServices();

    return Response.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("GET /api/services error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.id || !body.name || body.price == null || !body.duration) {
      return Response.json(
        {
          success: false,
          message: "id, name, price and duration are required",
        },
        { status: 400 }
      );
    }

    const service = await createService(body);

    return Response.json(
      {
        success: true,
        service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/services error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create service",
      },
      { status: 500 }
    );
  }
}

