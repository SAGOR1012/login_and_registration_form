import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "./firebase.config";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5"; // eye icon open
import { LuEyeOff } from "react-icons/lu"; // eys icon close
import { Link } from "react-router-dom";

const HeroRegister = () => {
  /* error state */
  const [registerError, setRegisterError] = useState("");
  /* success state */
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  /* show or hide password state */
  const [showPassword, setShowPassword] = useState(false);

  /* Form submit function */
  const handleRegister = (e) => {
    e.preventDefault(); //* submit korle jate page reload na mare
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const conditionAccepted =
      e.target.terms
        .checked; /* check box jodi accepted korche ki na seita check korar jonne */
    console.log(name, email, password, conditionAccepted);

    /* reset error */
    setRegisterError(""); // jodi error solve hoye jay tahole error likha gula remove hoye jabe
    setRegistrationSuccess(""); // jodi registration successfully hoye jay tahole error likha gula remove hoye jabe

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("you have should at least one upper cas latter");
      return;
    } else if (!conditionAccepted) {
      setRegisterError("please accepted our terms and condition !");
      return;
    }

    //TODO: create user
    createUserWithEmailAndPassword(auth, email, password) // its a porims so '.then' thakbe ee
      .then((result) => {
        const user = result.user;
        console.log(user);
        setRegistrationSuccess("Create account successfully");

        /* update user profile */
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        }).then(() => {
          console.log("profile updated");
        });

        /* Send verification email */
        sendEmailVerification(result.user).then(() => {
          alert("please check your email");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };

  //*...........................................

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Registration now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="your name"
                name="name" // Add name attribute
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email" // Add name attribute
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
                name="password" // Add name attribute
                className="input input-bordered"
                required
              />
              <br />
              <span
                className="absolute top-[260px]  left-[322px]"
                onClick={() => setShowPassword(!showPassword)}>
                {/* jodi show pass thake tahole close eye dekhabe r jodi na hoy tahole open eye dekhabe */}
                {showPassword ? <LuEyeOff /> : <IoEyeSharp />}
              </span>
              <br />
              <div>
                <input type="checkbox" name="terms" id="terms_condition" />
                <label className="ml-2">
                  Accept our <a href="">Terms and conditions</a>
                </label>
              </div>

              {/*   <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control ">
              <input
                className="btn btn-primary"
                type="submit"
                value="Registration"
              />
            </div>
            {registerError && <p className="text-red-600">{registerError}</p>}
            {registrationSuccess && (
              <p className="text-green-300 ">{registrationSuccess}</p>
            )}
            <p>
              Already have an account ? please{" "}
              <Link to="/login" className="text-secondary">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
