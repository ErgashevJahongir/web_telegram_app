import { motion } from "framer-motion";
import Button from "../Button/Button";
import addIcon from "../../images/icon/add-cart.png";
import deleteIcon from "../../images/icon/delete-cart.png";
import "./Card.css";
import { useState } from "react";

function Card({ food, onAdd, onRemove, cartItems }) {
    const [state, setState] = useState(false);
    const { title, Image, price, id } = food;
    const count = cartItems.find((x) => x.id === food.id);

    const handleIncrement = () => {
        onAdd(food);
    };
    const handleDecrement = () => {
        onRemove(food);
    };

    const onClick = () => {
        setState(true);
        setTimeout(() => {
            setState(false);
        }, 2000);
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
                        y: 100,
                    },
                    onscreen: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            bounce: 0.3,
                            duration: 1.5,
                            delay: 0.5 + `${id % 7}` / 10,
                        },
                    },
                }}
            >
                <div
                    onClick={onClick}
                    id={state ? "card rotete" : "card"}
                    className="card"
                    key={id}
                >
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
                        <motion.div
                            whileHover={{ scale: 1.3, rotate: -20 }}
                            whileTap={{ scale: 1.3, rotate: -20 }}
                        >
                            <img
                                loading="lazy"
                                decoding="async"
                                width={150}
                                height={150}
                                src={Image}
                                alt={title}
                            />
                        </motion.div>
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
