import { getProducts as getProductsAction } from "./_api/actions/products";


async function getProducts() {
  try {
    const products = await getProductsAction();
    return products;
  } catch (e) {
    alert(e)
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div>
      <h1 className="text-2xl text-center">Home</h1>
    </div>
  );
}
