import clientPromise from "@/lib/mongodb";

const DB_NAME = "kasifade";
const COLLECTION_NAME = "customers";

/**
 * Find a customer by email.
 */
export async function getCustomerByEmail(email) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    email: email.toLowerCase().trim(),
  });
}

/**
 * Find a customer by phone number.
 */
export async function getCustomerByPhone(phone) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    phone,
  });
}

/**
 * Get a customer by MongoDB ID.
 */
export async function getCustomerById(customerId) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  return db.collection(COLLECTION_NAME).findOne({
    id: customerId,
  });
}

/**
 * Create a customer.
 */
export async function createCustomer(customer) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const now = new Date();

  const newCustomer = {
    ...customer,
    email: customer.email?.toLowerCase().trim(),
    createdAt: now,
    updatedAt: now,
  };

  await db.collection(COLLECTION_NAME).insertOne(newCustomer);

  return newCustomer;
}

/**
 * Update customer information.
 */
export async function updateCustomer(customerId, updates) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id: customerId },
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