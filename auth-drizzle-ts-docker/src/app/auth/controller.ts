import { signInModel, signUpModel } from "./mode.js";
import type { Request, Response } from "express";
import { db } from "../../db/db.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { accessToken, refresToken, type userToken } from "./utils/tokens.js";
import { authenticateUser } from "./middleware/authenticate.js";

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

    if (!user) return res.status(401).json({ messsage: `user does not exist` });

    // const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", user.salt!).update(password).digest("hex");

    if (user.password !== hash)
      return res.status(404).json({ message: `invalid email or password` });

    const accesstoken = accessToken({
      email: user.email,
      id: user.id,
    }) as userToken;

    const refreshtoken = refresToken({ id: user.id });

    const saltrefreshtoken = randomBytes(32).toString("hex");
    const hashrefreshtoken = createHmac("sha256", saltrefreshtoken)
      .update(refreshtoken)
      .digest("hex");


     const updateRefreshtoken =  await db.update(usersTable).set({refreshtoken: hashrefreshtoken}).where(eq(usersTable.id, user.id))


     return res.status(201).json({message: `sign-in successful`, data: {
      accesstokenn: accesstoken,
      refreshtokenn: refreshtoken,
      email: user.email,
      
     }})
  }

  public async getMe(req:Request, res:Response){
      const {id} = req.id as userToken

     const [dbResult] =  await db.select().from(usersTable).where(eq(usersTable.id, id))

     return res.status(200).json({message:`user authenticated`, data:{
      firstName:  dbResult?.firstName,
      lastName:  dbResult?.lastName,
      email: dbResult?.email
     }})
  }
}
