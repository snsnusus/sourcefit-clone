export const getPrivateRoomId = (idA: string, idB: string): string => {
  return [idA, idB].sort().join('-');
};
