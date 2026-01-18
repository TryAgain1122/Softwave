import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

const SubmitButton = ({ text, onClick, loading }: SubmitButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center space-x-2 group
          ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:from-purple-600 hover:shadow-xl'}`}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Signing In...</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  )
}

export default SubmitButton