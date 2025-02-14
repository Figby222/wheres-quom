const storeBearerToken = (bearerToken) => {
    localStorage.setItem("bearerToken", bearerToken);
}

const getBearerToken = () => {
    const token = localStorage.getItem("bearerToken");

    return token;
}
export { storeBearerToken, getBearerToken };