const phin = require('phin');

class BhagwadGeeta {
  constructor(key) {
    if (key) this.key = key;
    else throw 'Error: Please provide the API Key in order to make the library function.'
  }


  async fetchAllChapters() {
    const res = await phin({
      method: 'GET',
      parse: 'json',
      url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/`,
      headers: {
        'X-RapidAPI-Key': this.key,
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
      }
    });

    const syllabus = [];
    
    res.body.forEach(chapter => {
      const summary = { english: chapter.chapter_summary, hindi: chapter.chapter_summary_hindi };
      const names = { sanskrit: chapter.name, english: chapter.name_translated, meaning: chapter.name_meaning };
      syllabus.push({ number: chapter.chapter_number, verseCount: chapter.verses_count, summary: summary, name: names });
    }); return syllabus;
  }


  async fetchChapter(number) {
    const res = await phin({
      method: 'GET',
      parse: 'json',
      url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${number}/`,
      headers: {
        'X-RapidAPI-Key': this.key,
        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
      }
    });

    const body = res.body;
    const result = {};

    result.number = body.chapter_number;
    result.verseCount = body.verses_count;
    result.name = { sanskrit: body.name, english: body.name_translated };
    result.summary = { english: body.chapter_summary, hindi: body.chapter_summary_hindi };
    return result;
  }


  async fetchVerse(options) {
    if (typeof options === 'string') {
      const chapter = options.split(':')[0];
      const shloka = options.split(':')[1];

      const res = await phin({
        method: 'GET',
        parse: 'json',
        url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${shloka}/`,
        headers: {
          'X-RapidAPI-Key': this.key,
          'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
        }
      });

      const body = res.body;
      const verse = {};

      verse.text = body.text;
      verse.chapter = body.chapter_number;
      verse.number = body.verse_number;
      verse.wordMeanings = body.word_meanings;
      verse.translations = { hindi: [], english: [] };

      verse.translate = (obj) => {
        const lang = obj.language;
        const limit = obj.limit;

        const translations = { hindi: [], english: [] };
        const result = [];

        body.translations.forEach(tr => {

          if (tr.language === 'hindi') {
            translations.hindi.push({ text: tr.description, author: tr.author_name })
          }

          else if (tr.language === 'english') {
            translations.english.push({ text: tr.description, author: tr.author_name })
          }
        });

        if (!['hindi', 'english'].includes(lang)) {
          console.error('TranslationError: Translations are only availible in Hindi and English yet');
        } else {

          /* For Hindi Translations */
          if (lang === 'hindi') {
            for (let x = 0; x < limit; x++) {
              const tr = translations.hindi[x];
              if (tr) {
                result.push(tr)
              }
            }
          }

          /* For English Translations */
          else if (lang === 'english') {
            for (let x = 0; x < limit; x++) {
              const tr = translations.english[x];
              if (tr) {
                result.push(tr)
              }
            }
          }

          return result;
        }
      }
      return verse;
    }
  }
}

module.exports = BhagwadGeeta;