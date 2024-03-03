export function showElement(element, active, notActive) {
  element.classList.remove(notActive);
  element.classList.add(active);
}

export function hideElement(element, notActive , active) {
  element.classList.remove(active);
  element.classList.add(notActive);

}

export function toggleElement(element, active) {
  element.classList.toggle("active");
}


export function elementsToggleDisplay(element,firstClass,secondClass) {

  document.querySelectorAll(`.${element}`).forEach((i,index) =>{
    hideElement(i,`${firstClass}`,`${secondClass}`)
  })
  
}