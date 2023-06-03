import React, { useEffect, useState, useRef } from 'react';
import { Get, Post, Put, Delete } from '../config/baseMethodApi';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

const Dashboard = (props) => {

    const location = useLocation()
    let querys = location.search;
    console.log(querys);

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        contact: '',
        // field2: '',
        // field3: '',
        // field4: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission or data processing here

        console.log(formData);
        Post("/api/students/", formData).then((res) => {
            console.log(res);
            formData.fname = ''
            formData.lname = ''
            formData.email = ''
            formData.password = ''
            formData.contact = ''
            getCourses();
        })

    };


    const [courseData, setCourseData] = useState([]);
    const [queryString, setQueryString] = useState(querys);
    const count = useRef(1);

    const getCourses = () => {
        Get(`/api/students${queryString}`).then((res) => {
            console.log(res.data.data, "here we go");
            setCourseData(res.data.data);
        }).catch(() => {

        })
    }


    let previousData = () => {

        let currentPage;
        let currentlimit;
        let splitedString;

        if (querys) {

            if (count.current < 1) {
                return
            }
            count.current = count.current - 1

            splitedString = queryString.split('&');
            currentPage = Number(splitedString[0].split('=')[1]) || 1;
            currentlimit = Number(splitedString[1].split('=')[1]) || 3;

            setQueryString(`?page=${count.current}&limit=${currentlimit}`);
            getCourses();

        } else {

            setQueryString(`?page=${count.current}&limit=${currentlimit}`);
            getCourses()
        }
    }

    let nextData = () => {


        let currentPage;
        let currentlimit;
        let splitedString;

        if (querys) {

            // if(count.current <= 9){
            //     return
            // }
            count.current = count.current + 1

            splitedString = queryString.split('&');
            currentPage = Number(splitedString[0].split('=')[1]) || 1;
            currentlimit = Number(splitedString[1].split('=')[1]) || 3;

            setQueryString(`?page=${count.current}&limit=${currentlimit}`);
            getCourses();

        } else {

            setQueryString(`?page=${count.current}&limit=${currentlimit}`);
            getCourses()
        }
    }




    const [forEdit, forSetEdit] = useState(true);


    const edit = (e) => {
        setFormData(e);
        forSetEdit(false);
    }


    let del = (e) => {
        console.log(e, "here is id");
        Delete(`/api/students/`, e).then((res) => {
            getCourses();
        })
    }

    let updateData = (e) => {
        e.preventDefault();
        console.log(formData);
        Put("/api/students/", formData._id, formData).then((res) => {
            console.log(res, "Updated successfully...");
            formData.fname = ""
            formData.lname = ""
            formData.email = ""
            formData.password = ""
            formData.contact = ""
            getCourses();
            forSetEdit(true);
        })

    }

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            <div className='head'>
                <ul>
                    <li><Link to='../student'>Student</Link></li>
                    <li><Link to='../teacher'>Teacher</Link></li>
                    <li><Link to='../course'>Course</Link></li>
                    <li><Link to='../institute'>Institute</Link></li>
                </ul>
            </div>
            <div className='main-Div'>
                <h1>Add Students</h1>
                <form onSubmit={handleSubmit}>
                    <label>

                        <input
                            placeholder="First Name"
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="Last name"
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="email"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="password"
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="contact"
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />

                    {forEdit == false ? <button type="submit" onClick={updateData} className='btns'>Update</button> : <button type="submit" onClick={handleSubmit} className='btns'>Submit</button>}
                </form>
            </div>


            <div style={{ padding: "20px", textAlign: "" }}>

                <div>
                    {
                        courseData.map((x, i) => {
                            // console.log(x)
                            return (
                                <>

                                    <div key={i} style={{ padding: "10px" }} className='dataRow'>
                                        <div>{i + 1})</div>
                                        <div ><b>First name: </b>{x.fname}</div>
                                        <div ><b>Last Name : </b>{x.lname}</div>
                                        <div ><b>Email:</b> {x.email}</div>
                                        <div ><b>Password:</b> {x.password}</div>
                                        <div ><b>Contact:</b> {x.contact}</div>

                                        <div style={{ marginTop: "20px" }}><button onClick={() => { edit(x) }} className='editBtn'>Edit</button><button onClick={() => { del(x._id) }} className='delBtn'>Delete</button></div>

                                        <hr />
                                    </div>
                                </>
                            )
                        })
                        // console.log(courseData,"s")
                        // <div>{x}</div>
                        // console.log(x.courses,"sss");
                        // <div>{courseData.courseData}</div>
                    }
                </div>
                <div style={{ textAlign: "right" }}>
                
                    <button className='pre' >
                        <Link to={`?page=${count.current}`} onClick={() => { previousData() }} > previous</Link>
                    </button>
                    &nbsp;
                    <button className='next'  >
                        <Link to={`?page=${count.current}`} onClick={() => { nextData() }}>next</Link>
                    </button>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
