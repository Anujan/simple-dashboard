const generateFakeObject = function() {
  let ret = [];
  for (let i = 0; i < 10; i++) {
    let today = new Date();
    let date = today.setDate(today.getDate() - i);
    ret.push({
      date,
      count: Math.floor(Math.random() * (300 - 10 + 1)) + 10
    });
  }

  return ret;
};


export default function(req) {
  return new Promise((resolve) => {
    const db = req.db;
    const collection = db.get('campaigncollection');
    collection.find({}, {}, (e, docs) => {
      resolve(docs);
    });
  });
}
