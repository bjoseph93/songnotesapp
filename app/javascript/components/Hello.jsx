var React = require("react")
var PropTypes = require("prop-types")

class Hello extends React.Component {
    render() {
        return (<h1>hey</h1>);
    }
}

Hello.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
};
module.exports = Hello