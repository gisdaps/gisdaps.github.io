import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setInner, getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp() {
  let target_url =
    "https://asia-southeast2-fahad-402509.cloudfunctions.net/gcfproyekdp";
  let tokenkey = "token";
  let tokenvalue =
    "75127f0784fe57e03700c6a1ba46bcf304d912e77f87cc559835503e603a4347";
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
    window.location.href = "swagger.html"; // Gantilah "error.html" dengan halaman error yang sesuai.
  } else if (result.message === "Password Salah") {
    // Jika pesan kesalahan adalah "Password salah", arahkan ke halaman error.
    window.location.href = "404.html";
  } else {
    // Penanganan lainnya (pesan kesalahan lainnya)
    window.location.href = "index.html";
  }
}
