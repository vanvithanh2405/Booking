import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";



export const HomeTemplate = (props) => {
    const { Component, ...restRoute } = props;
    useEffect(() => {
        window.scrollTo(0,0);
    })
    return <Route {...restRoute} render={(propsRoute) => { //props.location,props.history.props.match

        return <Fragment>
            <Header {...propsRoute} />
            <div>
                <Component {...propsRoute} />
            </div>

            <Footer id="footer" />

        </Fragment>
    }} />
}