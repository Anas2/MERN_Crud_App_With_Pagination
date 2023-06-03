import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from '../Dashboard/Courses';
import Institute from '../Dashboard/Institute'
import Teacher from '../Dashboard/Teacher'
import Student from '../Dashboard/Student'
import Login from '../components/Login'
import Signup from '../components/Signup';

function router(props) {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path='/' element={<Product />}  /> */}
                {/* <Route path='cart' element={<Cart />}  /> */}
                {/* <Route path='details' element={<Details />}  /> */}
                <Route path='/' element={<Login />}  />
                <Route path='sign-up' element={<Signup />}  />
                <Route path='course' element={<Courses />}  />
                <Route path='institute' element={<Institute />}  />
                <Route path='teacher' element={<Teacher />}  />
                <Route path='student' element={<Student />}  />
            </Routes>
        </BrowserRouter>
    );
}

export default router;