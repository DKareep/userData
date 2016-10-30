export default function(state=null, action){
    switch (action.type) {
        case 'ADD_LOCATION':
            return action.location
    }
    return state;
}