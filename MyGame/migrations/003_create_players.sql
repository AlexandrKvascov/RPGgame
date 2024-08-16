CREATE TABLE IF NOT EXISTS players
(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    health integer NOT NULL DEFAULT 30,
    strenght integer NOT NULL DEFAULT 10,
    lvl smallint NOT NULL DEFAULT 1,
    hp smallint NOT NULL DEFAULT 3
);