import {URL, URLSearchParams} from 'react-native-url-polyfill';

const getPokemonIdFromURL = input_url => {
  const url = new URL(input_url);
  const pathname = url.pathname.split('/');
  pathname.pop();
  return pathname.pop();
};

export {getPokemonIdFromURL};
