import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

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

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product")
  }


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
      <FormSubmitButton className="btn-block">
        Add Product
      </FormSubmitButton>
    </form>
  </div>
  )
}