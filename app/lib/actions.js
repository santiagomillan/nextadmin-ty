"use server"
import { revalidatePath } from "next/cache"
import { Products, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { signIn } from "../auth"


export const addUser = async(formData)=>{
    // "use server"
    const {username, email,password,phone, address, isAdmin, isActive} = Object.fromEntries(formData)

    try {
        connectToDB()
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({username, email,password:hashedPassword,phone, address, isAdmin, isActive})
        await newUser.save()
    } catch (error) {
        console.error(error)
        throw new Error("Failed to create user!")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}

export const updateUser = async(formData)=>{
    // "use server"
    const {id,username, email,password,phone, address, isAdmin, isActive} = Object.fromEntries(formData)

    try {
        connectToDB()
        const updateFields = {
            username, email,password,phone, address, isAdmin, isActive
        }

        Object.keys(updateFields).forEach((key) => (updateFields[key] ===  "" || undefined) && delete updateFields[key])

        await User.findByIdAndUpdate(id, updateFields)
        
    } catch (error) {
        console.error(error)
        throw new Error("Failed to update user!")
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
}


export const addProduct = async(formData)=>{
    // "use server"
    const {title, desc, price, stock, color, size  } = Object.fromEntries(formData)

    try {
        connectToDB()
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)
        const newProduct = new Products({title, desc, price, stock, color, size})
        await newProduct.save()
    } catch (error) {
        console.error(error)
        throw new Error("Failed to create product!")
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}

export const updateProduct = async(formData)=>{
    // "use server"
    const {id,title, desc, price, stock, color, size} = Object.fromEntries(formData)

    try {
        connectToDB()
        const updateFields = {
            title, desc, price, stock, color, size
        }

        Object.keys(updateFields).forEach((key) => (updateFields[key] ===  "" || undefined) && delete updateFields[key])

        await Products.findByIdAndUpdate(id, updateFields)
        
    } catch (error) {
        console.error(error)
        throw new Error("Failed to update product!")
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
}



export const deleteProduct = async(formData)=>{
    const {id  } = Object.fromEntries(formData)

    try {
        connectToDB()
        await Products.findByIdAndDelete(id)
    } catch (error) {
        console.error(error)
        throw new Error("Failed to delete product!")
    }
    revalidatePath("/dashboard/products")
    // redirect("/dashboard/products")
}


export const deleteUser = async(formData)=>{
    const {id  } = Object.fromEntries(formData)

    try {
        connectToDB()
        await User.findByIdAndDelete(id)
    } catch (error) {
        console.error(error)
        throw new Error("Failed to delete user!")
    }
    revalidatePath("/dashboard/users")
    // redirect("/dashboard/products")
}

// export const authenticate = async (formData) => {
//     const {username, password} = Object.fromEntries(formData)
//     console.log(username, password)
//     try {
//         await signIn("credentials", {username, password})
//     } catch (error) {
//         console.log(error)
//         throw new Error("Failed to login!")
//     }
// }
// export const authenticate = async (prevState, formData) => {
//     const { username, password } = Object.fromEntries(formData);
  
//     try {
//       await signIn("credentials", { username, password });
//     } catch (err) {
//     //   if (err.message.includes("CredentialsSignin")) {
//     //     return "Wrong Credentials";
//     //   }
//     //   console.log(err)
//     //   throw err;
//     return "Wrong Credentials";
//     }
//   };

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
  };