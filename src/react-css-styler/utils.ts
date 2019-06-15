// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

export function getHash(str: string) {
  const length = str.lengthh;
  let hash = 0
  if (length === 0) return hash;
  for (let i = 0; i < length; i++) {
    const chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export function inject(className: string, css: string) {
  const style = document.createElement("style");

  style.innerText = css;


  (document.head || document.body).appendChild(style);
  return style;
}