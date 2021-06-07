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
const server = require('./src/app.js');
const { conn, Breed, Temperament } = require('./src/db.js');
const axios = require('axios');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  let breeds, searchId;

  breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
  console.log(breeds.data[0]);

  searchId = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${breeds.data[0].name}`);
  console.log(searchId.data[0]);

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

/* 
const t1 = await Temperament.create({ name: "Stubborn" });
  const t2 = await Temperament.create({ name: "Curious" });
  const t3 = await Temperament.create({ name: "Playful" });
  const t4 = await Temperament.create({ name: "Adventurous" });
  const t5 = await Temperament.create({ name: "Active" });

  const breed1 = await Breed.create({
    name: "Affenpinscher",
    height: "23 - 29",
    weight:"3 - 6",
    life_span: "10 - 12 years",
  });

  const breed2 = await Breed.create({
    name: "Afghan Hound",
    height: "23 - 29",
    weight: "3 - 6",
    life_span: "10 - 12 years",
  });

  await breed1.addTemperament([t1,t2,t3]);
  await breed2.addTemperament([t4,t5]);

  let busquedaAll = await Breed.findAll({
    include: {model: Temperament}
  });

  // await console.log(JSON.stringify(busquedaAll, null, 2));
*/