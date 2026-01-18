import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Divider from "./Divider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string;
  gender?: string;
  mobileNumber?: string;
  // emailAddress?: string;
  confirmedPassword?: string;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`
          ${import.meta.env.VITE_API_URL}/auth/login
        `, {
          email: formData.email,
          password: formData.password
        });

        const { token, user } = response.data;
        console.log("Logged in user", user);

        localStorage.setItem("token", token);

        navigate("/socmed");
    } catch (error) {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
    // console.log("Login Submitred", formData);
    // alert("Login submitted! Check console for details.");
  };
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4">
          <Lock size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to continue to your account</p>
      </div>

      <div className="space-y-4">
        <InputField
          id="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          icon={<Mail size={20} />}
        />

        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          icon={<Lock size={20} />}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
        </div>

        <SubmitButton text="Sign In" onClick={handleSubmit} loading={isLoading} />

        <Divider />

        <div className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            type="button"
            className="text-purple-500 hover:text-purple-600 font-semibold transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
