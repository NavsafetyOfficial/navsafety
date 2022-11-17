export function checkSession(pageName) {
  let cookieUser = localStorage.getItem("username");
  if (pageName == "login" || pageName == "register") {
    if (cookieUser) {
      console.log("Existe sessão aberta");
      window.location.href = "/home/";
    } else {
      console.log("Não existe sessão aberta");
    }
  }else{
    if (cookieUser) {
        console.log("Existe sessão aberta");
      } else {
        window.location.href = "/login";
        console.log("Não existe sessão aberta");
      }
  }
}
