import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {addToken} from '../../actions';
import './authorization.sass';

class Authorization extends Component {

    generationToken = (e) => {
        this.props.addToken();
        localStorage.setItem('token', 'true');
        e.preventDefault();
    }

    render() {
        if (this.props.token) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="authorization">
                <form onSubmit={this.generationToken} className="authorization__form">
                    <div className="authorization__form-input">
                        <input type="text" placeholder="Login"/>
                        <input type="password" placeholder="Password"/>
                    </div>
                    <input className="authorization__form-button" type="submit" value="Log In"/>
                </form>
            </div>
        );
    }
};

const mapStateToProps = ({token}) => {
    return {
        token
    }
};

const MapDispatchToProps = {
    addToken
};

export default connect(mapStateToProps, MapDispatchToProps)(Authorization);


