import { useState, useEffect, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CartComponent from "./Components/CartComponent/CartComponent";
import Dashboard from "./Components/Dashboard";
import Loading from "./Components/Loading";
const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        tele.ready();
    });

    console.log(cartItems);

    const onAdd = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }]);
        }
    };

    const onRemove = (food) => {
        const exist = cartItems.find((x) => x.id === food.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : x
                )
            );
        }
    };

    const onCheckout = () => {
        navigate("/cart");
    };

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            foods={foods}
                            onRemove={onRemove}
                            onAdd={onAdd}
                            onCheckout={onCheckout}
                            cartItems={cartItems}
                        />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartComponent
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            setCartItems={setCartItems}
                        />
                    }
                />
            </Routes>
        </Suspense>
    );
}

export default App;
