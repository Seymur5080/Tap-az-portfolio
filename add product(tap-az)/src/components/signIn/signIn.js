import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {useFormik} from "formik";
import validationSchema from "./validation";
import {AuthContext} from "../../context/authContext";
import {apiSignIn} from "../../api";

const SignIn = () => {
    const {login} = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            let responseData = await apiSignIn(values);
            login(responseData);
        },
    });

    return (
        <div>
            <div className="row pt-5">
                <div className="col-6 offset-3">
                    <main className="form-signin">
                        <form onSubmit={formik.handleSubmit}>
                            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
                                <NavLink to='/signUp' className='text-decoration-none'>Registration</NavLink>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
)
}

export default SignIn;