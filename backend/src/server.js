const express = require("express");
//const cors = require("cors");
//const clientsRoutes = require("./clients.routes");
//const { response } = require("express");
const app = express();

app.use(express.json());
//app.use(cors());
//app.use(clientsRoutes);

//function teste(request, response) {
  //return response.json("oi");
//}
//app.get("/fffff", teste);

app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));