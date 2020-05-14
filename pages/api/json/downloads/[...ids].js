import axios from 'axios';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

module.exports = async (req, res) => {
  await cors(req, res);

  return new Promise((resolve, reject) => {
    // get stream deck catalog
    axios.get('https://appstore.elgato.com/streamDeckPlugin/catalog.json')
      .then(async (extres) => {

        // loop through all entries
        let totalDownloads = 0;
        let output = {plugins: {}};
        extres.data.plugins.forEach(e => (
          req.query.ids.forEach((id) => {
            if (e.identifier == id) {
              output.plugins[id] = e.downloads;
              totalDownloads += e.downloads;
            }
          })
        ))

        output.totalDownloads = totalDownloads;

        // server side cache
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=3600')

        // send response
        res.status(200).json(output);

        resolve();

      })
      .catch(function (error) {
        // catch app store fetching errors
        console.error(error);

        res.status(500).end("internal server error whilst retrieving downloads")

        reject();
      });
  })
}