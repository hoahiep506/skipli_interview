export const getRandomCode = () => {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export const isValidPhoneNumber = (phoneNumber: string) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
    phoneNumber
  );
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\s+|\+/g, '')?.trim();
};
