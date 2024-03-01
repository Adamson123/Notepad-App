export function showElement(element,active) {
    element.classList.add(active);
  }
  
export  function hideElement(element,active) {
    element.classList.remove(active);
  }

export function toggleElement(element,active) {
    element.classList.toggle('active')
}
