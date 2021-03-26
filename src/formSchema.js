import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string()
  .required('name is required')
  .min(2, 'name must be 2 characters long')
})