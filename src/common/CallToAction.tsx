import Spinner from "./Spinner";

type Props = {
  children: React.ReactNode;
  action: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const CallToAction = ({ children, action, disabled, loading = false }: Props) => {
  return (
    <button
      onClick={action}
      disabled={disabled}
      className="w-full bg-lime-600 font-bold text-lg hover:bg-lime-500 transition-colors disabled:bg-zinc-400"
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default CallToAction;
