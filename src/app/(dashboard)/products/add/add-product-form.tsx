"use client";

import { useId } from "react";
import { useFormState } from "react-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormField,
  FormFieldMessage,
  FormItem,
  FormLabel,
  useFormAction,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(100).trim(),
});

export default function AddProductForm() {
  const formErrorId = useId();
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(addProduct, initialState);
  const form = useFormAction<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form
      {...form}
      serverState={state}
    >
      <form
        action={() => form.handleAction(dispatch)}
        aria-describedby={formErrorId}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormFieldMessage />
            </FormItem>
          )}
        />
        <FormErrorMessage id={formErrorId}>{state.message}</FormErrorMessage>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
