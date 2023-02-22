import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { getMainer } from "../../Api/Axios";
import "./order.css";

const Order = ({ setUserId, setMainer }) => {
    const [state, setState] = useState({
        brandSelect: "ALL BRAND",
        countSelect: "10-",
        locationSelect: "USA",
        conditionSelect: "NEW",
    });
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            setUserId(userId);
            sessionStorage.setItem("userId", userId);
        } else {
            navigate("/not-found");
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("brand", state.brandSelect);
        bodyFormData.append("location", state.locationSelect);
        bodyFormData.append("moq", state.countSelect);
        bodyFormData.append("condition", state.conditionSelect);
        bodyFormData.append("user_id", userId);
        const data = await getMainer(bodyFormData);
        if (typeof data !== "undefined" && data.length > 0) {
            navigate("/dashboard");
            sessionStorage.setItem("productMainer", JSON.stringify(data));
            setMainer(data);
        } else {
            swal({
                title: "Done!",
                text: "Unfortunately, the product you were looking for was not found. Please wait. Our staff will contact you.",
                icon: "success",
                button: false,
            });
        }
    };

    const onChangeBrand = (e) => {
        setState((prev) => ({ ...prev, brandSelect: e.target.value }));
    };

    const onChangeCount = (e) => {
        setState((prev) => ({ ...prev, countSelect: e.target.value }));
    };

    const onChangeLocation = (e) => {
        setState((prev) => ({ ...prev, locationSelect: e.target.value }));
    };

    const onChangeCondition = (e) => {
        setState((prev) => ({ ...prev, conditionSelect: e.target.value }));
    };

    return (
        <div className="order">
            <div className="order__card">
                <h3>What kind of product do you want?</h3>
                <form onSubmit={onSubmit}>
                    <label htmlFor="brandSelect">
                        What’s type of manufacture brand are you currently
                        looking for?
                    </label>
                    <select
                        name="brandSelect"
                        onChange={onChangeBrand}
                        required
                    >
                        <option value="ALL BRAND">ALL BRAND</option>
                        <option value="BITMAIN">BITMAIN</option>
                        <option value="WHATSMINER">WHATSMINER</option>
                        <option value="CANAAN">CANAAN</option>
                    </select>
                    <label htmlFor="countSelect">
                        What size of order are you looking at?
                    </label>
                    <select
                        name="countSelect"
                        onChange={onChangeCount}
                        required
                    >
                        <option value="10-">
                            10 <span>&#60;</span>
                        </option>
                        <option value="50-">
                            50 <span>&#60;</span>
                        </option>
                        <option value="100-">
                            100 <span>&#60;</span>
                        </option>
                        <option value="100+">
                            100 <span>&#62;</span>
                        </option>
                    </select>
                    <label htmlFor="locationSelect">
                        What location you prefer the units to be located?
                    </label>
                    <select
                        name="locationSelect"
                        onChange={onChangeLocation}
                        required
                    >
                        <option value="USA">USA</option>
                        <option value="CANADA">CANADA</option>
                        <option value="ASIA">ASIA</option>
                        <option value="EUROPA">EUROPA</option>
                        <option value="LATIN AMERICA">LATIN AMERICA</option>
                    </select>
                    <label htmlFor="conditionSelect">
                        In what condition would you prefer the units?
                    </label>
                    <select
                        name="conditionSelect"
                        onChange={onChangeCondition}
                        required
                    >
                        <option value="NEW">NEW</option>
                        <option value="USED">USED</option>
                        <option value="I DON’T MIND">I DON’T MIND</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Order;
