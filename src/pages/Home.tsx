import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="font-bold">Req'd</h1>
      <nav className="flex flex-col gap-3 text-xl">
        <Wrapper>
          <Link to={"areas"}>
            <div className="">Areas</div>
          </Link>
        </Wrapper>
        <Wrapper>
          <Link to={"products"}>
            <div className="">Products</div>
          </Link>
        </Wrapper>
        <Wrapper>
          <Link to={"vendors"}>
            <div className="">Vendors</div>
          </Link>
        </Wrapper>
        <Wrapper>
          <Link to={"orders"}>
            <div className="">Orders</div>
          </Link>
        </Wrapper>
      </nav>
    </div>
  );
};

export default Home;

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="block p-1 px-2 border-[1px] border-indigo-600 rounded-md shadow-md shadow-black bg-zinc-900">
      {children}
    </div>
  );
}
