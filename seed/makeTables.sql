--psql -f seed/makeTables.sql
DROP DATABASE IF EXISTS audio_practice;
CREATE DATABASE audio_practice;

-- CONNECTS TO THE DB... IF YOU DON'T DO THIS RELATIONS WON'T BE FOUND
\c audio_practice;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE practice (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    path_to_audio VARCHAR
);

CREATE TABLE original_audio (
    -- we generate these ourselves so that phrase can reference it
    id uuid PRIMARY KEY,
    -- the user-generated name
    name VARCHAR,
    -- the path to it on the server
    path_to VARCHAR,
    -- the first phrase of the tokenized transcript
    snippet VARCHAR
);

CREATE TABLE clip (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    -- path to the audio file
    path_to VARCHAR
);

-- tells you which clips the audio of a given practice comes from
CREATE TABLE practice_clip (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    practice_id uuid REFERENCES practice (id),
    clip_id uuid REFERENCES clip (id)
);

CREATE TABLE phrase (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    -- will be null until Tokenize is done by user
    clip_id uuid REFERENCES clip (id),
    original_audio_id uuid REFERENCES original_audio (id),
    -- we need to know what order they are in when we are on the Tokenize page
    ordinal_in_original integer,
    text VARCHAR
);

CREATE TABLE word (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    text VARCHAR
);

-- quick way of getting which phrases contain a given word
-- could recreate this relation every time you query... but that would be expensive
CREATE TABLE word_phrase (
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    phrase_id uuid REFERENCES phrase (id),
    word_id uuid REFERENCES word (id)
);
