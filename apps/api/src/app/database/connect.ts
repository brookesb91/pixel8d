import * as mongoose from 'mongoose';

export const connect = async (uri: string, debug = false) => {
  mongoose.set('debug', debug);

  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
