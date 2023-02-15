export const getMainer = async () => {
    const res = await fetch(`http://159.203.88.113/api/v1/productlist/`, {
        method: "get",
    });
    const data = res.json();
    return data;
};

export const getPostProduct = async () => {
    const res = await fetch(`http://159.203.88.113/api/v1/createorder/`, {
        method: "post",
    });
    const data = res.json();
    return data;
};
