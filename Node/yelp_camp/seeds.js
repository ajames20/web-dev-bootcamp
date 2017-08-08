const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Cloudy Skys',
    image: 'https://farm3.staticflickr.com/2551/3803274198_74e2e4c870.jpg',
    description: 'Always Cloudy 100% of the time.'
  },
  {
    name: 'Hill Lake',
    image: 'https://farm4.staticflickr.com/3149/3062180144_ee0d2d466a.jpg',
    description: 'Lake next to a hill.'
  },
  {
    name: 'Golden Forest',
    image: 'https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg',
    description: 'Yellow trees???.'
  }
]
function seedDb() {
  // Remove all DB data
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campgrounds');
    // Add campground data to DB
    data.forEach(seed => {
      Campground.create(seed, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added a Campground');
          // Add comments to campgrounds in DB
          Comment.create(
            {
              text: 'This place is 🔥🔥🔥🔥',
              author: 'Homer J. Simpson'
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new Comment.')
              }
            });
        }
      });
    });
  });
}

module.exports = seedDb;
