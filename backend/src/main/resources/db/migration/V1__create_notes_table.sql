CREATE TABLE notes (
                       id BIGSERIAL PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       content TEXT,
                       archived BOOLEAN DEFAULT FALSE,
                       created_at TIMESTAMPTZ DEFAULT now(),
                       updated_at TIMESTAMPTZ DEFAULT now()
);
