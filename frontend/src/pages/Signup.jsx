import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import {  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError} from '../components/ui/field'
import { Input } from "../components/ui/input"
import { useForm } from "react-hook-form"
import useAuthStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("")
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setServerError("")
    try {
      await useAuthStore.getState().register(data)
      navigate("/login")
    } catch (error) {
      console.error("Signup error:", error)
      setServerError(
        error.response?.data?.message || 
        error.message || 
        "Failed to register. Please check your inputs and try again."
      )
    }
  }

  return (
    <div className="w-full max-w-md border rounded px-4 py-2 mx-auto mt-10 shadow-sm bg-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Signup</FieldLegend>
            <FieldDescription>
              To Place an Order you need to SignUp first
            </FieldDescription>
            
            {serverError && (
              <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 my-1" role="alert">
                {serverError}
              </div>
            )}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">
                  Name
                </FieldLabel>
                <Input
                  type="text"         
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  placeholder="Evil Rabbit"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.name}
                />
                <FieldError errors={errors.name ? [errors.name] : []} />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                />
                <FieldError errors={errors.email ? [errors.email] : []} />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">
                  Password
                </FieldLabel>
                <Input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                  placeholder="password"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.password}
                />
                <FieldError errors={errors.password ? [errors.password] : []} />
              </Field>
              
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
         
          <Field orientation="horizontal" className="justify-between">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button variant='outline' disabled={isSubmitting}>
              <Link to="/login">Login</Link>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Signup