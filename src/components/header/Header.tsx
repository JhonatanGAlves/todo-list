import logoRocket from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="bg-gray-700 w-full h-[12.55rem] flex justify-center items-center">
      <img src={logoRocket} alt="A rocket logo in the page header" />
    </header>
  );
}
