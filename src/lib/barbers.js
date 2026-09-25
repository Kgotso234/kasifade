import clientPromise from "@/lib/mongodb";

const DB_NAME = "kasifade";
const COLLECTION_NAME = "barbers";

/**
 * Get all active barbers.
 */
export async function getBarbers() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection(COLLECTION_NAME)
    .find({ active: true })
    .sort({ name: 1 })
    .toArray();
}

/**
 * Get a single barber by ID.
 */
export async function getBarberById(barberId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    id: barberId,
    active: true,
  });
}

/**
 * Get barbers who offer a specific service.
 */
export async function getBarbersForService(serviceId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db
    .collection(COLLECTION_NAME)
    .find({
      serviceIds: serviceId,
      active: true,
    })
    .sort({ name: 1 })
    .toArray();
}

/**
 * Create a new barber.
 */
export async function createBarber(barber) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const now = new Date();

  const newBarber = {
    ...barber,
    active: barber.active ?? true,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection(COLLECTION_NAME).insertOne(newBarber);

  return newBarber;
}

/**
 * Update a barber.
 */
export async function updateBarber(barberId, updates) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id: barberId },
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
 * Deactivate a barber without deleting their record.
 */
export async function deactivateBarber(barberId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id: barberId },
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