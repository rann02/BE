import bcrypt from "bcryptjs";

const hash = (password: string) => {
  return bcrypt.hashSync(password, 8);
};

const compare = (password: string, hashpassword: string) => {
  return bcrypt.compareSync(password, hashpassword);
};

export { hash, compare };
