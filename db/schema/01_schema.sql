-- Drop Tables if existant
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS pins CASCADE;
DROP TABLE IF EXISTS users_maps CASCADE;

-- Recreate Tables
----------------------------------------

-- Recreate User Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Recreate Maps Table
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  zoom INTEGER NOT NULL,
  center_latitude DECIMAL NOT NULL,
  center_longitude DECIMAL NOT NULL
);

-- Recreate Pins Table
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  image_url VARCHAR(255),

  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL
);

-- Recreate Users_Maps Join Table
CREATE TABLE users_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
