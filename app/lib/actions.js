import { User } from "./models"
import { connectToDB } from "./utils"

export const addUser = async(formData)=>{
    "use server"
    const {username, email,password,phone, address, isAdmin, isActive} = Object.fromEntries(formData)

    try {
        connectToDB()
        const newUser = new User({username, email,password,phone, address, isAdmin, isActive})
        await newUser.save()
    } catch (error) {
        console.error(error)
        throw new Error("Failed to create user!")
    }

}