import { inputNote } from "../noteEditor.js";




export function getTag() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);

    let startNode = range.startContainer;
    let startNode2 = range.startContainer;

    const OutterTags = [];
    const innerTags = [];
    while (startNode !== null && startNode.nodeType === Node.TEXT_NODE) {
      startNode = startNode.parentNode;
    }

    while (startNode !== null && startNode.nodeType === Node.ELEMENT_NODE) {
      OutterTags.push(startNode.tagName.toLowerCase());

      startNode = startNode.parentNode;
    }

    return OutterTags;
  }
}


function checkTags() {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.cloneContents();

  const div = document.createElement("div");
  div.appendChild(selectedText);

  //console.log(div);
  let newSelectedText = div.innerHTML;

  const heads = ["h3", "h2", "h1"];

  return { newSelectedText, range, heads };
}


export function styleText(tag) {
  if (!getTag().includes(tag)) {
    document.execCommand("formatBlock", false, tag);
  } else {
    document.execCommand("formatBlock", false, "p");
  }
}