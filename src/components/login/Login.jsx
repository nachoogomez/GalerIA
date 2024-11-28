//Formik
import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik'
import { loginInitialValues} from '../../formik/initialValues'
import { loginValidationSchema } from '../../formik/validationSchema'

//Axios
import {loginUser} from '../../axios/auth'

//Redux
import {useDispatch} from "react-redux";

//React Router
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

import {setCurrentUser} from "../../redux/user/userSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl mt-6 h-screen">
        <div className="hidden bg-cover lg:block lg:w-1/2">
            <img src='https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80' alt="" />
        </div>
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-xl text-center text-gray-600 ">
                Welcome back!
            </p>
            <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                <p href="#" className="text-xs text-center text-gray-500 uppercase hover:underline">Login with email</p>
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            </div>
            <Formik
                initialValues={loginInitialValues}
                validationSchema={loginValidationSchema}
                onSubmit={async (values) => {

                    const user = await loginUser(values.email, values.password);
  
                    if(user) {
                    dispatch(setCurrentUser({
                        ...user,
                    }))
                        navigate('/')
                    }
  
                }}
            >
                <FormikForm>
                    <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-600 ">Email Address</label>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            required
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                            <a href="#" className="text-xs text-gray-500  hover:underline">Forget Password?</a>
                        </div>

                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required 
                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                            <Link to="/register" className="text-xs text-gray-500 uppercase hover:underline">
                            or sign up
                            </Link>

                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </FormikForm>
            </Formik>
        </div>
    </div>
  )
}

export default Login