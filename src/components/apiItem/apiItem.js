import React, {Component} from 'react';
import {connect} from 'react-redux';
import ApiService from '../../services/apiService';
import {apiLoaded, apiRequested, apiError} from '../../actions';
import Header from '../header';
import './apiItem.sass';
import Error from '../error';
import Spinner from '../spinner';

class ApiItem extends Component {

    state = {
        value: '',
        style: ''
    }

    componentDidMount() {
        this.props.apiLoaded([]);
        this.setState({
            style: 'bg bg-light'
        });
    }

    apiService = new ApiService();

    componentDidCatch() {
        this.props.apiError();
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit = (event) => {
        const {apiLoaded, apiRequested, apiId} = this.props;
        const {value} = this.state;
        event.preventDefault();
        if (value.length) {
            apiRequested();
            this.apiService.getApi(value, apiId)
            .then( rest => apiLoaded(rest))
            .then(this.setState({style: 'bg-light'}))
        } return null;
    }

    render() {
        const {items, apiId, loading, error} = this.props;
        const {style, value} = this.state;

        const errorMessage = error ? <Error/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? 
            <>
                {
                    items.map(item => {
                        return <ApiItemList 
                                key={item.link} 
                                itemList={item}
                                apiId={apiId}/>
                    })
                }
            </> 
        : null;

        return (
            <div className={style}>
                <Header/>
                <div className="container">
                    <form className="apis__form" onSubmit={this.handleSubmit}>
                        <input className="apis__form-input" type="text" placeholder="Please enter a search query..." value={value} onChange={this.handleChange} />
                        <input className="apis__form-button" type="submit" value="Search!" />
                    </form>
                </div>
                {errorMessage}
                {spinner}
                {content}
            </div>
        )

    }
}

const mapStateToProps = ({itemList, loading, error}) => {
    return {
        items: itemList,
        loading,
        error
    }
};

const MapDispatchToProps = {
    apiLoaded,
    apiRequested, 
    apiError
};

export default connect(mapStateToProps, MapDispatchToProps)(ApiItem);


const ApiItemList = ({itemList, apiId}) => {

    const {title, link, author="No data", img, description, date="No data"} = itemList;

    return (
        <div className="api__item">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-flex-start align-items-center p-4">
                    <div className="api__item-img">
                        <img src={img} alt={title}/>
                    </div>
                    <div className="api__item-description">
                        <h5>{title}</h5>
                        <p>{description}</p>
                        <div className="d-flex justify-content-between">
                            <h6>Author: {author}</h6>
                            <span className="pl-5">{(apiId === 'recipe') ? 'Calories: ' : 'Date: '}{date}</span>
                        </div>
                    </div>
                </div>
                <a href={link}><div>Open</div></a>
            </div>
        </div>
    );  
}