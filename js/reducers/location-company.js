export default function(state = null, action) {
    switch (action.type) {
        case 'SET_META':
            return action.meta;
        break;
    }
    return state;
}