interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: Props) => (
  <div className="border p-4 rounded shadow hover:shadow-lg">
    <h2 className="font-bold">{product.name}</h2>
    <p>Price: KES {product.price}</p>
    <p>Stock: {product.stock}</p>
    <button 
      onClick={() => addToCart(product)} 
      className="mt-2 p-2 bg-green-500 text-white rounded w-full"
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
