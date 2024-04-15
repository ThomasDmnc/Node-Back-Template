require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

if( require.main === module ){
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}