import { useEffect, useState } from "react";
import productData from "../data.json";
import Cart from "./components/Cart";
import Desserts from "./components/Desserts";
import Confirmation from "./components/Confirmation";

export interface Product {
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

export interface cartItem {
  product: Product;
  quantity: number;
}
function App() {
  const [cart, setCart] = useState<cartItem[]>(() => {
    const savedCart = localStorage.getItem("saved");
    if (!savedCart || savedCart === "undefined") return [];
    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(cart));
  }, [cart]);

  const [clickedOrder, setClickedOrder] = useState<boolean>(false);
  useEffect(() => {
    if (clickedOrder) {
      document.body.classList.add("overflow-hidded");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [clickedOrder]);

  function handleAddToCart(productName: string) {
    const selectedProduct = productData.find(
      (item) => productName === item.name,
    );
    if (!selectedProduct) return;
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => productName === item.product.name,
      );

      if (existingItem) {
        return currentCart.map((item) => {
          if (productName === item.product.name) {
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
      handleDeleteItem(productName);
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
  function startNewOrder() {
    setClickedOrder(false);
    setCart([]);
  }

  return (
    <>
      <main className="flex flex-col items-start md:flex-row justify-center relative font-red-hat bg-rose-50 p-8 gap-8">
        <Desserts
          cart={cart}
          handleAddToCart={handleAddToCart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <Cart
          cart={cart}
          deleteItem={handleDeleteItem}
          setClickedOrder={setClickedOrder}
        />
        <Confirmation
          cart={cart}
          clickedOrder={clickedOrder}
          startNewOrder={startNewOrder}
        />
      </main>
    </>
  );
}

export default App;
