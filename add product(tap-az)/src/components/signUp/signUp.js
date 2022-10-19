import React,{useContext} from "react";
import {useFormik} from "formik";
import validationSchema from "./validation";
import {apiSignUp} from "../../api";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/authContext";

const SignUp = () => {
    const {login} = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            let responseData = await apiSignUp(values);
            login(responseData);
        },
    });

    return (
        <div>
            <div className="row pt-5">
                <div className="col-6 offset-3">
                    <main className="form-signin">
                        <form onSubmit={formik.handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                            <div className="form-floating mb-3">
                                <input
                                    type="name"
                                    name="name"
                                    className={`form-control ${formik.touched.name && formik.errors.name && 'is-invalid'} ${formik.touched.name && !formik.errors.name && 'is-valid'}`}
                                    placeholder="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="surname"
                                    name="surname"
                                    className={`form-control ${formik.touched.surname && formik.errors.surname && 'is-invalid'} ${formik.touched.surname && !formik.errors.surname && 'is-valid'}`}
                                    placeholder="surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.surname}
                                />
                                <label htmlFor="floatingInput">Surname</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'} ${formik.touched.email && !formik.errors.email && 'is-valid'}`}
                                    placeholder="name@example.com"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password && 'is-invalid'} ${formik.touched.password && !formik.errors.password && 'is-valid'}`}
                                    placeholder="Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <div className="checkbox mb-3">
                                <NavLink to='/signIn' className='text-decoration-none'>Sign In</NavLink>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SignUp;