import React from 'react';
import { Redirect } from 'react-router-dom';

const Protected = props => {
    const Component = props.cmp;
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    return (
        <div>
        {userDetails ? <Component/>: <Redirect to='/login/'/>}
        </div>
    );
}

export default Protected;