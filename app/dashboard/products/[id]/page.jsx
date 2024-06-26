import styles from "@/app/ui/dashboard/products/singleProduct/singleUser.module.css";
import Image from "next/image";

const SingleProductPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noproduct.jpg" alt="" fill/>
                </div>
                Iphone
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Iphone"/>
                    <label>Price</label>
                    <input type="number" name="price" placeholder="999"/>
                    <label>Stock</label>
                    <input type="text" name="stock" placeholder="23"/>
                    <label>Color</label>
                    <input type="text" name="color" placeholder="red"/>
                    <label>Size</label>
                    <input type="text" name="size" placeholder="XL"/>
                    <label>Category</label>
                    <select name="cat" id="cat">
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label>Description</label>
                    <textarea name="desv" id="desc" rows="10" placeholder="Description..."></textarea>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage