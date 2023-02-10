import { useNavigate } from "react-router-dom";
import "./CartComponent.css";

const CartComponent = ({ cartItems, onRemove, onAdd, setCartItems }) => {
    const navigate = useNavigate("/");
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    const deleteAll = () => {
        setCartItems([]);
    };

    return (
        <div className="cart--component">
            <div className="cart-container">
                <button
                    className="close"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    X
                </button>
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
                                                    {item.price.toFixed(2)} $
                                                </td>
                                                <td>
                                                    <div className="cart-buuton-container">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                onRemove(item)
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
                            <div className="buy">
                                <button>Buy</button>
                            </div>
                        </div>
                    ) : (
                        <h3
                            style={{
                                textAlign: "center",
                                margin: "60px 0 50px",
                            }}
                        >
                            No product selected yet :)
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartComponent;
