import { badWords } from './badword.library';

export const checkForBadWords = (name: string, value: string) => {
  switch (name) {
    case 'lastName':
      return badWords.check(value);
    case 'firstName':
      return badWords.check(value);
    case 'middleName':
      return badWords.check(value);
    default:
      return false;
  }
};