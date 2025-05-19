import { account, database } from '../appwrite';

export const loginUser = async (email, password) => {
  return await account.createSession(email, password); // Correct method for login
};

export const registerUser = async (email, password, name, phone) => {
  // Use "unique" to let Appwrite generate a valid user ID
  const user = await account.create('unique', email, password, name); // Register the user

  // Save the phone number in a database collection
  const phoneData = await database.createDocument(
    '682a93da001dd503aa9a', 
    '682a94ba0005528d4c4a',
    user.$id, // Use the user ID as the document ID
    { phone } // Save the phone number
  );

  return { userId: user.$id, email: user.email, name: user.name, phone: phoneData.phone }; // Return user details
};

export const logoutUser = async () => {
  return await account.deleteSession('current');
};

export const getUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};