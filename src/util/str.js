export function unescape (text) {
  let res = text || '';
  [
    ['&lt;', '<'],
    ['&gt;', '>']
  ].forEach(pair => {
    res = res.replace(new RegExp(pair[0], 'ig'), pair[1])
  })

  return res;
}