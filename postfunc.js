import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp() {
  let target_url =
    "https://asia-southeast2-fahad-402509.cloudfunctions.net/gis5logindaps";
  let tokenkey = "token";
  let tokenvalue =
    "667b744d1548f57e9da7c8247ae5d3e41abd1ce983cb2aab329f3789d9e0f307";
  let datainjson = {
    username: getValue("username"),
    password: getValue("password"),
  }

  postWithToken(target_url, tokenkey, tokenvalue, datainjson, responseData);
}
function responseData(result) {
  setInner("pesan", result.message);
  setCookieWithExpireHour("token", result.token, 2);

  if (result.message === "Selamat Datang") {
    // Jika pesan adalah "Selamat Datang", arahkan ke halaman dashboard.
    window.location.href = "index.html"; 
    // Gantilah "error.html" dengan halaman error yang sesuai.
  } else if (result.message === "Password Salah") {
    // Jika pesan kesalahan adalah "Password salah", arahkan ke halaman error.
    window.location.href = "login.html";
  } else {
    // Penanganan lainnya (pesan kesalahan lainnya)
    window.location.href = "login.html";
  }
}
