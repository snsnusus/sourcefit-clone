export * from './chat.util';
export * from './cloudinary.util';
export * from './deep-search';
export * from './file.util';
export * from './loadable';

export const generateMockEmployeeId = (departmentCode: string): string => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `${departmentCode}-${currentYear}-${randomNum}`;
};
