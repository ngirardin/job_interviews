import { Formik } from "formik";
import React, { Component } from "react";
import * as yup from "yup";

class Form extends Component {
  constructor(props) {
    super(props);
    //    this.state = {
    //      isEmailValid: false,
    //      isNameValid: false,
    //      isPhoneValid: false,
    //      isUrlValid: false
    //    };

    this.state = {
      isValid: false
    };
  }

  render() {
    /*
      
    Name: A string that consists of between 3 and 30 (inclusive) upper and lower case English alphabetic letters only.
    E-mail: A standard email address. For example, user@domain.extension is valid but user@domain is not.
    Phone: A 10-digit number that does not begin with 0 or 1.
    Blog URL: A standard URL that covers cases such as http://domain.extension, http://www.domain.extension, www.domain.extension, and domain.extension.

The entire form should get validated on button click based on the criterions mentioned above and display a message accordingly.
If all input fields contain valid values, the message Form is Complete! should be displayed.
If one or more fields contains an invalid value, the message Form is Incomplete! should be displayed.
Component flow diagram of the application is as follows:
      */

    return (
      <div className="row">
        <h1 className="text-center">Form Validation</h1>

        <Formik
          initialValues={{ name: "", email: "", phone: "", blog: "" }}
          onSubmit={(values, { setSubmitting }) => {
            const schema = yup.object().shape({
              name: yup
                .string()
                .required()
                .min(3)
                .max(30),
              email: yup
                .string()
                .required()
                .email(),
              phone: yup
                .string()
                .required()
                .matches(/^[2-9]\d{9}$/),
              blog: yup
                .string()
                .required()
                .matches(/^([a-z]*)$/)
            });

            schema.validate(values).catch(function(err) {
              console.log(err);
            });

            schema.isValid(values).then(valid => {
              this.setState({ isValid: valid });
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <h3>Name:</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>

              <div>
                <h3>Email:</h3>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>

              <div>
                <h3>Phone:</h3>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={values.phone}
                />
              </div>

              <div>
                <h3>Blog URL:</h3>
                <input
                  type="text"
                  name="blog"
                  placeholder="Enter your blog URL"
                  onChange={handleChange}
                  value={values.blog}
                />
              </div>

              <div className="small-6 small-centered text-center columns">
                <a
                  href="#"
                  className="button success expand round text-center"
                  onClick={handleSubmit}
                >
                  Verify
                </a>
              </div>
              <h1 className="text-center">
                {this.state.isValid
                  ? "Form is Complete!"
                  : "Form is Incomplete!"}
              </h1>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Form;
