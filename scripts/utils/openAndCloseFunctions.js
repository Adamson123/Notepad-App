export function showElement(element, active) {
  element.classList.add(active);
  
}

export function hideElement(element, active) {
  element.classList.remove(active);
  
}

export function toggleElement(element, active) {
  element.classList.toggle(active);
}

export function displayMultiElement(element, active) {
  document.querySelectorAll(`.${element}`).forEach((i, index) => {
    showElement(i, active);
  });
}

export function closeMultiElement(element, active) {
  document.querySelectorAll(`.${element}`).forEach((i, index) => {
    hideElement(i, active);
  });
}

