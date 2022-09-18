import classes from "./Footer.module.css";
const Footer = () => {
  const d = new Date();

  return (
    <footer className={`${classes.footer} p-3 text-center  `}>
      Created by MSOBKYY ❤ © {d.getFullYear()} Copyright
    </footer>
  );
};

export default Footer;
