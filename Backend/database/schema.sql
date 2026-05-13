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

ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry DATETIME NULL;

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

CREATE TABLE video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NULL,
    duration INT NULL, -- Duración en segundos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NULL,
    subtitle VARCHAR(255) NULL,
    short_description TEXT NULL,
    description TEXT,
    instructor_id INT NOT NULL,
    category_id INT NULL,

    level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',

    image_url VARCHAR(500) NULL,
    image_public_id VARCHAR(255) NULL,
    preview_video VARCHAR(500) NULL,

    price DECIMAL(10,2) DEFAULT 0,
    discount_price DECIMAL(10,2) DEFAULT 0,

    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',

    duration_minutes INT DEFAULT 0,

    requirements TEXT NULL,
    learning_objectives TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
CREATE TABLE course_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    position INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lecciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    video_url VARCHAR(500) NOT NULL,
    duration_minutes INT DEFAULT 0,
    is_preview TINYINT(1) DEFAULT 0,
    position INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE
);

CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    course_id INT NOT NULL,

    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    progress DECIMAL(5,2) DEFAULT 0,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,

    UNIQUE(user_id, course_id)
);

CREATE TABLE course_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    course_id INT NOT NULL,

    rating INT NOT NULL,
    comment TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);