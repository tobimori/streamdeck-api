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
    console.info(`Received /api/shields/downloads/${req.query.ids.join('/')}`);
    // get stream deck catalog
    axios.get('https://appstore.elgato.com/streamDeckPlugin/catalog.json')
      .then(async (extres) => {

        // loop through all entries
        let downloads = 0;
        extres.data.plugins.forEach(e => (
          req.query.ids.forEach((id) => {
            if (e.identifier == id) downloads += e.downloads
          })
        ))

        // pretty print with regex lookbehinds
        downloads = downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // server side cache
        res.setHeader('Cache-Control', 'max-age=0, s-maxage=3600')

        // send response
        res.status(downloads === "0" && 500 || 200).json({
          "schemaVersion": 1,
          "label": "downloads",
          "message": downloads === "0" && "error whilst retrieving downloads" || downloads,
          "color": downloads === "0" && "critical" || "blue",
          "style": "flat",
          "isError": downloads === "0",
        })

        resolve();

      })
      .catch(function (error) {
        // catch app store fetching errors
        console.error(error);

        res.status(500).json({
          "schemaVersion": 1,
          "label": "downloads",
          "message": "internal server error whilst retrieving downloads",
          "color": "critical",
          "style": "flat",
          "isError": true,
        })

        reject();
      });
  })
}