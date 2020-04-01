export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();

export const generateCleanTags = str => {
  console.log(str);
  let arr = str.split(',');

  let result = arr.map(el => {
    console.log();
    if (el.trim().length > 0) {
      return el.trim();
    }
  });
  console.log(result);
  return result;
};

export const toTitleCase = str => {
  let strArr = str.trim().split(' ');
  let result = [];
  if (str.length > 0) {
    strArr.forEach(w => {
      if (w.length > 0) {
        let wordCap = w[0].toUpperCase() + w.slice(1);
        result.push(wordCap);
      }
    });
    return result.join(' ');
  } else {
    return '';
  }
};
