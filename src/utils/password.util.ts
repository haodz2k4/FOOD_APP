import { hash } from "bcrypt"



export const hashPassword = (text: string): Promise<string> => {
    return hash(text, 8);
}