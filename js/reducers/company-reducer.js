export default function (state=null, action)  {
    switch (action.type) {
        case 'ADD_COMPANY':
            return action.company;
    }
    return state;
}