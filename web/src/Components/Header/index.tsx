import MenuHeader from "./MenuHeader";

export default function Header() {
  return (
    <header className="w-full h-12 md:h-16 flex flex-col justify-center bg-principal">
      <div className="w-[98%] flex items-end justify-end">
        <MenuHeader />
      </div>
    </header>
  );
}
