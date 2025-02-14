const storeBearerToken = (bearerToken) => {
    localStorage.setItem("bearerToken", bearerToken);
}
export { storeBearerToken };