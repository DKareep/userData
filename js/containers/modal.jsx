import React, {Component} from 'react';
import {connect} from 'react-redux';
class Modal extends Component {
    constructor(props) {
        "use strict";
        super(props);
    }

    render() {
        var User;
        if(this.props.activeuser) {
            User = this.props.activeuser;
        }
        "use strict";
        return (
            <div id="candidateModal" ref="modal" className="modal">
                {this.props.activeuser ?
                    <div className="modal-content">
                        <i className=" modal-action modal-close float--right close-modal-icon" onClick={()=> { console.log('clicked'); $(this.refs.modal).closeModal();}} >X</i>

                        <img src={this.props.activeuser.profile_picture} alt="" className="image__candidate-modal"/>
                        <br/>
                        <h4 className='center-align'>{this.props.activeuser.first_name} {this.props.activeuser.last_name}</h4>

                        <div className="candidate-details">

                            <div className="current-role">Current Role : {User.current_role}</div>
                            <br/>
                            <div className="current-role">Current Company : {User.current_company}</div>
                            <br/>
                            <div className="current-role">Current Location : {User.current_location}</div>
                            <br/>
                            <div className="current-role">Previous Experiance : {User.experience.map((company,i) => {
                                return <span key={i}>{company.company} , </span>;
                            })}</div>


                        </div>

                    </div>
                    : ''}</div>
        )
    }

}
function mapStateToProps(state){
    "use strict";
    return {
        activeuser: state.activeuser
    }
}
export default connect(mapStateToProps,null) (Modal);