// Reducer function for state management

function createStore(reducer){
    let currentState = reducer(undefined, {});  // Initial state
   
    return {
        getState: () => currentState,  // Gett state
        dispatch: action => {          // Call dispatch to run action on the state, pass action to dispatch
            currentState = reducer(currentState, action);    
        } 
    }
}

const initialState = {
    favorites: []  
}

function favoritesReducer(state = initialState, action) {
    switch (action.type) {
    case "ADD_FAVORITE":{
        const addedFavorite = action.payload.favorite;
        const favorites = [...state.favorites, addedFavorite];
        return { favorites };
    }
    case "REMOVE_FAVORITE": {
        const removedFavorite = action.payload.favorite;
        const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
        return { favorites };
    }
    default:
        return state;
    } 
}

// Action example: { type: "ADD_FAVORITE", payload: { favorite: { title: "story1", id: 1 } } }

const store = createStore(favoritesReducer); // pass in the reducer
export default store;