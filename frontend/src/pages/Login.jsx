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

function Login() {
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
      await useAuthStore.getState().login(data)
      navigate("/user")
    } catch (error) {
      console.error("Login error:", error)
      setServerError(
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials."
      )
    }
  }

  return (
    <div>
      <div className="w-full max-w-md border rounded px-4 py-2 mx-auto mt-10 shadow-sm bg-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Login</FieldLegend>
              <FieldDescription>
                Login to place your order
              </FieldDescription>

              {serverError && (
                <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 my-1" role="alert">
                  {serverError}
                </div>
              )}

              <FieldGroup>
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
           
            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default Login