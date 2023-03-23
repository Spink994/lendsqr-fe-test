import { Button } from "../../components";
import Logo from "../../assets/svg/lendsqr_logo.svg";
import LoginSideImage from "../../assets/svg/login_side-image.svg";
import { Link, useNavigate } from "react-router-dom";
import fields from "./formData";
import { useState } from "react";
import routes from "../../routes/routes.const";

export default function Login() {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(routes.users);
  }

  return (
    <div className="login_wrapper">
      <img className="logo" src={Logo} alt="lendsqr_logo" />
      <div className="login_container">
        <div className="left_login-section">
          <img
            className="login_image"
            src={LoginSideImage}
            alt="lendsqr_logo"
          />
        </div>
        <div className="right_login-section">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <div>
            <form onSubmit={handleLogin} className="form_container">
              <input
                className="input_variant_1"
                // required={fields.email.required}
                type={fields.email.type}
                name={fields.email.name}
                placeholder={fields.email.placeholder}
                pattern={fields.email.pattern}
                title={fields.email.title}
              />
              <input
                className="input_variant_1"
                // required={fields.password.required}
                type={!isHidden ? fields.password.type : "text"}
                name={fields.password.name}
                placeholder={fields.password.placeholder}
                pattern={fields.password.pattern}
                title={fields.password.title}
              />

              <Link className="link" to="/">
                Forgot Password?
              </Link>

              <span
                onClick={() => setIsHidden(!isHidden)}
                className="reveal_password"
              >
                {!isHidden ? "SHOW" : "HIDE"}
              </span>

              <Button type="submit" classes="btn_variant_1" label="LOG IN" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
