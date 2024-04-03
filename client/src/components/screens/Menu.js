import axios from 'axios';
import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { GlobalContext } from '../../GlobalContext'

function Menu(props) {
    const state = useContext(GlobalContext);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            if (window.confirm(`are yoou sure to logout?`)) {
                await axios
                    .get(`http://localhost:5400/api/auth/logout`)
                    .then((res) => {
                        toast.success("Successfully Logout..");
                        setIsLogged(false);
                        localStorage.removeItem("loginStatus");
                        //   window.location.href="/";
                        navigate("/");
                    })
                    .catch((err) => toast.error(err.response.data.msg));
            } else {
                toast.warning("logout request terminated");
            }
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    const defaultRouter = () => (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={`/login`} className="nav-link">
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={`/register`} className="nav-link">
                    Register
                </NavLink>
            </li>
        </ul>
    );

    const userRouter = () => (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={`/`} className="nav-link">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to={`/#`}
                    onClick={logoutHandler}
                    className="nav-link btn btn-danger"
                >
                    Logout
                </NavLink>
            </li>
        </ul>
    );

    const adminRouter = () => (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={`/admin`} className="nav-link">
                    Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    to={`/#`}
                    onClick={logoutHandler}
                    className="nav-link btn btn-danger"
                >
                    Logout
                </NavLink>
            </li>
        </ul>
    );

    return (
        <nav className={isLogged ? "navbar navbar-expand-md navbar-dark bg-success" : "navbar navbar-expand-md navbar-dark bg-success"}>
            <div className="container ">
                <NavLink to={`/`} className="navbar-brand">
                    {isLogged ? "Dashboard" : "React-CRUD"}
                </NavLink>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id='menu'>
                    {
                        isLogged ? (
                            <React.Fragment>
                                {
                                    isAdmin ? adminRouter() : userRouter()
                                }
                            </React.Fragment>
                        ) : defaultRouter()
                    }
                </div>
            </div>
        </nav>
    )
}

export default Menu