import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../features/slice/UserDetailsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const UserEditScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userDetails);
    const { user: loggedInUser } = useSelector((state) => state.user);

    return (
        <div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            
        </div>
    );
};

export default UserEditScreen;