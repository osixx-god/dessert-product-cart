import type { cartItem } from "../App";
interface ConfirmationProps {
  cart: cartItem[];
  clickedOrder: boolean;
  startNewOrder: () => void;
}
function Confirmation({
  cart,
  clickedOrder,
  startNewOrder,
}: ConfirmationProps) {
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className={` bg-gray-900/80 flex-col items-center justify-center fixed inset-0 z-4 overflow-hidden bg-cover w-full h-full  ${clickedOrder ? "flex" : "hidden"} `}
    >
      <div
        className={`flex flex-col z-10 px-6 py-6 items-start bg-white rounded-lg max-h-[90vh] overflow-y-auto  `}
      >
        <img
          src="../../assets/images/icon-order-confirmed.svg"
          alt="icon confirmed"
        />
        <h1 className="font-bold text-2xl mt-6">Order Confirmed</h1>
        <h4>We hope you enjoy your food!</h4>
        <div className="bg-rose-100 p-4 mt-4 rounded-sm ">
          <ul className="flex flex-col gap-4">
            {cart.map((item) => {
              const itemQuantity = item.quantity;
              const itemPrice = item.product.price;
              const totalPrice = itemQuantity * itemPrice;
              return (
                <li key={item.product.name} className="flex gap-4 items-center">
                  <img
                    src={item.product.image.thumbnail}
                    alt={item.product.name}
                  />
                  <div className="flex flex-col ">
                    <h4 className="font-medium">{item.product.name} </h4>
                    <div className="flex gap-4">
                      <span className="text-brand-red font-medium">
                        {itemQuantity}x
                      </span>
                      <span className="text-gray-500">
                        @ ${itemPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium ml-auto">
                    ${totalPrice.toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span>Order Total</span>
            <strong className="text-2xl">${orderTotal.toFixed(2)}</strong>
          </div>
        </div>
      <button
        onClick={startNewOrder}
        className="bg-brand-red hover:bg-rose-800 rounded-3xl  py-2 px-16 mt-4 text-white text-sm mx-auto"
      >
        Start New Order
      </button>
      </div>
    </div>
  );
}
export default Confirmation;
