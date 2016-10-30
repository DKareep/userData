export default function(state=null,action) {
    switch (action.type) {
        case 'SEARCH_KEYWORD':
            return action.keyword;
            break;
    }
    return state;
}