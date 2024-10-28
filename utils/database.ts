import mongoose, { ConnectOptions } from "mongoose";

let connection: Promise<typeof import('mongoose')> | null = null;
export const Connect = async (connectionOptions?: ConnectOptions) => {
    let url = '';
    if (process.env.MONGO_URL) {
        url = process.env.MONGO_URL;
    } else if (process.env.STAGE === 'dev') {
        const dbName = process.env.MONGO_DATABASE;
        console.log('=> mongo url set for development');
        url = `mongodb://localhost:27017/${dbName}`;
        console.log('connection options', connectionOptions);
        
    } else if (process.env.STAGE === 'production') {
        console.log('=> mongo url set for production');
        url = ``;
    } else if(process.env.STAGE === 'staging')  {
        console.log('=> mongo url set for staging');
        url = ``;
    }
    mongoose.set('strictQuery', false);
  if (connection === null || mongoose.connection.readyState !== 1) {
    console.log('=> using new database connection');
    connection = mongoose.connect(url, connectionOptions).then(() => mongoose);
    await connection;
  } else {
    console.log('=> reusing existing database connection');
  }

  return connection;
};