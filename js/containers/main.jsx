import React, {Component} from 'react';
import User from './user';
class Main extends Component {
    constructor(props) {
        "use strict";
        super(props);
    }

    render() {
        "use strict";
        return (
            <section id="container">
                <div className="results__container">
                    <p className="result-text off--color">Showing x of x candidates</p>

                    <div className="list__results__container">

                        <User />

                    </div>
                </div>

            </section>
        )
    }

}

export default Main;