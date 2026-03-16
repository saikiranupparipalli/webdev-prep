import { z } from "zod";

const schema = z.object({
  PORT: z.string().optional(),
});

function getEnv(env: NodeJS.ProcessEnv) {
  const parseport = schema.safeParse(env);
  if (!parseport.success) throw new Error(parseport.error.message);
  return parseport.data;
}

export const env = getEnv(process.env);
