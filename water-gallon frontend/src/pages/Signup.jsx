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

function Signup() {
  return (
 <div className="w-full max-w-md border rounded px-4 py-2 mx-auto mt-10">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Signup</FieldLegend>
            <FieldDescription>
             To Place an Oder you need to SignUp first
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">
                 Name
                </FieldLabel>
                <Input
                type="text"         
                         id="name"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">
                 Email
                </FieldLabel>
                <Input
                type="email"
                  id="email"
                  placeholder="Evil Rabbit"
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
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
         
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Signup