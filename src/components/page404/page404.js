import React from 'react';
import { Link } from "react-router-dom";
import Header from '../header';

function Page404() {
    return (
        <div className="bg bg-light">
            <Header/>
            <div className="text-center">
                <h1 className=" m-5">404</h1>
                <h2>Page not found, you can return to the <Link className="link_dash" to="/dashboard">Dashboard</Link>.</h2>
            </div>
            
        </div>
        
    )
};

export default Page404;