import React from 'react';
import { withFormik, Form, Field } from 'formik';


const UserForm = () => {
    return(
       
        <Form>
            <Field type="text" name="name" placeholder="name"/>
            <Field type="text" name="password" placeholder="password"/>
            <Field type="text" name="email" placeholder="email"/>
            <button type="submit">Submit</button>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (values) =>{
    return {

    }
}
})(UserForm)