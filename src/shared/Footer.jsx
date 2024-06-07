import { FaGithub, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-base-300">
      <footer className="container mx-auto footer p-10 text-base-content">
        <aside>
          <Link to={"/"}>
            <p className="text-5xl font-bold">
              Fit<span className=" text-clr-main">Quest</span>
            </p>
          </Link>
          <p>Your guide for a Healthy life</p>
          <div className="flex gap-6 my-6 text-3xl ">
            <a href="#">
              <FaSquareFacebook />
            </a>
            <a href="#">
              <FaGithub />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Blogs</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <hr className="border-t border-[#13131374] my-2" />
      <footer className="footer footer-center font-medium">
        <aside>
          <p className="p-3">
            Copyright © 2024 - All rights reserved by FitQuest
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
