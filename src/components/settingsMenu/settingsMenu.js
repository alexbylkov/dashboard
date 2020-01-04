import React, {Component} from 'react';
import {deleteUser, editUser} from '../../actions';
import {connect} from 'react-redux';
import Forms from '../forms';
import Header from '../header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import './settingsMenu.sass';




class SettingsMenu extends Component {

    deleteItem = (id) => {
        this.props.deleteUser(id);
    }

    editItem = (id) => {
        this.props.editUser(id);
    }

    render() {

        const {users} = this.props;
       
        return (
            <div className='bg bg-light'>
                <Header/>
                <Forms/>
                <h2 className="text-center p-4 border-bottom m-0">User list</h2>
                {
                    users.map(item => {
                        return (
                            item.flag ? 
                                <UsersItemList 
                                    key={item.id} 
                                    itemList={item}
                                    deleteItem={this.deleteItem}
                                    editItem={this.editItem} 
                                /> : 
                                <Forms 
                                    key={item.id} 
                                    itemList={item}
                                    deleteItem={this.deleteItem}
                                    editItem={this.editItem} 
                                />
                        )
                    })
                }
            </div>
        );
    }
};

const mapStateToProps = ({users}) => {
    return {
        users
    }
};

const MapDispatchToProps = {
    deleteUser,
    editUser
};

export default connect(mapStateToProps, MapDispatchToProps)(SettingsMenu);

const UsersItemList = ({itemList, deleteItem, editItem}) => {

    const {name, surname, age, sex, city, id} = itemList;

    return (
        <div className="user__item">
            <ul className="d-flex justify-content-between align-items-center container">
                <li>Name: {name}</li>
                <li>Surname: {surname}</li>
                <li>Age: {age} лет</li>
                <li>Sex: {sex}</li>
                <li>City: {city}</li>
                <li>
                    <button classname='left' onClick={() => editItem(id)}>
                        <FontAwesomeIcon icon={faUserEdit} size="lg" />
                    </button>
                    <button onClick={() => deleteItem(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                    </button>
                </li>
            </ul>   
        </div>
    );  
}