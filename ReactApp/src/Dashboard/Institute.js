import React, { useEffect, useState,useRef } from 'react';
import { Get, Post, Delete, Put } from '../config/baseMethodApi';
import './style.css';
import { Link, useLocation } from 'react-router-dom';


const Dashboard = () => {

    const location = useLocation()
    let querys = location.search;
    console.log(querys);

    const [forEdit, forSetEdit] = useState(true);

    const [formData, setFormData] = useState({
        instName: '',
        address: '',
        shortName: '',
        tel: '',
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

        Post("/api/institute/", formData).then((res) => {
            console.log(res);
            formData.instName = ""
            formData.address = ""
            formData.shortName = ""
            formData.tel = ""
            getCourses();

        }).catch((err) => {
            console.log(err);
        })

    };

    const [courseData, setCourseData] = useState([]);
    const [queryString, setQueryString] = useState(querys);
    const count = useRef(1);

    const getCourses = () => {
        Get(`/api/institute${queryString}`).then((res) => {
            // console.log(res.data.data, "here we go");
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




    let del = (e) => {
        console.log(e, "here is id");
        Delete("/api/institute/", e).then((res) => {
            getCourses();
        })
    }

    let updateData = (e) => {
        e.preventDefault();
        console.log(formData);
        Put("/api/institute/", formData._id, formData).then((res) => {
            console.log(res, "Updated successfully...");
            formData.instName = ""
            formData.address = ""
            formData.shortName = ""
            formData.tel = ""
            getCourses();
            forSetEdit(true);
        })

    }

    const edit = (e) => {
        setFormData(e);
        forSetEdit(false);
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
                <h1>Add Institute</h1>
                <form >
                    <label>

                        <input
                            placeholder="Institute Name"
                            type="text"
                            name="instName"
                            value={formData.instName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="short name"
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <br />
                    <label>

                        <input
                            placeholder="Tel"
                            type="text"
                            name="tel"
                            value={formData.tel}
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
                                        <div ><b>Name: </b>{x.instName}</div>
                                        <div ><b>Address: </b>{x.address}</div>
                                        <div ><b>Short Name:</b> {x.shortName}</div>
                                        <div ><b>Tel:</b> {x.tel}</div>
                                        <div style={{ textAlign: 'right' }}><button onClick={() => { edit(x) }} className='editBtn'>Edit</button><button onClick={() => { del(x._id) }} className='delBtn'>Delete</button></div>
                                        <hr />
                                    </div>
                                </>
                            )
                        })
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
