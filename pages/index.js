import 'isomorphic-fetch';
import React from 'react';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';

export default class Home extends React.Component {
    static async getInitialProps({ res }) {
        try {
            let request = await fetch('https://api.audioboom.com/channels/recommended')
            const { body: channels } = await request.json();
            return { channels, statusCode: 200 };
        } catch (err) {
            res.statusCode = 503;
            return { channels: null, statusCode: 503 };
        }
    }

    render() {
        const { channels, statusCode } = this.props;
        if (statusCode !== 200) {
            return (
                <Error statusCode={statusCode} />)
        }

        return (
            <Layout title="Podcasts">
                <ChannelGrid channels={channels} />
            </Layout>
        );
    }
}