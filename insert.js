
//Import fs moduke for reading data
let fs = require('fs');

/* Make Data according to mongodb loc object, make sure in the zero index we place longitude and then latitude */

//read file
fs.readFile('customers.txt', (err, data)=>{
  // console.log(JSON.parse(data))
  let finaldata = [];
  for(let i=0;i<data.length;i++){
    finaldata.push({user_id: data[i].user_id,name: data[i].name, loc: [parseFloat(data[i].longitude),parseFloat(data[i].latitude)]})
  }

  /* Also before inserting, make sure you index the loc field by 2dsphere, if we set the index by model then its good otherwise we can directly set the index by using
  // db.collectionname.createIndex({columnname:"2dsphere"});
  */

  //Now insert the data, here I am directly inserting data, we can copy and past the code in mongodb interface like NoSQLbooster and paste the code
  db.collectionname.insertMany(finaldata)
})
