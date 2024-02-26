import RouterHandler from './router.js'

window.onhashchange = () => {  // URL folloing the # symbol changed https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
  setActiveLink();
}

function setActiveLink() {  // Set the link to active
  const links = document.querySelectorAll('.header-link');
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    const currentPath = window.location.hash;
    if (currentPath === linkPath) {
      link.classList.add('active');  
    } else {
      link.classList.remove('active');         
    }
  });
}

class App {
  constructor() {
    new RouterHandler();
  }  
}

new App();