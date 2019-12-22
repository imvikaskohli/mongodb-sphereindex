let loc = [ -6.257664, 53.339428]
let maxDistance = 100*1000 //maxDistance in metres

db.customers.aggregate([
    {
      "$geoNear": {
        near: { type: "Point", coordinates: [loc[0], loc[1]] },
        key: "loc",
        distanceField: "distance",
        "distanceMultiplier" : 100/6378.1, //convert to radians as radius of earth is 6378.1 in kms so km/radius = radions in km is used
        spherical: true,
        maxDistance: maxDistance
      }
    },
    {
        $project: {
            _id: 0,
            user_id: 1,
            name: 1
        } //user_id and name only in the output
    },
    {
        $sort: {
            user_id: 1
        }
    } //sorting by user_id in ascending order
  ]
)
