interface propertyToCheckProps {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  rePassword?: string;
  carType?: string;
  plateNumber?: string;
}

export const checkValidation = ({ name = '_', phoneNumber = '_', email, password, rePassword = '_', carType = '_', plateNumber = '_' }: propertyToCheckProps, setIsValidate: any) => {
  if (rePassword !== '_' && password !== rePassword) {
    setIsValidate(false);
    return;
  }
  if (!!name && !!phoneNumber && !!email && !!password && !!rePassword && !!carType && !!plateNumber) {
    setIsValidate(true);
    return;
  }
  setIsValidate(false);
  return;
};
