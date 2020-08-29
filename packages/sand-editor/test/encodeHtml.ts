/**
 * decode Html
 * @param {*} htmlString
 */
function decodeHtml(htmlString: string): string {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  return temp.innerText || temp.textContent;
}

export { decodeHtml };
