import clientPromise from "@/lib/mongodb";

const DB_NAME = "kasifade";
const COLLECTION_NAME = "services";

/**
 * Get all active services.
 */
export async function getServices() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection(COLLECTION_NAME)
    .find({ active: true })
    .sort({ name: 1 })
    .toArray();
}

/**
 * Get a single service by its ID.
 */
export async function getServiceById(serviceId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    id: serviceId,
    active: true,
  });
}

/**
 * Create a new service.
 */
export async function createService(service) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const now = new Date();

  const newService = {
    ...service,
    active: service.active ?? true,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection(COLLECTION_NAME).insertOne(newService);

  return newService;
}

/**
 * Update an existing service.
 */
export async function updateService(serviceId, updates) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id: serviceId },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  return result;
}

/**
 * Soft-delete a service.
 */
export async function deactivateService(serviceId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id: serviceId },
    {
      $set: {
        active: false,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    }
  );

  return result;
}