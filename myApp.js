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
];

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
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
  // done(null /*, data*/);
};

findPersonById("5f9e9b7b9d0b3e2a3c9e9b7c", (err, personFound) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Person found by id is equal to:", personFound);
  }
});

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, personFound) => {
    if (err) {
      return done(err);
    }
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    });
  });
};

// findEditThenSave("656fe6b2db10fb14e0cb03d5", (err, personUpdated) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("Person updated is equal to:", personUpdated);
//   }
// });

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) {
        return done(err);
      }
      done(null, updatedPerson);
    },
  );
};

findAndUpdate("John Doe", (err, updatedPerson) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Updated person:", updatedPerson);
  }
});

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      return done(err);
    }
    done(null, removedPerson);
  });
};

removeById("5f9e9b7b9d0b3e2a3c9e9b7c", (err, removedPerson) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Removed person:", removedPerson);
  }
});

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

removeManyPeople((err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Removed people:", result);
  }
});

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) {
        return done(err);
      }
      done(null, data);
    });

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
