import productData from "../../data.json";
import type { cartItem } from "../App";
import type { Product } from "../App";

interface DessertsProps {
    cart: cartItem[];
    handleAddToCart: (productName: string) => void;
    handleIncrement: (productName: string) => void;
    handleDecrement: (productName: string) => void;

}
function Desserts ({cart, handleAddToCart, handleDecrement, handleIncrement}: DessertsProps){

    return(
        <section className="flex-1 min-w-0">
          <h1 className="text-5xl font-bold mb-4">Desserts</h1>
          <ul className="flex flex-col md:grid grid-cols-3 gap-4">
            {productData.map((product: Product, index) => {
              const cartItem = cart.find(
                (item) => product.name === item.product.name,
              );
              const itemQuantity = cartItem?.quantity ?? 0;

              return (
                <li key={index} className="flex flex-col">
                  <article className="">
                    <div className={`${itemQuantity > 0 ? "border-2 border-brand-red": ""} relative rounded-lg`}>
                      <picture className="block w-full rounded-lg">
                        <source
                          media="(min-width: 1024px)"
                          srcSet={product.image.desktop}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={product.image.tablet}
                        />
                        <img className="rounded-lg" src={product.image.mobile} alt={product.name} />
                      </picture>
                      <button
                        onClick={() => handleAddToCart(product.name)}
                        className={`border border-rose-300 hover:border-brand-red whitespace-nowrap items-center rounded-4xl md:gap-2 md:px-3 lg:gap-3 lg:px-4 gap-3 py-2 px-4 absolute left-1/2 -translate-x-1/2 z-2 min-w-max translate-y-1/2 bottom-0 bg-white  ${itemQuantity > 0 ? "hidden" : "inline-flex"}`}
                      >
                        <img
                          src="../assets/images/icon-add-to-cart.svg"
                          alt="cart icon"
                        />
                        <span className="min-[768px]:max-[900px]:hidden md:text-xs lg:text-base">
                          Add to Cart
                        </span>
                      </button>
                      <div
                        className={`bg-brand-red rounded-4xl py-2 px-4 md:px-3 md:gap-3 lg:px-4 lg:gap-9 absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 ${itemQuantity > 0 ? "flex gap-9 items-center" : "hidden"} `}
                      >
                        <button
                          type="button"
                          aria-label={`decrease ${product.name}`}
                          onClick={() => handleDecrement(product.name)}
                          className="rounded-full border border-white hover:bg-white/30 size-4 flex items-center justify-center"
                        >
                          <img
                            src="../assets/images/icon-decrement-quantity.svg"
                            alt=""
                          />
                        </button>
                        <span className="text-white">{itemQuantity}</span>
                        <button
                          type="button"
                          aria-label={`increase ${product.name}`}
                          onClick={() => handleIncrement(product.name)}
                          className="rounded-full border border-white  hover:bg-white/30 size-4 flex items-center justify-center"
                        >
                          <img
                            src="../assets/images/icon-increment-quantity.svg"
                            alt="plus sign"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col">
                      <span className="font-normal text-gray-400">
                        {product.category}
                      </span>
                      <span className="font-medium">{product.name}</span>
                      <span className="font-bold text-brand-red">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

    )
}
export default Desserts;