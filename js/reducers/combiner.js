import {combineReducers} from 'redux';
import users from './users-reducer';
import activeuser from './activeuser';
import metadata from './location-company';
import location from './location-reducer';
import company from './company-reducer';
import search from './search';
import load from './load-reducer';
import filter from './filter-reducer';


const allReducers = combineReducers({
    users: users,
    activeuser: activeuser,
    metadata: metadata,
    location: location,
    company: company,
    search: search,
    load: load,
    filter: filter
});

export default allReducers;