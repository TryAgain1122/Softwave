import { Lock, Mail, User, Phone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";

import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Divider from "./Divider";
import SocialButton from "./SocialButton";
import axios from 'axios';

interface RegistrationFormProps {
  onSwitchToLogin?: () => void;
}

interface FormData {
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  emailAddress: string;
  confirmPassword: string;
}

const RegistrationForm = ({onSwitchToLogin}:RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async () => {

    if (formData.firstName === '' || formData.lastName === '' || formData.dateOfBirth === '' || formData.gender === '' || formData.mobileNumber === '' || formData.emailAddress === '' || formData.password || formData.confirmPassword === '') {
      alert('Please fill all fields');
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          mobileNumber: formData.mobileNumber,
          email: formData.emailAddress,
          password: formData.password
        }
      )
      console.log("Sucess: ",response.data);
      alert("Registration successful!");
    } catch (error) {
      console.log("Registration Failed")
    }

    
    console.log("Registration Submitted:", formData);
  };

  return (
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-md">
          <User size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Create Account
        </h2>
        <p className="text-gray-600">Sign up to get started</p>
      </div>

      {/* INPUT FIELDS */}
      <div className="space-y-4 max-h-[500px] custom-scrollbar overflow-y-auto p-1">
        <div className="grid grid-cols-1 gap-5">
          <InputField
            id="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(value) => setFormData({ ...formData, firstName: value })}
            icon={<User size={20} />}
          />

          <InputField
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(value) => setFormData({ ...formData, lastName: value })}
            icon={<User size={20} />}
          />

          <InputField
            id="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(value) =>
              setFormData({ ...formData, dateOfBirth: value })
            }
            icon={<User size={20} />}
          />

          {/* Gender Select */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <User size={20} />
            </div>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="
                w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-purple-500
                text-gray-800 transition-all
              "
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <InputField
            id="mobileNumber"
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={(value) =>
              setFormData({ ...formData, mobileNumber: value })
            }
            icon={<Phone size={20} />}
          />

          <InputField
            id="emailAddress"
            type="email"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={(value) =>
              setFormData({ ...formData, emailAddress: value })
            }
            icon={<Mail size={20} />}
          />

          <InputField
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(value) =>
              setFormData({ ...formData, password: value })
            }
            icon={<Lock size={20} />}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          />

          <InputField
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            icon={<Lock size={20} />}
            showPasswordToggle
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            showPassword={showConfirmPassword}
          />
        </div>

        {/* TERMS CHECKBOX */}
        <label className="flex items-start space-x-2 text-sm mt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500 mt-0.5"
          />
          <span className="text-gray-600 leading-5">
            I agree to the{" "}
            <button
              type="button"
              className="text-purple-500 hover:text-purple-600 font-medium"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="text-purple-500 hover:text-purple-600 font-medium"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        {/* BUTTON */}
        <SubmitButton text="Create Account" onClick={handleSubmit} />

        {/* DIVIDER */}
        <Divider />

        {/* SOCIAL AUTH */}
        <div className="flex space-x-3">
          <SocialButton icon={<FcGoogle size={30} />} text="Google" />
          <SocialButton
            icon={<FaFacebookSquare size={30} className="text-blue-700" />}
            text="Facebook"
          />
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-purple-500 hover:text-purple-600 font-semibold transition-colors"
          >Sign in</button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
