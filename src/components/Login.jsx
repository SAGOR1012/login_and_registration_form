import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "./firebase.config";
import { useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5"; // eye icon open
import { LuEyeOff } from "react-icons/lu"; // eys icon close
import { Link } from "react-router-dom";

const Login = () => {
  /* Error state */
  const [loginError, setLoginError] = useState("");
  /* Success login state */
  const [loginSuccess, setLoginSuccess] = useState("");
  /* show or hide password state */
  const [showPassword, setShowPassword] = useState(false);

  /* forget password validation er jonne useRef use kora hoyche */
  const emailRef = useRef(null);

  /* Form submit function */
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    /* clear error message */
    setLoginError("");
    /* clear login message */
    setLoginError("");

    //TODO : add user validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        /*  email verify kora ache ki na seita check korar condition */
        if (result.user.emailVerified) {
          setLoginSuccess("Login success");
        } else {
          alert("please verify your email address");
        }
      })
      .catch((error) => {
        setLoginError(error.message);
        console.log(error);
      });
  };
  /* Forget password function */
  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide an email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("input a valid email address");
      return;
    }

    /* send verify link to email */
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email for validation link");
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("send reset password", email);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  ref={emailRef} // current email konta che seita findout korar jonne
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[180px]  left-[322px]">
                  {showPassword ? <LuEyeOff /> : <IoEyeSharp />}
                </span>
                <label onClick={handleForgetPassword} className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              {loginError && <p className="text-red-600">{loginError}</p>}
              {loginSuccess && <p className="text-green-300">{loginSuccess}</p>}
              <p>
                New to this website ? plese{" "}
                <Link to="/heroRegister" className="text-secondary">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
