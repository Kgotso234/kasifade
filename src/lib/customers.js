import clientPromise from "@/lib/mongodb";

const DB_NAME = "kasifade";
const COLLECTION_NAME = "customers";

export async function createCustomer(customer) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const now = new Date();
  const newCustomer = { ...customer, createdAt: now, updatedAt: now };
  await db.collection(COLLECTION_NAME).insertOne(newCustomer);
  return newCustomer;
}

export async function getCustomerByPhone(phone) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME).findOne({ phone });
}

export async function getCustomerByEmail(email) {
  if (!email) return null;
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME).findOne({ email });
}

export async function updateCustomer(id, updates) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION_NAME).findOneAndUpdate(
    { id },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
}