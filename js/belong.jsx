import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Wrapper from './containers/wrapper';
import Combiner from './reducers/combiner';
const store = createStore(Combiner);

ReactDOM.render(
    <Provider store={store}r>
        <Wrapper />
    </Provider>,
    document.getElementById('belong')
);