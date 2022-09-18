## A Library for Bhagwad Geeta
A wrapper of [the Bhagwad Geeta API](https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3). This library is designed to make it easier for you to use the API. 

## Features
- easy to understand and use
- suits best for making discord bots
- uses async/await for methods

### Setup
- Importing the library
```js
const BhagwadGeeta = require('bhagwad-geeta');
const bg = new BhagwadGeeta('api url');
```
Here, the `api url` is required. You can get one by signing up [here](https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3). In the docs your api key will be visible afer signing up.

### Getting a Shloka (verse)
The `verse` param we took is not just a verse. It is an object containing more properties. In the code below you're gonna know about the verse object.
```js
bg.fetchVerse('2:64').then(verse => {
  const translations = verse.translate({ lamguage: 'english', limit: 2 });
  
  translations.forEach(translation => {
    const text = translation.text; // The translation
    const author = translation.author; // The one who translated it
    console.log(`${text} \n Translated by ${author}`);
  });

  // The Sanskrit Shaloka
  const verseText = verse.text;  
  // रागद्वेषवियुक्तैस्तु विषयानिन्द्रियैश्चरन्।
  // आत्मवश्यैर्विधेयात्मा प्रसादमधिगच्छति।।2.64।

  // The word meanings of the shloka :
  const wordMeanings = verse.wordMeaning;  
})
```

- the reference you would provide should be like `chapter:verse` where both chapter & verse are in numbers
- for example, in `1:2`, 1 is the chapter number and 2 is the shloka number.
- the `verse.translate` it translates the fetched verse. Currently only two languages are supported, which are Hindi and English.
- the `limit` option is given so that you can fetch multiple translations by multiple scholars. Each shloka has around 10 - 15 different translations max.
  - due to the `limit` option, the translation(s) are provided in array format. Means even if you've set limit to `1`, you need to treat it as array. Like `arr[0]`

### Fetching Chapter
The code below fetches chapter and some information about it.
```js
bg.fetchChapter('2').then(chapter => {
  /* Name */
  const english_name = chapter.name.english; // Sankhya Yoga
  const sanskrit_name = chapter.name.sanskrit; // सांख्ययोग'

  /* Summary */
  const english_summary = chapter.summary.english;
  const hindi_summary = chapter.summary.hindi;

  /* General Info */
  const verses = chapter.verseCount; // 72
  const number = chapter.numer; // 2
});
```
- the chapter name is availibe in two lamguages - Hindi and Sanskrit
- you can get summary of a chapter in two languages - Hindi and English
- i hope the general info part is self-explanatory

### Need help?
You can contact me if you need help regarding this library. Suggestions, pull requests and friend requests are welcomed.
- Discord: **Sxlitude#8885**
- Github: Sxlitude
- NPM: sxlitudee