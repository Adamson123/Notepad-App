export function showElement(element) {
    element.classList.add('active');
  }
  
export  function hideElement(element) {
    element.classList.remove('active');
  }

export function toggleElement(element) {
    element.classList.toggle('active')
}