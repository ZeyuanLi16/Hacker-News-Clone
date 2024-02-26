import Story from '../components/Story.js';
import view from "../utils/view.js"
import baseUrl from '../utils/baseUrl.js';
import store from '../store.js'
import checkFav from '../utils/checkFav.js';

export default async function Stories(path) {
    console.log(path);
    // Get the favorite stories from the state management.
    const { favorites } = store.getState();

    /** Get all the stories to show in the page.
     * If the path is /favorites, we should show only favorites stories. 
     * Technically, we should create and a new page in /pages but they share the same component.
     */
    const stories = await getStories(path, favorites);
    const hasStories = stories.length > 0;
    
    /** Array has a second parameter, index.
     * Pass stroy properies as long as index and if it is favorited, to the component.
     */
    view.innerHTML = `<div>
      ${hasStories ? stories.map((story, index) => Story({...story, index : index + 1, isFavorite: checkFav(favorites, story)})).join("") : 'No stories'}
    </div>`;

    // Add eventListener to the fav button
    document.querySelectorAll('.favorite').forEach(favoriteButton => { // Select all favs
        favoriteButton.addEventListener('click', async function() { // We use function keyword because we use this. on the fav button html attribute(date-story).
            const story = JSON.parse(this.dataset.story);  // Added the whole story JSON string to the dataset in the html
            const isFavorited = checkFav(favorites, story);
            if (isFavorited) {  // Add or remove fav use reducer 
                store.dispatch({ type: "REMOVE_FAVORITE", payload: { favorite: story } })  // Pass action to dispatch 
            } else {
                store.dispatch({ type: "ADD_FAVORITE", payload: { favorite: story } })    
            }

            await Stories(path); // Rerender
        }); 
    });}

async function getStories(path, favorites) {
    if(path === '/favorites'){
        return favorites;
    }

    const isHomeRoute = path === '/';
    const isNewRoute = path === '/new';

    // API endpoint mapping for / and /news
    if (isHomeRoute) {
        path = '/news';  
    } else if (isNewRoute) {
        path = '/newest';  
    } 
    
    const response = await fetch(`${baseUrl}${path}`);
    const stories = await response.json();
    return stories;
}