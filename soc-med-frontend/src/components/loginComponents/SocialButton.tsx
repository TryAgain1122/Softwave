
interface SocialButtonProps {
    icon: string | React.ReactNode
    text: string;

}
const SocialButton = ({icon, text}:SocialButtonProps) => {
  return (
    <button
        type="button"
        className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
    >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{text}</span>
    </button>
  )
}

export default SocialButton