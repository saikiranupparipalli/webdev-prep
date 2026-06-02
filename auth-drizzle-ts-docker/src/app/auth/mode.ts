import { z } from "zod";

export const signUpModel = z.object({
  firstName: z.string().max(15),
  lastName: z.string().max(10),
  email: z.email(),
  password: z.string(),
});

export const signInModel = z.object({
  email: z.email(),
  password: z.string(),
});
