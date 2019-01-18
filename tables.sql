-- create pokemon table
CREATE TABLE IF NOT EXISTS pokemon (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  height varchar(255)
);
