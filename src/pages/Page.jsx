import PropTypes from "prop-types";
import "./page.css";

// base page structure
const Page = ({ children }) => <main id="content">{children}</main>;

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
