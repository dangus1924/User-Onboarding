import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';


const UserForm = ({errors, status, touched}) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    },[status])
    return(
       
        <Form className="form">
            <h1>Welcome</h1>
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
            <Field type="text" name="name" placeholder="name"/>
            
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
            <Field type="text" name="email" placeholder="email"/>
            
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <Field type="password" name="password" placeholder="password"/>
            
            {touched.agreement && errors.agreement && <p className="error">{errors.agreement}</p>}
            <label>
                <Field type="checkbox" name="agreement"/>
                {/* <p>this is the terms and the service of this agreement
                    please make sure that you read over everything before you make
                    a new life commitment. Once you accept this agreement you now 
                    owe me one million pounds of solid gold bars.
                </p> */}
                <span>Terms of Service</span>
            </label>
            <button type="submit">Submit</button>
            {users.map(user => (
                <div>name:{user.name}</div>
            ))}
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) =>{
    return {
        name: values.name || '',
        email: values.email || '',
        password: values.password || '',
        agreement: values.agreement || false

    }
},
validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    agreement: yup.boolean().oneOf([true]),
}),
handleSubmit: (values, {setStatus}) => {
    axios.post('https://reqres.in/api/users',values)
    .then((res) => {
        console.log(res)
        setStatus(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    console.log(values)
},

})(UserForm)