import BadWordsNext from "bad-words-next";

import ru from 'bad-words-next/data/ru.json';
import en from 'bad-words-next/data/en.json';

export const badWords = new BadWordsNext();
badWords.add(ru);
badWords.add(en);