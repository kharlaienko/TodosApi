import * as bcrypt from 'bcrypt';

const saltOrRounds = 10

export const checkIsCompare = async (value: string, hash: string): Promise<boolean> => {
   return await bcrypt.compare(value, hash);
}

export const getHash = async (value: string): Promise<string> => {
   return await bcrypt.hash(value, saltOrRounds);
}
