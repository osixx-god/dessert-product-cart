import { useEffect, useState } from "react";
import productData from "../data.json";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

interface cartItem {
  product: Product;
  quantity: number;
}
function App() {
  const [cart, setCart] = useState<cartItem[]>(() => {
    const savedCart = localStorage.getItem("saved");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(index: number) {
    const selectedProduct: Product = productData[index];
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => selectedProduct.name === item.product.name,
      );
      if (existingItem) {
        return currentCart.map((item) => {
          if (selectedProduct.name === item.product.name) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [{ product: selectedProduct, quantity: 1 }, ...currentCart];
    });
  }
  function handleDeleteItem(productName: string) {
    const updatedCart: cartItem[] = cart.filter(
      (item) => item.product.name !== productName,
    );
    setCart(updatedCart);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  function handleIncrement(productName: string) {
    const selectedProduct = productData.find(
      (item) => item.name === productName,
    );
    setCart((currentCart) => {
      if (selectedProduct) {
        return currentCart.map((item) => {
          if (selectedProduct.name === item.product.name) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return currentCart;
    });
  }
  function handleDecrement(productName: string) {
    const matchingItem = cart.find((item) => item.product.name === productName);
    if (matchingItem && matchingItem.quantity === 1) {
      return handleDeleteItem(productName);
    } else {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  }

  return (
    <>
      <main className="flex flex-col items-start md:flex-row justify-center font-red-hat bg-rose-50 p-8 gap-8">
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
                    <div className="relative">
                      <picture className="block w-full">
                        <source
                          media="(min-width: 1024px)"
                          srcSet={product.image.desktop}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={product.image.tablet}
                        />
                        <img src={product.image.mobile} alt={product.name} />
                      </picture>
                      <button
                        onClick={() => handleAddToCart(index)}
                        className={`border border-brand-red whitespace-nowrap items-center rounded-4xl md:gap-2 md:px-3 lg:gap-3 lg:px-4 gap-3 py-2 px-4 absolute left-1/2 -translate-x-1/2 z-10 min-w-max translate-y-1/2 bottom-0 bg-white  ${itemQuantity > 0 ? "hidden" : "inline-flex"}`}
                      >
                        <img
                          src="../assets/images/icon-add-to-cart.svg"
                          alt="cart icon"
                        />
                        <span className="min-[768px]:max-[900px]:hidden md:text-xs lg:text-base">Add to Cart</span>
                      </button>
                      <div
                        className={`bg-brand-red rounded-4xl py-2 px-4 md:px-3 md:gap-3 lg:px-4 lg:gap-9 absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 ${itemQuantity > 0 ? "flex gap-9 items-center" : "hidden"} `}
                      >
                        <button
                          type="button"
                          aria-label={`decrease ${product.name}`}
                          onClick={() => handleDecrement(product.name)}
                          className="rounded-full border border-white size-4 flex items-center justify-center"
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
                          className="rounded-full border border-white size-4 flex items-center justify-center"
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
        <aside
          className={`p-4 text-xs max-w-80 bg-white ${cart.length > 0 ? "flex flex-col gap-4 p-6" : "hidden"}`}
        >
          <div>
            <h2 className="font-bold text-2xl text-brand-red">
              Your Cart ({totalItems})
            </h2>
            <ul>
              {cart.map((item, index) => {
                const itemQuantity = item.quantity;
                const itemPrice = item.product.price;
                const totalPrice = itemQuantity * itemPrice;
                return (
                  <li
                    key={index}
                    className="flex justify-between border-b border-gray-200 mt-3 items-center py-2"
                  >
                    <div>
                      <h4 className="font-medium">{item.product.name} </h4>
                      <div className="flex gap-4">
                        <span className="text-brand-red font-medium">
                          {itemQuantity}x
                        </span>
                        <span className="text-gray-500">
                          @ ${itemPrice.toFixed(2)}
                        </span>
                        <span className="font-normal">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.product.name)}
                      aria-label={`Remove ${item.product.name}`}
                      className="border rounded-full size-3 border-brand-red flex items-center justify-center "
                    >
                      <img
                        src="../assets/images/icon-remove-item.svg"
                        alt=""
                        className="size-3"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center py-2">
              <span>Order Total</span>
              <strong className="text-2xl">${orderTotal.toFixed(2)}</strong>
            </div>
            <span className="flex bg-rose-50 p-2 rounded-sm items-center gap-1">
              <img
                src="../assets/images/icon-carbon-neutral.svg"
                alt="carbon-neutral icon"
              />
              <span>
                This is <strong>carbon-neutral</strong> delivery
              </span>
            </span>
            <button className="bg-brand-red mt-2 rounded-3xl p-2 text-white text-sm">
              Confirm Order
            </button>
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
