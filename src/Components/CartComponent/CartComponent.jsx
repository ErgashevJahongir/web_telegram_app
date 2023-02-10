import { motion } from "framer-motion";
import "./CartComponent.css";

const CartComponent = ({
    cartItems,
    modal,
    onRemove,
    onAdd,
    setCartItems,
    setModal,
}) => {
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const deleteAll = () => {
        setCartItems([]);
    };
    return (
        <div
            className="cart__component"
            style={
                modal ? { opacity: 1, zIndex: 9 } : { opacity: 0, zIndex: -1 }
            }
        >
            <button
                className="close"
                type="button"
                onClick={() => setModal(false)}
            >
                Close
            </button>
            <motion.div
                className="cart-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{
                    once: true,
                    amount: 0.8,
                }}
            >
                <motion.div
                    variants={{
                        offscreen: {
                            opacity: 0,
                            // y: 200,
                        },
                        onscreen: {
                            opacity: 1,
                            // y: 0,
                            transition: {
                                type: "spring",
                                bounce: 0.3,
                                duration: 1.5,
                                delay: 0.5,
                            },
                        },
                    }}
                >
                    <div>
                        <div className="cart-title">
                            <h3>Shopping Cart</h3>
                            <span role="button" onClick={deleteAll}>
                                Delete all
                            </span>
                        </div>
                        {cartItems[0] ? (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Amount</th>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className="cartItem"
                                                >
                                                    <td>
                                                        <img
                                                            loading="lazy"
                                                            decoding="async"
                                                            width={100}
                                                            height={100}
                                                            src={item.Image}
                                                            alt={item.title}
                                                        />
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>
                                                        {item.price.toFixed(2)}{" "}
                                                        $
                                                    </td>
                                                    <td>
                                                        <div className="cart-buuton-container">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onRemove(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <span>
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    onAdd(item)
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {(
                                                            item.quantity *
                                                            item.price
                                                        ).toFixed(2)}{" "}
                                                        $
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="total-price">
                                    <h3>Total price: </h3>
                                    <h3>{totalPrice.toFixed(2)} $</h3>
                                </div>
                            </div>
                        ) : (
                            <h3
                                style={{
                                    textAlign: "center",
                                    margin: "60px 0 50px",
                                }}
                            >
                                Hali mahsulot tanlanmagan :)
                            </h3>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CartComponent;
