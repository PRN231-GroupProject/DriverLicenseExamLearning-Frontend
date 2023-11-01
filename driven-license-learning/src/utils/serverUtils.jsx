

export const getErrorMessageFromServer = (error) => {
  const errorMessage = error.response
    ? error.response.status
    : "Oops, something went wrong. Try later!";
  return errorMessage;
};

export const getTokenDataFromLocalStorage = () => {
  let tokenData;
  if(typeof localStorage !== 'undefined'){
    tokenData = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
  }else{
    return null;
  }
  console.log(tokenData)
  return tokenData;
};

export const convertTokenToObject = () => {
  const token = getTokenDataFromLocalStorage();
  if (!token) return null;
  const object = JSON.parse(atob(token.split('.')[1]))
  return object;
};

export const convertPriceToString = (price) => {
  if (price === undefined) return "";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const convertMsToDate = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString("en-US");
};
