import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const appContext = React.createContext();
const updateAppContext = React.createContext();

const defaultAppContext = {
    username: '',
    loggedIn: false,
    userURL: 'users',
    postURL: 'post'
};

export const useAppContext = () => { return(useContext(appContext)) };
export const useUpdateAppContext = () => {return(useContext(updateAppContext)) };

export const ContextProvider = ({ children }) => {
    const [context, setAppContext] = useState(defaultAppContext);
    const updateContext = (update) => setAppContext(update);

    return (
        <appContext.Provider value={context}>
            <updateAppContext.Provider value={updateContext}>
                { children }
            </updateAppContext.Provider>
        </appContext.Provider>
    )
};

ContextProvider.propTypes = {
    children: PropTypes.any
};