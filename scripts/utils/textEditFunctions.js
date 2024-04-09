import { inputNote } from "../noteEditor.js";

function getAllTags() {
  const selection = window.getSelection();
  if (selection.rangeCount) {
    let range = selection.getRangeAt(0);
    let node = range.startContainer;
    let allTags = [];

    while (node !== null && node.nodeType === 3) {
      node = node.parentNode;
    }

    while (node !== null && node.nodeType === 1) {
      allTags.push(node.tagName);
      node = node.parentNode;
    }

    return allTags.reverse();
  }
}

function expandSelectionToIncludeTags() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    let startNode = range.startContainer;
    let endNode = range.endContainer;

    // Move up the DOM tree to include the closest element nodes

    while (startNode.nodeType !== Node.ELEMENT_NODE) {
      startNode = startNode.parentNode;
    }
    while (endNode.nodeType !== Node.ELEMENT_NODE) {
      endNode = endNode.parentNode;
    }

    // Create a new range to include the closest tags
    const newRange = document.createRange();
    newRange.setStartBefore(startNode);
    newRange.setEndAfter(endNode);

    // Update the selection
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}


export function styleText(style) {
  const heads = ["h3", "h2", "h1"];

  if (heads.includes(style)) {
    heads.forEach(i =>{
      if (getAllTags().includes(i.toUpperCase())) {
        expandSelectionToIncludeTags();
      }
    })
  } else if (getAllTags().includes(style.toUpperCase())) {
    expandSelectionToIncludeTags();
  }
 
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.cloneContents();

 

  const div = document.createElement("div");
  div.appendChild(selectedText);


  //console.log(div);
  let newSelectedText = div.innerHTML;

  

  heads.forEach((i) => {
    if (i !== style) {
       newSelectedText = newSelectedText
        .replace(new RegExp(`<${i}>`, "g"), "")
       .replace(new RegExp(`</${i}>`, "g"), "");
     
    }
  });


  
   let test;

  if (
    newSelectedText &&
    inputNote.contains(range.commonAncestorContainer) &&
    newSelectedText !== ""
  ) {
    if (!newSelectedText.includes(`<${style}>`)) {
      //!document.queryCommandState('underline')
      const styleTag = document.createElement(style);
      styleTag.innerHTML = newSelectedText;
      test =styleTag
      range.deleteContents();
      range.insertNode(styleTag);
    } else {
      newSelectedText = newSelectedText
        .replace(new RegExp(`<${style}>`, "g"), "")
        .replace(new RegExp(`</${style}>`, "g"), "");

      const selectedT = range.createContextualFragment(newSelectedText);

      range.deleteContents();
      range.insertNode(selectedT);
      
    }
  }
  console.log(inputNote.innerHTML,test);

  // console.log(inputNote.innerHTML);
}
