var React = require('react');

class Root extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <img src={this.props.name}/>
            <h1>root</h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Root;