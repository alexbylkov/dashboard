import React, {Component} from 'react';
import apiList from '../../services/apiList';
import {withRouter} from 'react-router-dom';

class Apis extends Component {

    render() {

        let apiListRandom = apiList.sort( () => {
            return Math.random() - 0.5;
        });

        return (
            <div className="bg-light">
                <div className="container p-4 d-flex flex-wrap justify-content-between">
                    {
                        apiListRandom.map(item => {
                            return <ApiItems 
                                    key={item.nameApi} 
                                    itemList={item}
                                    apiSelect={() => {this.props.history.push(`/dashboard/${item.nameApi}`)}}/>
                        })
                    }
                </div> 
            </div> 
        );
    }
};

export default withRouter(Apis);

const ApiItems = ({itemList, apiSelect}) => {

    const {nameApi, title} = itemList;

    return (
        <div className="card mt-5 mb-4 border-0" style={{ width: "18rem"}}>
            <img className="p-4" src={`./icons/${nameApi}.svg`} alt={nameApi}></img>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Searches on {title} based on your search query.</p>
                <button type="button" className="btn btn-secondary" onClick = {apiSelect}>Open {title}</button>
            </div>
        </div> 
    );  
}