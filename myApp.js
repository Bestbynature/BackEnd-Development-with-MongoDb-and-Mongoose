require("dotenv").config();
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  favoriteFoods: { type: [String], default: [] },
});

const dbUri = process.env.MONGO_URI;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const personData = {
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"],
  };

  const newPerson = new Person(personData);

  newPerson.save((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

createAndSavePerson((err, savedPerson) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Saved person is equal to:", savedPerson);
  }
});

const peopleData = [
  { name: "John Doe", age: 30, favoriteFoods: ["Pizza", "Burger"] },
  { name: "Jane Doe", age: 25, favoriteFoods: ["Pizza", "Burger"] },
  { name: "Jack Doe", age: 20, favoriteFoods: ["Pizza", "Burger"] },
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

createManyPeople(peopleData, (err, savedPeople) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Saved people are equal to:", savedPeople);
  }
});

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

findPeopleByName("John Doe", (err, peopleFound) => {
  if (err) {
    console.error(err);
  } else {
    console.log("People found are equal to:", peopleFound);
  }
});

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

findOneByFood("Pizza", (err, recordFound) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Person found is equal to:", recordFound);
  }
});

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};
// I need to work here
const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
