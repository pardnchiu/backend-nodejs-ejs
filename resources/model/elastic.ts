// (function () {
//   let elasticsearch = require("elasticsearch");
//   let config = require(`${__dirname}/../config/elasticsearch.json`);

//   let client = new elasticsearch.Client({
//     host: `${config.host}:${config.port}`,
//     log: "error"
//   });

//   client.ping({
//     requestTimeout: 30000
//   }, (err: Error) => {
//     if (err) throw err.message;
//   });

//   exports.insert = (index: any, type: any, data: any) => {
//     let body: any = [];

//     data.forEach((item: any) => {
//       body.push({
//         index: {
//           _index: index,
//           _type: type,
//           _id: item.id
//         }
//       });
//       body.push(item);
//     });

//     client.bulk({
//       body: body
//     }).then((r: any) => {
//       let count = 0;
//       r.items.forEach((item: any) => {
//         if (item.index && item.index.error) console.log(++count, item.index.error);
//       });
//     }).catch((err: Error) => {
//       if (err) throw err.message;
//     });
//   };

//   exports.search = (index: any, body: any) => {
//     return client.search({
//       index: index,
//       body: body
//     });
//   };

//   exports.update = (index: any, id: any, body: any) => {
//     return client.update({
//       index: index,
//       type: '_doc',
//       id: id,
//       body: {
//         doc: body
//       }
//     });
//   };
// }());