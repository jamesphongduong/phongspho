export const filterData = <T>(arrayOne: T[], arrayTwo: T[]) =>
  [...arrayOne].filter((e) => !arrayTwo.includes(e));
