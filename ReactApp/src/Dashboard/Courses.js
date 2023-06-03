import React, { useEffect, useState,useRef } from 'react';
import { Get, Post, Put, Delete } from '../config/baseMethodApi';
import './style.css';
import { Link, useLocation } from 'react-router-dom';


const Dashboard = () => {
    const [formData, setFormData] = useState({
        cname: '',
        duration: '',
        fees: '',
        shortName: '',
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
        Post("/api/course/", formData).then((res) => {
            console.log(res);
            getCourses();
        })

    };

    
    const location = useLocation()
    let querys = location.search;
    console.log(querys);

    const [courseData, setCourseData] = useState([]);
    const [queryString, setQueryString] = useState(querys);
    const count = useRef(1);

    const getCourses = () => {
        Get(`/api/course/${queryString}`).then((res) => {
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
        Delete("/api/course/", e).then((res) => {
            getCourses();
        })
    }

    let updateData = (e) => {
        e.preventDefault();
        console.log(formData);
        Put("/api/course/", formData._id, formData).then((res) => {
            console.log(res, "Updated successfully...");
            formData.cname = ""
            formData.duration = ""
            formData.fees = ""
            formData.shortName = ""
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
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h1>Add Courses</h1>
                <form >
                    <label>

                        <input
                            placeholder="Course name"
                            type="text"
                            name="cname"
                            value={formData.cname}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="Duration"
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="Fees"
                            type="text"
                            name="fees"
                            value={formData.fees}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="Short name"
                            type="text"
                            name="shortName"
                            value={formData.shortName}
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

                                    <div key={i} className='dataRow'>
                                        <div>{i + 1})</div>
                                        <div ><b>Name: </b>{x.cname}</div>
                                        <div ><b>Duration: </b>{x.duration}</div>
                                        <div ><b>Fees:</b> {x.fees}</div>
                                        <div ><b>Short name:</b> {x.shortName}</div>
                                        <div><button onClick={() => { edit(x) }} className='editBtn'>Edit</button><button onClick={() => { del(x._id) }} className='delBtn'>Delete</button></div>

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
