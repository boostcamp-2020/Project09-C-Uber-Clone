import jwt from 'jsonwebtoken';

export default ({ email, isDriver }:{email:string, isDriver:boolean}) => {
  return jwt.sign({
    email,
    isDriver,
  },
  process.env.JWT_SECRET_KEY || '',
  {
    expiresIn: '1h',
  });
};
