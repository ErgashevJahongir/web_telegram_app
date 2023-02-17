import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getMainer } from "./Api/Axios";
import "./App.css";
const CartComponent = lazy(() =>
    import("./Components/CartComponent/CartComponent")
);
const Dashboard = lazy(() => import("./Components/Dashboard"));
const Loading = lazy(() => import("./Components/Loading"));
const Product = lazy(() => import("./Components/Product/Product"));

const tele = window.Telegram.WebApp;

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(
        sessionStorage.getItem("userId") || null
    );
    const navigate = useNavigate();
    const { data: mainer, isLoading } = useQuery(["mainer"], () => getMainer());

    useEffect(() => {
        tele.ready();
    });

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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route
                    path="/dashboard/:userId"
                    element={
                        <Dashboard
                            mainer={mainer}
                            onRemove={onRemove}
                            onAdd={onAdd}
                            onCheckout={onCheckout}
                            cartItems={cartItems}
                            setUserId={setUserId}
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
                            userId={userId}
                        />
                    }
                />
                <Route
                    path="/product/:productId"
                    element={
                        <Product
                            mainer={mainer}
                            onAdd={onAdd}
                            userId={userId}
                        />
                    }
                />
            </Routes>
        </Suspense>
    );
}

export default App;
