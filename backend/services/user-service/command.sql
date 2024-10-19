CREATE TYPE usertype_enum AS ENUM('USER', 'OWNER', 'ADMIN');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USER_TABLE (
    user_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(500) NOT NULL,
    user_type usertype_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OWNER (
    owner_id CHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    identity_card_number VARCHAR(30) NOT NULL,
    tel VARCHAR(30) NOT NULL,
    FOREIGN KEY(owner_id) REFERENCES USER_TABLE(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- docker run -d --name user-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=user-postgres -p 5433:5432 postgres