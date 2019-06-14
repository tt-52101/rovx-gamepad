import { Store } from './services/store';
import { mapping_pl } from './translate.pl';
import { mapping_en } from './translate.en';

const mapping = {
  en: mapping_en,
  pl: mapping_pl
};

export function translate(map) {
  let language = 'en';
  const { value } = Store.localisation;
  // if (value && value.lang && mapping[value.lang]) {
  //   language = value.lang;
  // }
  if (map && mapping[language][map]) {
    return mapping[language][map];
  }
  return map;
}
