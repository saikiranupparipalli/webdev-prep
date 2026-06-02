import { signInModel, signUpModel } from "./mode.js";
import type { Request, Response } from "express";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

export class Authcontroller {
  public async signUp(req: Request, res: Response) {
    const userInfo = await signUpModel.safeParseAsync(req.body);
    if (userInfo.error)
      return res
        .status(400)
        .json({ message: `validation failed`, error: userInfo.error.issues });

    const { firstName, lastName, email, password } = userInfo.data;

    const checkUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (checkUser.length > 0)
      return res
        .status(409)
        .json({ message: `user with ${email} email already exist` });

    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const user = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt,
      })
      .returning({ id: usersTable.id });

    return res.status(200).json({ message: `singup successful` });
  }

  public async signIn(req: Request, res: Response) {
    const userInfo = await signInModel.safeParseAsync(req.body);

    if (userInfo.error)
      return res
        .status(409)
        .json({ message: `validation failed`, error: userInfo.error });

    const { email, password } = userInfo.data;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

      if(!user) return res.status(401).json({messsage:`user does not exist`})

        const salt = randomBytes(32).toString("hex")
        const hash = createHmac('sha256', salt).update(password).digest("hex")

        if(user.salt !== hash) return res.status(404).json({message: `invalid email or password`})

            
  }
}
