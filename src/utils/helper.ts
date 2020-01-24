export const filterArray = <T>(arrayOne: T[], arrayTwo: T[]) =>
  [...arrayOne].filter((e) => !arrayTwo.includes(e));
