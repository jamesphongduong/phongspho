import shortid from 'shortid';

export const filterArray = <T>(arrayOne: T[], arrayTwo: T[]) =>
  [...arrayOne].filter((e) => !arrayTwo.includes(e));

export const updateArray = (array, args) => {
  const { matcher, prop, newValue } = args;
  const index = array.findIndex((e) => e.id === matcher);
  let newArray = [...array];
  newArray[index][prop] = newValue;

  return newArray;
};

export const addIdToObjectsArray = (array) =>
  array.map((e) => ({
    ...e,
    id: shortid.generate()
  }));
