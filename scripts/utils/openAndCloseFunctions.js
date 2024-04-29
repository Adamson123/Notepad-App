export function addClass(element, active) {
  element.classList.add(active);
  
}

export function removeClass(element, active) {
  element.classList.remove(active);
  
}

export function toggleElement(element, active) {
  element.classList.toggle(active);
}

export function displayMultiElement(element, active) {
  document.querySelectorAll(`.${element}`).forEach((i, index) => {
    addClass(i, active);
  });
}

export function closeMultiElement(element, active) {
  document.querySelectorAll(`.${element}`).forEach((i, index) => {
    removeClass(i, active);
  });
}