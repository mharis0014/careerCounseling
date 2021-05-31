export const Auth = async (token) => {
  try {
    const response = await fetch("http://localhost:3001/auth", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();
    //console.log('I am Server response : '+resp )
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
  //console.log('i am being called')
  if (localStorage.getItem("citem") === null) {
    return false;
  } else {
    const unparsedData = localStorage.getItem("citem");
    const parsedData = JSON.parse(unparsedData);
    const token = parsedData.token;
    const ans = await Auth(token);
    // console.log('I am Auth Function Response : ' +ans)
    if (ans) {
      return true;
    } else {
      return false;
    }
  }
};
