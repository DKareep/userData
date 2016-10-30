export default function (state=null, action)  {
    switch (action.type) {
        case 'SHOW_FILTER':
            return action.filter;
    }
    return state;
}