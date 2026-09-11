export const getPrivateRoomId = (idA: string, idB: string): string =>
  [idA, idB].sort().join('-');
