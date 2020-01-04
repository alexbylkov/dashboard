import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {activeUser} from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';

import './header.sass'

class Header extends Component {

    state = {
        value: '',
        open: ''
    }

    handleInputChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    showList = (e) => {
        this.setState({
            open: 'open'
        });
    }

    OutShowList = (e) => {
        this.setState({
            open: ''
        });
    }

    activeUser = (name, surname) => {
        this.props.activeUser(`${name} ${surname}`)
    }

    render() {
        const {users, active} = this.props;
        const {value} = this.state;

        const userList = users.filter(item => {
            return (
                ((item.name).indexOf(value) && item.surname.indexOf(value)) > -1
            )
        })
        return (
            <div className="header">
                <div className="container">
                    <div className="header__block">
                        <Link className="link_dash" to="/dashboard">
                            <FontAwesomeIcon icon={faReact} size="lg" />
                        </Link>
                        <div className="header__block-form" >
                            <div>
                                <form>
                                    <input placeholder="Search" onChange={this.handleInputChange} onFocus={this.showList} onBlur={this.OutShowList}/>
                                </form>
                                <div>
                                    <ul className={this.state.open} onMouseDown={event => event.preventDefault()}>
                                        {
                                            userList.map(item => {
                                                return (
                                                    <HeaderItemList 
                                                        key={item.id} 
                                                        itemList={item}
                                                        activeUser={this.activeUser}
                                                    />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Link className="link_set" to="/settings">
                            <FontAwesomeIcon icon={faCog} size="lg" />
                        </Link>
                        <span>{active}</span> 
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({users, active}) => {
    return {
      users,
      active
    }
};

const MapDispatchToProps = {
    activeUser
};
  
export default connect(mapStateToProps, MapDispatchToProps)(Header);

const HeaderItemList = ({itemList, activeUser}) => {
    const { name, surname } = itemList
    return (
        <li>
            <Link onClick={() => activeUser(name, surname)} to="/dashboard">
                <div>{name} {surname}</div>
            </Link>
        </li>
    )  
}