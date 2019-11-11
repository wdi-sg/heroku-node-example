var React = require('react');

class Banana extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>wowwww Hello create a product</h1>
            <form action="/save" method="POST">
                <input name="name" />
                <input type="submit" />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Banana;