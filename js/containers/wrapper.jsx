import React, {Component} from 'react';
import Header from './header';
import Main from './main';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setMeta,users} from '../actions/action-creators';
const Backbone = require('exoskeleton-router');



class Wrapper extends Component {
    constructor(props) {
        "use strict";
        super(props);
        this.loadMeta = this.loadMeta.bind(this);
        this.candidateList = this.candidateList.bind(this);
        this.locationCurrentCompanySearchList = this.locationCurrentCompanySearchList.bind(this);
        this.loadCustom = this.loadCustom.bind(this);
    }
    componentDidMount() {
        "use strict";
        this.loadMeta()
        const BelongRouter = Backbone.Router.extend({
            routes: {
                "location/:locationId/company/:companyId/search/:keyword": "locationCurrentCompanySearch",
                "": "index"
            }
        });
        const router = new BelongRouter;
        router.on('route:index', this.candidateList);
        router.on('route:locationCurrentCompanySearch', this.locationCurrentCompanySearchList);

        Backbone.history.start({pushState: false});


        $(window).bind('hashchange', function () {
            router.navigate(window.location.hash, {trigger: true});
        });
    }
    loadMeta() {
        "use strict";
        $.ajax({
            type: 'GET',
            url: 'http://104.199.147.85/meta'

        }).done((data) => {
            this.props.setMeta(data);

        }).fail(err => {
            console.log(err);
        })
    }

    candidateList() {
        $.ajax({
            type: 'GET',
            url: 'http://104.199.147.85/candidates'
        }).done((data) => {
            this.props.setUsers(data);

        }).fail(err => {
            console.log(err);
        })
    }

    loadCustom(locationId,companyId,keyword) {
        "use strict";

        var initialPage = window.location.pathname;
        var data = {};


        if (locationId === 'all') {

        } else {
            var locations = locationId.split('/');
            var locationString = '';
            var _location = [];
            locations.map((locationId) => {
                "use strict";
                locationString += this.props.metadata.locations[locationId] + ',';
            });
            data.current_location = locationString.slice(0, -1);
        }
        if (companyId === 'all') {

        } else {
            var companies = companyId.split('/');
            var companyString = '';
            var _company = [];
            companies.map((companyId) => {
                "use strict";
                companyString += this.props.metadata.companies[companyId] + ',';
            });
            data.current_company = companyString.slice(0, -1);
        }
        if (keyword === 'all') {

        } else {
            data.query = keyword;
        }


        $.ajax({
            type: 'GET',
            url: 'http://104.199.147.85/candidates',
            data: data
        }).done((data) => {

            this.props.setUsers(data);

        }).fail(err => {
            console.log(err);
        })
    }

    locationCurrentCompanySearchList(locationId, companyId, keyword) {

        if (!this.props.metadata) {

            $.ajax({
                type: 'GET',
                url: 'http://104.199.147.85/meta'

            }).done((data) => {
                this.props.setMeta(data);
                this.loadCustom(locationId,companyId,keyword);
            }).fail(err => {
                console.log(err);
            })

        }
        else {
            this.loadCustom(locationId,companyId,keyword);
        }

    }
    render() {
        "use strict";
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }

}
function mapStateToProps(state) {
    "use strict";
    return {
        metadata: state.metadata

    }
}
function matchDispatchToProps(dispatch) {
    "use strict";
    return bindActionCreators({setMeta: setMeta, setUsers: users}, dispatch);

}
export default connect(mapStateToProps, matchDispatchToProps)(Wrapper);