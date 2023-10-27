//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config()
const server = require('./src/app.js')
const { conn } = require('./src/database/db.js')

const PORT = process.env.PORT || 3001

// Syncing all the models at once.
const main = async () => {
  try {
    await conn.authenticate()
    console.log('db postgresql connected')
    conn
      .sync({ force: false })
      .then(() => {
        server.listen(PORT, () => {
          console.log('Server listening at PORT', PORT)
        })
      })
      .catch((err) => console.log(err))
  } catch (error) {
    console.error(
      'Unable to connect to the database postgresql:',
      error
    )
  }
}

main()
