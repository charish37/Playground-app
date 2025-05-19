// appwrite.js
import { Client, Account, Databases } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') 
  .setProject('682a02dd0007bb82a2c0')      

export const account = new Account(client);
export const database = new Databases(client);
