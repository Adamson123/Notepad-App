
import { addClass, removeClass } from "./utils/openAndCloseFunctions.js"
export const dropMenu = document.querySelector(".dropMenu-js");
const dropMenuIcon = document.querySelector(".dropMenuIcon-js");
//checks if dropmenu is open or closed
let menuClosed = true;

export function menu(){

// Event listener for opening the drop menu on smaller devices
dropMenuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    if (menuClosed) {
      addClass(dropMenu, "active");
  
      document.addEventListener("click", (event) => {
        event.stopPropagation();
  
        removeClass(dropMenu, "active");
  
        menuClosed = true;
      });
  
      menuClosed = false;
    } else {
      removeClass(dropMenu, "active");
      menuClosed = true;
    }
  });
  
  
  
  // Event listener to close drop menu on window resize to a bigger screen
  
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 625) {
      removeClass(dropMenu, "active");
      menuClosed = true;
    } else {
      if (menuClosed === false) {
        addClass(dropMenu, "active");
      }
    }
  });
}