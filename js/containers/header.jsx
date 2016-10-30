import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setMeta,users,addLocation, addCompany, search,selectUser,load,filter} from '../actions/action-creators';
import Modal from './modal';
class Header extends Component {
    constructor(props) {
        "use strict";
        super(props);
        this.state = {filter: true};
        this.getUrl = this.getUrl.bind(this);

    }

    componentDidMount() {

        $('.trigger').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: true, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left' // Displays dropdown with edge aligned to the left of button
            }
        );
        $(this.refs.filter).hide();


    }



    loadLocations() {
        "use strict";
        if (this.props.metadata) {
            return this.props.metadata.locations.map((location, i) => {
                return (<li key={i} onClick={() => {

                var _location;
                if(!this.props.location) {
                 _location = [{location: location, key: i}];
                } else {
                _location = this.props.location.concat({location: location, key: i});
                }

                this.props.addLocation(_location);
                this.props.initialLoad(true);
                }}>{location}</li>)
            })
        }
    }

    loadCompanies() {
        "use strict";
        var prev = this.props.location;
        if (this.props.metadata) {
            return this.props.metadata.companies.map((company, i) => {
                return (<li key={i} onClick={() => {

                 var _company;
                if(!this.props.company) {
                _company = [{company: company, key: i}];
                } else {
                _company = this.props.company.concat({company: company, key: i});
                }
              this.props.addCompany(_company);
                   this.props.initialLoad(true);

              }}>{company}</li>)
            })
        }
    }

    addFilter() {
        "use strict";
        if (!this.props.filter) {
            return <p className="filters__add-filter__text"
                      onClick={()=>{this.props.setFilter(true); $(this.refs.filter).toggle();}}>+ Add a
                filter</p>;
        } else {
            return <p className="filters__add-filter__text"
                      onClick={()=>{this.props.setFilter(false); $(this.refs.filter).toggle();}}>- Add a
                filter</p>;
        }

    }

    totalFilters() {
        "use strict";

        var _total = 0;
        if (this.props.location) {
            _total += this.props.location.length;
        }
        if (this.props.company) {
            _total += this.props.company.length;
        }
        return _total;

    }

    removeLocation(location) {
        "use strict";
        var newLocationArray = this.props.location.filter((el) => {
            return el.key !== location.key
        });

        this.props.addLocation(newLocationArray);
        this.props.initialLoad(true);
    }

    removeCompany(company) {
        var newCompanyArray = this.props.company.filter((el) => {
            return el.key !== company.key
        });

        this.props.addCompany(newCompanyArray);
        this.props.initialLoad(true);
    }

    searchChangeDetect(e) {

        this.props.searchChange(e.target.value);
    }

    userListSearch() {
        if (!this.props.users) {
            return;
        } else {
            return this.props.users.candidates.map((user)=> {
                return (<li key={user.uid} onClick={() => {this.props.selectUser(user); this.activeUser()}}>
                    <img src={user.profile_picture} className='search-profile-user' alt=""/>

                    <p className="search-username">{user.first_name}</p>

                </li>)
            })
        }

    }

    activeUser() {
        "use strict";

        $('#candidateModal').openModal();

    }

    getUrl() {
        "use strict";
        var initialPage = window.location.pathname;
        var location = '';
        var company = '';
        var search = '';

        if (this.props.location) {
            if (this.props.location.length > 0) {

                this.props.location.map((loc) => {
                    "use strict";
                    location += loc.key + '/';
                });
            }
            else {
                location = 'all/';
            }
        } else {
            location = 'all/';
        }

        if (this.props.company) {
            if (this.props.company.length > 0) {
                this.props.company.map((loc) => {
                    "use strict";
                    company += loc.key + '/';
                });
            }

            else {
                company = 'all/';
            }
        } else {
            company = 'all/';
        }

        if (this.props.search) {
            search = this.props.search;

        }
        else {
            search = 'all';
        }
        if (this.props.load) {
            window.location.replace(initialPage + '#location/' + location + 'company/' + company + 'search/' + search);
        }

    }


    render() {


        this.getUrl()
        "use strict";
        return (
            <header className="header-filter">
                <div className="filters float--left ">
                    <p className="candidates-text__filters">Candidate Search Filters</p>

                    {this.props.load ? <p className="applied-text__filters off--color">Applied filters({this.totalFilters()})</p>: ''}
                    {this.props.load ?
                    <div className="filter-chips">

                            <p className="showing-candidates__filter-chips">showing candidates from</p>
                        {this.props.company ? this.props.company.map((company, k)=> {


                            return (<div className="chip" key={k}>
                              {company.company}
                                <i className=" material-icons remove-icon" onClick={()=>{this.removeCompany(company)}}>close</i>
                            </div>);
                        }) : '' }

                        {this.props.location ? this.props.location.map((location, k)=> {


                            return (<div className="chip" key={k}>
                                {location.location}
                                <i className=" material-icons remove-icon" onClick={()=>{this.removeLocation(location)}}>close</i>
                            </div>);
                        }) : '' }

                    </div> : ''}
                    <div className="filters__add-filter">

                        {this.addFilter()}

                        <div ref='filter' className="filters__add-filter__conatiner">
                <span className="company-filter">
                    <p className="text__company-filter">Current company</p>
                    <div className="company_trigger trigger" data-activates='company_dropdown'>
                        <p className="add-filter-text__company">Company filter </p>

                        <div className="icon_container__company_trigger">
                            <i className="material-icons icon_company">expand_more</i>
                        </div>
                        <ul id='company_dropdown' className='dropdown-content'>
                            {this.props.metadata ? this.loadCompanies() : ''}
                        </ul>
                    </div>


                </span>

                <span className="location-filter">
                    <p className="text__location-filter">Current location</p>
                  <div className="location_trigger trigger" data-activates='location_dropdown'>
                      <p className="add-filter-text__location">Location filter </p>

                      <div className="icon_container__location_trigger">
                          <i className="material-icons icon_company">expand_more</i>
                      </div>
                      <ul id='location_dropdown' className='dropdown-content'>
                          {this.loadLocations()}
                      </ul>
                  </div>
                  </span>


                        </div>
                    </div>
                </div>

                <div className="search float--right ">
                    <div className="search__container trigger" data-activates='search_dropdown'>
                        <input type="text" id="search"
                               value={this.props.search ? this.props.search : ''}
                               onChange={this.searchChangeDetect.bind(this)}/>

                        <div className="icon_container__search">
                            <i className="material-icons icon_search">search</i>
                        </div>
                        <ul id='search_dropdown' className='dropdown-content'>
                            {this.userListSearch()}
                        </ul>

                    </div>

                </div>
                <Modal />
            </header>
        )
    }

}
function mapStateToProps(state) {
    "use strict";
    return {
        users: state.users,
        metadata: state.metadata,
        location: state.location,
        company: state.company,
        search: state.search,
        load: state.load,
        filter: state.filter

    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addCompany: addCompany,
        addLocation: addLocation,
        searchChange: search,
        selectUser: selectUser,
        initialLoad: load,
        setFilter: filter

    }, dispatch)

}

export default connect(mapStateToProps, matchDispatchToProps)(Header);