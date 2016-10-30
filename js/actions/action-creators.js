export const selectUser = (user) => {
    "use strict";
    return {
        type: 'ACTIVE_USER',
        payload: user
    }
};
export const  setMeta = (meta) => {
    "use strict";
    return {
        type: 'SET_META',
        meta: meta
    }
};
export const users = (users) => {
    "use strict";
    return {
        type: 'SET_USERS',
        users: users
    }
};
export const addLocation = (location) => {
    return {
        type: 'ADD_LOCATION',
        location: location
    }
};

export const addCompany = (company) => {
    "use strict";
    return {
        type: 'ADD_COMPANY',
        company: company
    }
};
export const search = (keyword) => {
    "use strict";
    return {
        type: 'SEARCH_KEYWORD',
        keyword: keyword
    }
};
export const load = (keyword) => {
    "use strict";
    return {
        type: 'COMPLETED_INITIAL_LOAD',
        load: keyword
    }
};
export const filter = (keyword) => {
    "use strict";
    return {
        type: 'SHOW_FILTER',
        filter: keyword
    }
};
