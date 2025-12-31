import { useState } from "react";
import LoginForm from "../components/loginComponents/LoginForm";
import RegistrationForm from "../components/loginComponents/RegistrationForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleSwitch = (toLogin: boolean) => {
    setSlideDirection(toLogin ? "left" : "right");

    setTimeout(() => {
      setIsLogin(toLogin);
      setSlideDirection(null);
    }, 300);
  };

  const getSlideClass = () => {
    if (slideDirection === "right") {
      return "translate-x-full opacity-0";
    } else if (slideDirection === "left") {
      return "-translate-x-full opacity-0";
    }

    return "translate-x-0 opacity-100";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div></div>
      <div></div>

      {/* Form Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-xl overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${getSlideClass()}`}
        >
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => handleSwitch(false)} />
          ) : (
            <RegistrationForm onSwitchToLogin={() => handleSwitch(true)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
