exports.up = function(db) {
  return db.createTable("jobs", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      notNull: true,
      unique: true
    },
    title: {
      type: "string",
      notNull: true
    },
    teaser: {
      type: "string"
    },
    company: {
      type: "string",
      notNull: true
    },
    logo: {
      type: "string",
      notNull: true
    },
    location: {
      type: "string",
      notNull: true
    },
    type: {
      type: "string",
      notNull: true
    },
    salary: {
      type: "int"
    },
    equity: {
      type: "string"
    },
    email: {
      type: "string",
      notNull: true
    },
    description: {
      type: "string",
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable("jobs");
};
