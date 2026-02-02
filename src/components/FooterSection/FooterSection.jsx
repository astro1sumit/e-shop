import {
  FaFacebookF,
  FaInstagram,
  FaSnapchat,
  FaXTwitter,
  FaRupeeSign,
  FaArrowRotateLeft,
} from "react-icons/fa6";

const FooterSection = () => {
  return (
    <footer className="bg-[#f2f2f2] text-gray-700 pt-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* NEED HELP */}
        <div>
          <h3 className="text-red-600 font-bold mb-4 tracking-wide">
            NEED HELP
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-red-600">Contact Us</li>
            <li className="cursor-pointer hover:text-red-600">Track Order</li>
            <li className="cursor-pointer hover:text-red-600">Returns & Refunds</li>
            <li className="cursor-pointer hover:text-red-600">FAQs</li>
            <li className="cursor-pointer hover:text-red-600">My Account</li>
          </ul>


          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
              <FaRupeeSign /> COD Available
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-600">
              <FaArrowRotateLeft /> 30 Days Easy Returns & Exchanges
            </div>
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-red-600 font-bold mb-4 tracking-wide">
            COMPANY
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-red-600">About Us</li>
            <li className="cursor-pointer hover:text-red-600">Investor Relation</li>
            <li className="cursor-pointer hover:text-red-600">Careers</li>
            <li className="cursor-pointer hover:text-red-600">Gift Vouchers</li>
            <li className="cursor-pointer hover:text-red-600">Community Initiatives</li>
          </ul>
        </div>

        {/* MORE INFO */}
        <div>
          <h3 className="text-red-600 font-bold mb-4 tracking-wide">
            MORE INFO
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-red-600">T&amp;C</li>
            <li className="cursor-pointer hover:text-red-600">Privacy Policy</li>
            <li className="cursor-pointer hover:text-red-600">Sitemap</li>
            <li className="cursor-pointer hover:text-red-600">Get Notified</li>
            <li className="cursor-pointer hover:text-red-600">Blogs</li>
          </ul>
        </div>

        {/* STORE NEAR ME */}
        <div>
          <h3 className="text-red-600 font-bold mb-4 tracking-wide">
            STORE NEAR ME
          </h3>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-red-600">Mumbai</li>
            <li className="cursor-pointer hover:text-red-600">Pune</li>
            <li className="cursor-pointer hover:text-red-600">Bangalore</li>
            <li className="cursor-pointer hover:text-red-600">Hubballi</li>
            <li className="text-blue-600 font-semibold cursor-pointer">
              View More
            </li>
          </ul>
        </div>
      </div>

      {/* App Section */}
      <div className="text-center mt-12">
        <p className="font-semibold tracking-wide mb-4">
          📱 EXPERIENCE THE SOULED STORE APP
        </p>
        <div className="flex justify-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-12 cursor-pointer"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-12 cursor-pointer"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="flex justify-end items-center gap-3 max-w-7xl mx-auto px-6 mt-10">
        <span className="mr-2">Follow Us:</span>
        <SocialIcon ><FaFacebookF /></SocialIcon>
        <SocialIcon><FaInstagram /></SocialIcon>
        <SocialIcon><FaSnapchat /></SocialIcon>
        <SocialIcon><FaXTwitter /></SocialIcon>
      </div>

      {/* Bottom Strip */}
      <div className="border-t mt-10 py-4 text-center text-sm">
        100% Secure Payment · Shipping Partners · © 2026 YourStore
      </div>
    </footer>
  );
};

const SocialIcon = ({ children }) => (
  <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition">
    {children}
  </div>
);

export default FooterSection;
