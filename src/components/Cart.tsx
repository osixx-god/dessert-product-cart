import type { cartItem } from "../App";
interface CartProps {
  cart: cartItem[];
  deleteItem: (productName: string) => void;
  setClickedOrder: (value: boolean) => void;
}
function Cart({ cart, deleteItem, setClickedOrder }: CartProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <aside className="p-4 text-xs w-full md:max-w-80 bg-white">
      <div
        className={` ${cart.length > 0 ? "flex flex-col gap-4 p-6" : "hidden"} `}
      >
        <div>
          <h2 className="font-bold text-2xl text-brand-red">
            Your Cart ({totalItems})
          </h2>
          <ul>
            {cart.map((item) => {
              const itemQuantity = item.quantity;
              const itemPrice = item.product.price;
              const totalPrice = itemQuantity * itemPrice;
              return (
                <li
                  key={item.product.name}
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
                    onClick={() => deleteItem(item.product.name)}
                    aria-label={`Remove ${item.product.name}`}
                    className="border rounded-full size-3 border-rose-400 hover:border-brand-red flex items-center justify-center "
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
          <button
            onClick={() => setClickedOrder(true)}
            className="bg-brand-red hover:bg-rose-800 mt-2 rounded-3xl p-2 text-white text-sm"
          >
            Confirm Order
          </button>
        </div>
      </div>
      <div
        className={`${cart.length === 0 ? "flex" : "hidden"} flex-col gap-4 p-6`}
      >
        <h2 className="font-bold text-2xl text-brand-red">
          Your Cart ({totalItems})
        </h2>
        <img
          src="../assets/images/illustration-empty-cart.svg"
          alt="empty cart illustration"
        />
        <span>Your added items will appear here</span>
      </div>
    </aside>
  );
}
export default Cart;
