import { Fragment, useEffect } from "react";
import { Route } from "react-router";

export const LoginTemplate=(props)=> {
    const { Component, ...restRoute } = props;
    useEffect(() => {
        window.scrollTo(0,0);
    })
    return <Route {...restRoute} render={(propsRoute) => { //props.location,props.history.props.match

        return <Fragment>
            <div>
            
                <Component {...propsRoute} />
            </div>
        </Fragment>
    }} />
}
