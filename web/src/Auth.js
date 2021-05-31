export const Auth = async (token) => {
  try {
    const response = await fetch("http://localhost:3001/auth", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    if (resp === true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const checkAuthStatus = async () => {
  if (localStorage.getItem("item") === null) {
    return false;
  } else {
    const unparsedData = localStorage.getItem("item");
    const parsedData = JSON.parse(unparsedData);
    const token = parsedData.token;
    const ans = await Auth(token);
    if (ans) {
      return true;
    } else {
      return false;
    }
  }
};
