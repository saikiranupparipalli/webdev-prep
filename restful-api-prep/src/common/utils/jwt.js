import crypto from "crypto"

const generateToken = ()=>{
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(rawToken)
    return {rawToken, hashedToken}
}

export default generateToken