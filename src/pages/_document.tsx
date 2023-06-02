import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <meta name="author" content="Aziz" />
        </Head>
        <body className="d-flex flex-column h-100">
          <nav className="navbar navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="#">
                SuperChat link generator
              </a>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="https://github.com/azizoid/superchat-frontend-challenge"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Fork it on Github
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
