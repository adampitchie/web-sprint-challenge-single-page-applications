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
  const [orders, setOrders] = useState([])
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


  const onSubmit = (evt) => {
    evt.preventDefault();

    const newOrder = {
      name: formValues.name.trim(),
      pizzaSize: formValues.pizzaSize,
      instructions: formValues.instructions.trim(),
      toppings: ['pepperoni','mushrooms','olives','sausage'].filter(topping => formValues[topping])
    }
    setOrders([newOrder])
    console.log("here")
    console.log(orders)
  }

  return(
    <div>
      <form className="form container" onSubmit={onSubmit}>
        <label>
          Name
          <input
            value={formValues.name}
            onChange={onChange}
            name="name"
            type="text"
          />
          {formErrors.name}
        </label>
        <div></div>

        <label>
          Pizza Size
          <select onChange={onChange} value ={formValues.pizzaSize} name="pizzaSize">
            <option value="">-Select an option-</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <h3>Toppings</h3>
        <label>
          Pepperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={formValues.pepperoni}
            onChange={onChange}
          />
        </label>
        <label>
          Mushrooms
          <input
            type="checkbox"
            name="mushrooms"
            checked={formValues.mushrooms}
            onChange={onChange}
          />
        </label>
        <label>
          Olives
          <input
            type="checkbox"
            name="olives"
            checked={formValues.olives}
            onChange={onChange}
          />
        </label>
        <label>
          Sausage
          <input
            type="checkbox"
            name="sausage"
            checked={formValues.sausage}
            onChange={onChange}
          />
        </label>

        <h3>Special Instructions</h3>
        <label>
          
          <input
            value={formValues.instructions}
            onChange={onChange}
            name="instructions"
            type="text"
          />
        </label>
        <div>
          <button>Add to Order</button>
        </div>
      </form>
      {
        orders.map((order, idx) => {
          return(
            <div key={idx}>
            <div>Name: {order.name}</div>
            <div>Pizza Size: {order.pizzaSize}</div>
            <div>Toppings: {order.toppings}</div>
            <div>Instructions: {order.instructions}</div>
          </div>
          )
        })
      }
    </div>
  )
}