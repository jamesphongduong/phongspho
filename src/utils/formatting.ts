export const capitalizeFirstLetterEachWord = (string) => {
  const splitString = string.toLowerCase().split(' ');

  for (var i = 0, x = splitString.length; i < x; i++) {
    splitString[i] = splitString[i][0].toUpperCase() + splitString[i].substr(1);
  }

  return splitString.join(' ');
};
