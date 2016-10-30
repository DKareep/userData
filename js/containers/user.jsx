import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import  Loading from './loading';
import {selectUser} from '../actions/action-creators';
import Modal from './modal';


class User extends Component {
    constructor(props) {
        "use strict";
        super(props);
    }
componentDidMount() {
    "use strict";
    $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '4%', // Starting top style attribute
            ending_top: '10%', // Ending top style attribute
            ready: function() { alert('Ready'); }, // Callback for Modal open
            complete: function() { alert('Closed'); } // Callback for Modal close
        }
    );
}
    createUserList() {
        "use strict";
        if (!this.props.users) {
            return <Loading/>;
        } else {
            return this.props.users.candidates.map(user => {
                return (
                    <div key={user.uid} className="user-card__list__results__container"
                         onClick={() => {this.props.selectUser(user); this.activeUser()}}>
                        <div className="user-image-container float--left">
                            <img src={user.profile_picture} className="user-image" alt=""/>
                        </div>
                        <div className="user-details float--left">

                            <h3 className="name__user-details">{user.first_name} {user.last_name}</h3>

                            <p className="current-position__user-details">{user.current_role}<span
                                className="off--color">  at  </span>
                                {user.current_company}</p>

                            <p className="duration-at-current-company__user-details off--color"><i>(8 Months, since feb
                                2015)</i>
                            </p>

                            <p className="location__user-details">{user.current_location}, India</p>

                            <p className="previous-experience__user-details">
                                <span className="off--color">Worked at </span>
                                {user.experience.map((company,i) => {
                                    return <span key={i}>{company.company} , </span>;
                                })}
                            </p>

                            <p className="duration-at-previous-company__user-details off--color"><i>({user.total_experience}
                                total
                                experiance)</i></p>

                        </div>
                    </div>
                )
            })
        }
    }

    activeUser() {
        "use strict";

            $('#candidateModal').openModal();

    }

    render() {
        "use strict";


        return (
            <div>
                {this.createUserList()}
              <Modal />
            </div>
        )
    }

}
function mapStateToProps(state) {
    "use strict";
    return {
        users: state.users,
        activeuser: state.activeuser
    }
}
function matchDispatchToProps(dispatch) {
    "use strict";
    return bindActionCreators({selectUser: selectUser}, dispatch);

}
export default  connect(mapStateToProps, matchDispatchToProps)(User);