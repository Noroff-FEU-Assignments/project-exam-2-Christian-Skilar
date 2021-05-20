import PropTypes from "prop-types";

function Heading(props) {
  return (
      <h1>{props.heading}</h1>
  )
}

Heading.propTypes = {
	props: PropTypes.string,
};

export default Heading