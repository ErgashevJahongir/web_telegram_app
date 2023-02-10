import { motion } from "framer-motion";
import Button from "../Button/Button";
import addIcon from "../../images/icon/add-cart.png";
import deleteIcon from "../../images/icon/delete-cart.png";
import "./Card.css";

function Card({ food, onAdd, onRemove, cartItems }) {
    const { title, Image, price, id } = food;
    const count = cartItems.find((x) => x.id === food.id);

    const handleIncrement = () => {
        onAdd(food);
    };
    const handleDecrement = () => {
        onRemove(food);
    };

    return (
        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{
                once: true,
                amount: 0.8,
            }}
            key={id}
        >
            <motion.div
                variants={{
                    offscreen: {
                        opacity: 0,
                        y: 200,
                    },
                    onscreen: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            bounce: 0.3,
                            duration: 1.5,
                            delay: 0.5 + `${id % 6}` / 10,
                        },
                    },
                }}
            >
                <div className="card" key={id}>
                    <span
                        className={`${
                            count?.quantity
                                ? "card__badge"
                                : "card__badge--hidden"
                        }`}
                    >
                        {count?.quantity}
                    </span>
                    <div className="image__container">
                        <img
                            loading="lazy"
                            decoding="async"
                            width={150}
                            height={150}
                            src={Image}
                            alt={title}
                        />
                        <span className="card__price">{price} $</span>
                    </div>
                    <h4 className="card__title">{title}</h4>
                    <div className="btn-container">
                        <Button
                            title={
                                <img
                                    src={addIcon}
                                    alt="add card icon"
                                    loading="lazy"
                                    decoding="async"
                                    width={24}
                                    height={24}
                                />
                            }
                            type={"add"}
                            onClick={handleIncrement}
                        />
                        {count?.quantity ? (
                            <Button
                                title={
                                    <img
                                        src={deleteIcon}
                                        alt="add card icon"
                                        loading="lazy"
                                        decoding="async"
                                        width={24}
                                        height={24}
                                    />
                                }
                                type={"remove"}
                                onClick={handleDecrement}
                            />
                        ) : null}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Card;
