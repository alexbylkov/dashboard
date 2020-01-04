import React, {Component} from 'react';
import nextId from "react-id-generator";
import {addUser, editUser, updateUsers} from '../../actions';
import {connect} from 'react-redux';
import './forms.sass'

class Forms extends Component {

    state = {
        name: '',
        surname: '',
        age: '',
        sex: '',
        city: ''
    }

    handleInput = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: target.value
        });
    }

    handleSubmit = (event) => {
        const {updateUsers, itemList, addUser, editUser} = this.props;
        const {name, surname, age, sex, city} = this.state;
        event.preventDefault();

        if (!itemList) {
            addUser({ ...this.state, id: nextId(), flag: true });
        } else {
            editUser(itemList.id);
            const newList = {
                name: name || itemList.name,
                surname: surname || itemList.surname,
                age: age || itemList.age,
                sex: sex || itemList.sex,
                city: city || itemList.city,
                id: nextId(),
                flag: true
            }
            updateUsers(newList);
        }

        this.setState({
            name: '',
            surname: '',
            age: '',
            sex: '',
            city: ''
        });
    }

    render() {
        const {name, surname, age, sex, city} = this.state;
        const {itemList} = this.props;

        return (
            <>
                <form className="container d-flex justify-content-between forms" onSubmit={this.handleSubmit}>
                    <input
                        value={name}
                        name='name'
                        onChange={this.handleInput}
                        placeholder={itemList === undefined ? "Name" : itemList.name}
                        required={itemList === undefined ? true : false}
                    />
                    <input
                        value={surname}
                        name='surname'
                        onChange={this.handleInput}
                        placeholder={itemList === undefined ? "Surname" : itemList.surname}
                        required={itemList === undefined ? true : false}
                    />
                    <input
                        value={age}
                        name='age'
                        onChange={this.handleInput}
                        placeholder={itemList === undefined ? "Age" : itemList.age}
                        required={itemList === undefined ? true : false}
                    />
                    <input
                        value={sex}
                        name='sex'
                        onChange={this.handleInput}
                        placeholder={itemList === undefined ? "Sex" : itemList.sex}
                        required={itemList === undefined ? true : false}
                    />
                    <input
                        value={city}
                        name='city'
                        onChange={this.handleInput}
                        placeholder={itemList === undefined ? "City" : itemList.city}
                        required={itemList === undefined ? true : false}
                    />
                    <button type="submit" className="submitBtn">
                        {itemList === undefined ? "+Add" : "Save"}
                    </button>
                </form>
            </>
    
        );
    }
    
};

const mapStateToProps = ({users, loading, error}) => {
    return {
        users,
        loading,
        error
    }
};

const MapDispatchToProps = {
    addUser,
    editUser,
    updateUsers
};

export default connect(mapStateToProps, MapDispatchToProps)(Forms);