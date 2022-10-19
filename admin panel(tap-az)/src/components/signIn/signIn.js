import React, {useContext} from "react";
import {useFormik} from "formik";
import validationSchema from "./validation";
import {apiSignIn} from "../../api";
import {Context} from "../../context/context";

const SignIn = () => {
    const {signIn} = useContext(Context);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            let responseData = await apiSignIn(values);
            signIn(responseData);
        },
    });
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3 pt-5">
                        <main className="form-signin w-100 m-auto">
                            <form onSubmit={formik.handleSubmit}>
                                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email && 'is-invalid'} ${formik.touched.email && !formik.errors.email && 'is-valid'}`}
                                        id="floatingInput"
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
                                        id="floatingPassword"
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
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;