import { compare, hash } from "bcrypt"



export const hashPassword = (text: string): Promise<string> => {
    return hash(text, 8);
}

export const verifyPassword = (yourPassword: string, dataPassword: string): Promise<boolean> => {
    return compare(yourPassword, dataPassword)
}