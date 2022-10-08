import React, { useEffect, useState } from 'react'
import { Form, Formik, FastField } from 'formik'
import * as Yup from 'yup'
import { SignupSchema, CustomeInput } from '../../../core'
const initialValues = {
  title: '',
  // lastName: '',
  // email: '',
}


const HomePage = (props: any) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),

    categoryId: Yup.number()
      .required('This field is required.')
      .nullable(),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required.'),
      otherwise: Yup.string().notRequired(),
    })
  });
  return (
    <div style={{}}>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        style={{backgroundColor: 'red',}}
      >
        {formikProps => {
          // do something here ...
          const { values, errors, touched, isSubmitting } = formikProps;
          console.log({ values, errors, touched });

          return (
            <Form>
              <FastField
                name="title"
                component={CustomeInput.InputField}
                label="Title"
                placeholder="Eg: Wow nature ..."
              />

              {/* <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            /> */}

            </Form>
          );
        }}
      </Formik>

    </div>
  );
};

export default HomePage;
