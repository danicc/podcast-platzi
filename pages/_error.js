import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props.statusCode;
    return (
      <Layout title='Ups there is an errror'>
        {
          statusCode === 400 ?
            <div className="message">
              <h1>Esta página no existe</h1>
              <p>
                <Link href='/'><a>Volver a inicio</a></Link>
              </p>
            </div>
            :
            <div className="message">
              <h1>Hubo un error</h1>
              <p>Vuelva a intentarlo en unos segundos</p>
            </div>
        }
        <style jsx>{`
          .message {
            text-align: center;
            padding: 100px 30px;
          }
          h1 {
            margin-bottom: 2em;
          }
          a {
            color: #8756ca;
          }
        `}</style>
      </Layout>
    )
  }
}