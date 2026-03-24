CREATE DATABASE IF NOT EXISTS jpbim_db;
USE jpbim_db;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    email_verified TINYINT(1) DEFAULT 0,
    verification_token VARCHAR(255) NULL,
    verification_expires DATETIME NULL,
    google_id VARCHAR(255) UNIQUE NULL,
    reset_password_token VARCHAR(255) NULL,
    reset_password_expires DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de suscripciones
CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('basic', 'pro', 'enterprise') NOT NULL,
    status ENUM('active', 'inactive', 'cancelled', 'pending') DEFAULT 'pending',
    start_date DATETIME NULL,
    end_date DATETIME NULL,
    price_paid DECIMAL(10, 2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_verification ON users(verification_token);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Insertar usuario admin por defecto (cambiar contraseña después)
-- Contraseña: admin123 (cambiar en producción)
INSERT INTO users (email, password_hash, name, role, email_verified) 
VALUES ('admin@jpbim.com', '$2b$10$xZa5P5HFYzpRtjcZuyMznOn/BSB9FkcTBhJHeK5rCPh3mETIeAAbi', 'Admin JP.BIM', 'admin', true);