import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser, findUser, } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";
import './SignUp.css';

import {
    Form,
    Input,
    Button,
    Typography,
} from 'antd';

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function isInUse(message, dataType, dispatch) {

    return this.test("isInUse", message, function (value) {
        const { path, createError } = this;
        let dataToSubmit = {
            dataType,
            value
        };

        return dispatch(findUser(dataToSubmit))
            .then(response => {
                if (response.payload.findSuccess) {
                    return createError({ path, message: message });
                }
                else {
                    return true;
                }
            });
    });

}

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    Yup.addMethod(Yup.string, "isInUse", isInUse);

    return (
        <>
            {/* <h1 className="sign-up-h1">SIGN UP</h1> */}
            <Formik
                initialValues={{
                    email: '',
                    Nickname: '',
                    name: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .max(16, 'Name is too long.')
                        .required('Name is required'),
                    Nickname: Yup.string()
                        .required('Nickname is required')
                        .max(8, 'Nickname is too long.')
                        .isInUse('Nickname is already in use.', 'Nickname', dispatch),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required')
                        .isInUse('Email is already in use.', 'email', dispatch),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {

                        let dataToSubmit = {
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            Nickname: values.Nickname,
                            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                            // moment().unix() : Unix Timestamp in seconds.
                            // `http://gravatar.com/avatar/${moment().unix()}?d=identicon` : Generate a random gravatar icon.
                        };

                        dispatch(registerUser(dataToSubmit)).then(response => {
                            if (response.payload.success) {
                                navigate('/sign-in');
                            } else {
                                alert(response.payload.err.errmsg)
                            }
                        })

                        setSubmitting(false);
                    }, 500);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        //dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <div className="sign-up">
                            <Title level={2} style={{ textAlign: 'center' }}>Sign up</Title>
                            <Form className='sign-up-form' {...formItemLayout} onSubmit={handleSubmit} >

                                <Form.Item required label="Name" className="sign-up-form-item">
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.name && touched.name ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.name && touched.name) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.name}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item required label="Nickname" className="sign-up-form-item">
                                    <Input
                                        id="Nickname"
                                        placeholder="Enter your Nickname"
                                        type="text"
                                        value={values.Nickname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.Nickname && touched.Nickname ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.Nickname && touched.Nickname) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.Nickname}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? 'error' : touched.email ? 'success' : ''} className="sign-up-form-item">
                                    <Input
                                        id="email"
                                        placeholder="Enter your Email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.email && touched.email) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.email}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? 'error' : touched.password ? 'success' : ''} className="sign-up-form-item">
                                    <Input
                                        id="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.password && touched.password) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.password}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item required label="Confirm" hasFeedback className="sign-up-form-item">
                                    <Input
                                        id="confirmPassword"
                                        placeholder="Enter your confirmPassword"
                                        type="password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {(errors.confirmPassword && touched.confirmPassword) ? (
                                        <div className="input-feedback" style={{ color: "rgb(171, 138, 247)", }}>{errors.confirmPassword}</div>
                                    ) : (<div>&nbsp;</div>)}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout} className="sign-up-form-item">
                                    <Button onClick={handleSubmit} type="primary" className="sign-up-form-left-button" disabled={isSubmitting} >
                                        Submit
                                    </Button>
                                    <Button onClick={handleReset} type="primary" className="sign-up-form-right-button">
                                        Reset
                                    </Button>
                                </Form.Item>

                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </>
    );
};

export default Auth(SignUp, false);