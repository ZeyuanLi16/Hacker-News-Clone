import RouterHandler from './router.js'

window.onhashchange = () => {  // link changed
  setActiveLink();
}

function setActiveLink() {  // set the link to active
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