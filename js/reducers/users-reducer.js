export default  function(state = null, action) {
    switch (action.type) {
        case 'SET_USERS':
            return action.users;
        break;
    }
    return state;
}
