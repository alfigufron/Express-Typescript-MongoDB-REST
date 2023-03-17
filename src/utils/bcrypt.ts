import * as bcrypt from "bcrypt";

const saltRounds = 12;

const EncryptionUtils = {
  hash: async (value: string) => await bcrypt.hash(value, saltRounds),
};

export default EncryptionUtils;
