CREATE DATABASE IF NOT EXISTS proyect_JB;
use proyect_JB;

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO login (name, email, password) VALUES
('David', 'david@gmail.com', '123456'),
('Juan', 'juan@gmail.com', 'password1'),
('Maria', 'maria@gmail.com', 'test123');