import { inputNote, formatText, lists , insertLinkBtn, toHeader } from "../noteEditor.js";
import { getTag } from "./textEditFunctions.js";

export function listCenterFix(align) {
    let ul = inputNote.querySelectorAll("ul");
    let ol = inputNote.querySelectorAll("ol");
  
    ul.forEach((u) => {
      const span = u.querySelectorAll("span");
      span.forEach((s) => {
        if (s.style.textAlign === align) {
          u.style.textAlign = align;
        }
      });
    });
  
    ol = inputNote.querySelectorAll("ol");
    ol.forEach((o) => {
      const span = o.querySelectorAll("span");
      span.forEach((s) => {
        if (s.style.textAlign === align) {
          o.style.textAlign = align;
        }
      });
    });
  
    const inputNoteDivs = document.querySelectorAll("div");
  
    inputNoteDivs.forEach((d) => {
      const span = d.querySelectorAll("span");
      const li = d.querySelectorAll("li");
      const ad = d.querySelectorAll("div");
      // let all = d.querySelectorAll('*')
      span.forEach((s) => {
        if (s.style.textAlign === align && ad.length === 0) {
          d.style.textAlign = align;
          all.style.textAlign = align;
        }
      });
  
      li.forEach((l) => {
        if (l.style.textAlign === align && ad.length === 0) {
          d.style.textAlign = align;
          // all.style.textAlign = align
        }
      });
    });
  }


export function markToolBeenUsed() {
   
    formatText.forEach((i) => {
      if (getTag().includes(i.dataset.tag)) {
        // bold.classlist.add('toolIsActive')
        i.classList.add("toolIsActive");
      } else {
        i.classList.remove("toolIsActive");
      }
  
    });
  
    lists.forEach((i) => {
      if (getTag().includes(i.dataset.tag)) {
        // bold.classlist.add('toolIsActive')
        i.classList.add("toolIsActive");
      } else {
        i.classList.remove("toolIsActive");
      }
  
    });
  
  
    if (getTag().includes('a')) {
      insertLinkBtn.classList.add('toolIsActive')
    }else{
      insertLinkBtn.classList.remove("toolIsActive");
    }
  
    toHeader.forEach((i) => {
      if (getTag().includes(i.dataset.element)) {
        // bold.classlist.add('toolIsActive')
        i.classList.add("toolIsActive");
      } else {
        i.classList.remove("toolIsActive");
      }
  
    });
  
  }
  