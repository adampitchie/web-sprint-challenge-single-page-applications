import React, { useState } from 'react'
import * as yup from 'yup'
import schema from './formSchema'

const initialFormValues = {
  name: '',
  pizzaSize: '',
  pepperoni: false,
  mushrooms: false,
  olives: false,
  sausage: false,
  instructions: '',
}

const initialFormErrors = {
  name: '',
}

export default function PizzaForm() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;

    yup
      .reach(schema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        console.log('called')
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // if the validation is unsuccessful, we can set the error message to the message
      // returned from yup (that we created in our schema)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // validation error from schema
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: valueToUse,
    });
  }

  return(
    <div className="form container">
      <label>
        Name
        <input
          value={users.name}
          onChange={onChange}
          name="name"
          type="text"
        />
      </label>

      <div classaName="errors">
        <div>{formErrors.name}</div>
      </div>

      
    </div>
  )
}