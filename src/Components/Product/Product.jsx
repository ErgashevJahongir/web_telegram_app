import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";
import "./product.css";

const Product = ({ mainer, onAdd }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const productArray = mainer.filter((item) => item.id == productId);
    const product = productArray[0];
    const tgaccount = product.for_more_info.split(" ");
    return (
        <div>
            <div className="backButton__div">
                <button type="button" onClick={() => navigate("/")}>
                    <span>&larr;</span> Back
                </button>
            </div>
            <div className="product__card">
                <div className="image__container">
                    <img
                        loading="lazy"
                        decoding="async"
                        width={150}
                        height={150}
                        src={product.photo1}
                        alt={product.title}
                    />
                    <span className="card__price">{product.price} $</span>
                </div>
                <div className="product__card-content">
                    <h4 className="card__title">{product.title}</h4>
                    <div className="product__info">
                        <div className="product__info-item">
                            <div className="">
                                <h4>Price: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.price} $</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Name: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.title}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Model: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.model1}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Brand: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.brand}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Condition: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.condition}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>MOQ: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.moq}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>uantity available: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.moq}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Location: </h4>
                            </div>{" "}
                            <div>
                                <p>{product.location}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>Date: </h4>
                            </div>{" "}
                            <div>
                                <p>{moment(product.date).format("LL")}</p>
                            </div>
                        </div>
                        <div className="product__info-item">
                            <div className="">
                                <h4>More info: </h4>
                            </div>{" "}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {tgaccount.map((item) => {
                                    return (
                                        <a
                                            href={`https://t.me/${item.slice(
                                                1
                                            )}`}
                                            style={{ margin: "3px 0" }}
                                            key={item}
                                        >
                                            {item}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ marginTop: 25 }}>
                            <Button
                                title={"Add to cart"}
                                type={"add"}
                                onClick={() => onAdd(mainer)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;