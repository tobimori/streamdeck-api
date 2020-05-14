import axios from 'axios';

module.exports = (req, res) => {
  axios.get('https://appstore.elgato.com/streamDeckPlugin/catalog.json')
    .then(async (response) => {
      let downloads = "error whilst retrieving data";
      for (let e of response.data.plugins) {
        if (e.identifier === req.query.ids) {
          downloads = `${e.downloads}`;
          break;
        }
      };
      res.status(200).json({
        "schemaVersion": 1,
        "label": "downloads",
        "message": downloads,
        "color": downloads === "error whilst retrieving data" && "critical" || "blue",
        "style": "flat",
        "isError": downloads === "error whilst retrieving data",
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}