import Stories from './pages/stories.js';
import Item from './pages/item.js';
import view from "../utils/view.js"

const router = new Navigo(null, true, '#');
/*
  More on the documentation, I did not found a way to do routes that is / or "". 
  The constructor of the library accepts three arguments - root, useHash(default false) and hash(default #). The first one is the main URL of your application. 
  If you call the constructor without parameters then Navigo figures out the root URL based on your routes. 
  However, this proves to lead to bugs so I strongly recommend to set a root value.
*/

export default class RouterHandler {
  constructor() {
    this.createRoutes()  
  }  
  
  createRoutes() {
    const routes = [
      { path: '/', page: Stories }, // Fetch the stories from the API
      { path: '/new', page: Stories },
      { path: '/ask', page: Stories },
      { path: '/show', page: Stories },
      { path: '/favorites', page: Stories }, // User favorite story
      { path: '/item', page: Item }  // Show all the comments for individual story
    ];
    
    // Adding routes

    router.notFound(function () {
      view.innerHTML = `<div> Not Found </div>`;
    });

    routes.forEach(
      ({path, page}) => {
        router.on(path, () => {
          page(path); 
        }).resolve();
    })

    /** Equals to:
      router
      .on('/new', () => {
        Stories('/new');
      })
      .on('/ask', () => {
        Stories('/ask');
      })
      .resolve(); 
     */
  }
}