import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className="flex justify-center space-x-3 text-gray-600 md:justify-start md:space-x-6 md:order-2">
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="text-2xl transition duration-300 hover:text-teal-500"
      >
        <FaInstagram />
      </a>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className="text-2xl transition duration-300 hover:text-teal-500"
      >
        <FaFacebook />
      </a>
    </div>
  );
}
