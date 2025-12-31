import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
    text: string;
    onClick: () => void;

}

const SubmitButton = ({ text, onClick}:SubmitButtonProps) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
    >
        <span>{text}</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
    </button>
  )
}

export default SubmitButton