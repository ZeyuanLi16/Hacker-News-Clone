import Story from '../components/Story.js';
import view from "../utils/view.js"
import baseUrl from '../utils/baseUrl.js';
import store from '../store.js'
import checkFav from '../utils/checkFav.js';

export default async function Stories(path) {
    const {favorites } = store.getState();
    const stories = await getStories(path);
    const hasStories = stories.length > 0;
                    
    view.innerHTML = `<div>
      ${hasStories ? stories.map((story, index) => Story({...story, index : index + 1, isFavorite: checkFav(favorites, story)})).join("") : 'No stories'}
    </div>`;  

    document.querySelectorAll('.favorite').forEach(favoriteButton => { // select all favs
        favoriteButton.addEventListener('click', async function() {
            const story = JSON.parse(this.dataset.story);  // add the whole story to the dataset
            const isFavorited = checkFav(favorites, story);
            if (isFavorited) {  // Add or remove fav
                store.dispatch({ type: "REMOVE_FAVORITE", payload: { favorite: story } })  
            } else {
                store.dispatch({ type: "ADD_FAVORITE", payload: { favorite: story } })    
            }

            await Stories(path); // rerender
        }); 
    });}

async function getStories(path) {
    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';
    if (isHomeRoute) {
        path = '/news';  
    } else if (isNewRoute) {
        path = '/newest';  
    } 
    
    const response = await fetch(`${baseUrl}${path}`);
    const stories = await response.json();
    return stories;
}