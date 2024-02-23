export default function checkFav(favorites, story){
    return favorites.some(favorite => favorite.id === story.id); 
}