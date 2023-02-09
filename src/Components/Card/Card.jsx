import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import "./Card.css";

function Card({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0);
    const { title, Image, price, id } = food;
    const cardVariants = {
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
                duration: 2,
                delay: 0.5,
            },
        },
    };

    const handleIncrement = () => {
        setCount(count + 1);
        onAdd(food);
    };
    const handleDecrement = () => {
        setCount(count - 1);
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
        >
            <motion.div variants={cardVariants}>
                <div className="card" key={id}>
                    <span
                        className={`${
                            count !== 0 ? "card__badge" : "card__badge--hidden"
                        }`}
                    >
                        {count}
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
                    </div>
                    <h4 className="card__title">
                        {title} . <span className="card__price">$ {price}</span>
                    </h4>

                    <div className="btn-container">
                        <Button
                            title={"+"}
                            type={"add"}
                            onClick={handleIncrement}
                        />
                        {count !== 0 ? (
                            <Button
                                title={"-"}
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
