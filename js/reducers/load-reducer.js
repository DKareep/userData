export default function (state=false, action)  {
    switch (action.type) {
        case 'COMPLETED_INITIAL_LOAD':
            return action.load;
    }
    return state;
}