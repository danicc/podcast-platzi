import 'isomorphic-fetch'
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';
import PodcastListWithClick from '../components/PodcastListWithClick';
import PodcastPlayer from '../components/PodcastPlayer';
import Layout from '../components/Layout';

export default class Channel extends React.Component {
  state = {
    openPodcast: ''
  }

  static async getInitialProps({ query, res }) {
    const channelId = query.id;

    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${channelId}`),
        fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`)
      ]);

      if (reqChannel.status >= 404) {
        res.statusCode = reqChannel.status;
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status };
      }

      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel

      let dataAudios = await reqAudios.json()
      let audioClips = dataAudios.body.audio_clips

      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels

      return { channel, audioClips, series, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503;
      return { channel: null, audioClips: null, series: null, statusCode: 503 };
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault();
    this.setState({
      openPodcast: podcast
    });
  }

  closePodcastModal = () => {
    this.setState({
      openPodcast: ''
    })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props;
    const { openPodcast } = this.state;

    if (statusCode !== 200) {
      return (<Error statusCode={statusCode} />)
    }
    return (
      <Layout title={channel.title}>

        { 
          openPodcast && 
          <PodcastPlayer clip={openPodcast} onClose={this.closePodcastModal} /> 
        }

        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

        <h1>{channel.title}</h1>

        {series.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </div>
        }

        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick podcasts={audioClips} onClickPodcast={this.openPodcast} />
        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 15px;
            font-size: 1.2em;
            font-weight: 600;
            margin: 0;
          }
        `}</style>
      </Layout>
    )
  }
}