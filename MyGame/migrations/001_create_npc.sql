CREATE TABLE IF NOT EXISTS npc
(
    id SERIAL PRIMARY KEY,
    type text NOT NULL,
    lvl smallint NOT NULL DEFAULT 1,
    health smallint NOT NULL DEFAULT 20,
    strength smallint NOT NULL DEFAULT 5,
    dead boolean NOT NULL DEFAULT false,
    location text NOT NULL
);