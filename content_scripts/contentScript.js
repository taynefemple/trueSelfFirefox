let newName;
let oldName;

browser.runtime.sendMessage({ action: 'getSettings' }, (settings) => {
  newName = settings.newName.trim();
  oldName = settings.oldName.trim();
  walk(document.body);
})

const walk = (node) => {
  // This function is the bizness -- walks the dom and swaps
  // I stole this function from here:
  // http://is.gd/mwZp7E

  let child;
  let next;

  if (node.nodeName.toLowerCase() === 'input' || node.nodeName.toLowerCase() === 'textarea') {
    return;
  }

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
}

// where the magic happens...
const handleText = (textNode) => {
  let trueName = textNode.nodeValue;
  let regexp = new RegExp(`\\b(${oldName})\\b`, 'gi')

  trueName = trueName.replace(regexp, newName);
  textNode.nodeValue = trueName;
};
