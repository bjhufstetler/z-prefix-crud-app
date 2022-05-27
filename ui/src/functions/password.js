import bcrypt from 'bcryptjs';

export const sha256 = (password, salt) => {
    const hash = bcrypt.hashSync(password, salt)
    return({salt, hash})
}