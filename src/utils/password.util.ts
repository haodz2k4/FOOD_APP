import { compare, hash } from "bcrypt"



export const hashPassword = (text: string): Promise<string> => {
    return hash(text, 8);
}

export const verifyPassword = (dataPassword: string, yourPassword): Promise<boolean> => {
    return compare(dataPassword, yourPassword)
}