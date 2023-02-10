import Card from "./Card/Card";
import Cart from "./Cart/Cart";

const Dashboard = ({ cartItems, onCheckout, onAdd, onRemove, foods }) => {
    return (
        <div>
            <h1 className="heading">ASICXchange Store</h1>
            <Cart cartItems={cartItems} onCheckout={onCheckout} />
            <div className="cards__container">
                {foods.map((food) => {
                    return (
                        <Card
                            food={food}
                            cartItems={cartItems}
                            key={food.id}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
