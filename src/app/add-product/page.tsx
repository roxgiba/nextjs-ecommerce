import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title:"Add Product - NatureList"
}

// server actions Next
async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if(!name || !description || !imageUrl || !price) {
    throw Error ("Missing required field")
  }
  
  await prisma.product.create({
    data: {name, description,imageUrl,price}
  });
  redirect("/")
}

export default function AddProductPage() {
  return (
  <div>
    <h1 className="text-lg mb-3 font-bold text-black">Add product</h1>
    <form action={addProduct}>
      <input 
      required 
      name="name"
      placeholder="Name"
      className="mb-3 w-full input-bordered input"
      />
      <textarea
      required
      name="description"
      placeholder="Description"
      className="textarea-bordered textarea mb-3 w-full"
      />
      <input 
      required 
      name="imageUrl"
      placeholder="Image URL"
      type="url"
      className="mb-3 w-full input-bordered input"
      />
      <input 
      required 
      name="price"
      placeholder="Price"
      type="number"
      className="mb-3 w-full input-bordered input"
      />
      <button className="btn btn-primary btn-block" type="submit">
        Add Product
      </button>
    </form>
  </div>
  )
}