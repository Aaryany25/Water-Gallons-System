import React from 'react'
import { Button } from "../components/ui/button"
import {  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet} from '../components/ui/field'
  import { Input } from "../components/ui/input"
import { useForm } from "react-hook-form"
import useAuthStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
function Login() {
     const navigate = useNavigate()
 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => 
  {
    console.log("data",data)
    useAuthStore.getState().login(data)
    .then(() => {
      navigate("/User")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
         <div className="w-full max-w-md border rounded px-4 py-2 mx-auto mt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend>Login</FieldLegend>
                    <FieldDescription>
                     Login to place your order
                    </FieldDescription>
                    <FieldGroup>
                      
                      <Field>
                        <FieldLabel htmlFor="name">
                         Email
                        </FieldLabel>
                        <Input
                        type="email"
                          id="email"
                           {...register("email")}
                          placeholder="Enter your email"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="name">
                         password
                        </FieldLabel>
                        <Input
                        type="password"
                          id="password"
                          {...register("password")}
                          placeholder="password"
                          required
                        />
                      </Field>
                      
                    </FieldGroup>
                  </FieldSet>
                  <FieldSeparator />
                 
                  <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                   
                  </Field>
                </FieldGroup>
              </form>
            </div>
    </div>
  )
}

export default Login