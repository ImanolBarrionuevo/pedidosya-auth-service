\c authuser

INSERT INTO permissions (code) VALUES 
    ('CREATE_USER'),
    ('MODIFY_USER'),
    ('READ_USER'),
    ('DELETE_USER'),
    ('CREATE_ROLE'),
    ('MODIFY_ROLE'),
    ('READ_ROLE'),
    ('DELETE_ROLE'),
    ('CREATE_PERMISSION'),
    ('MODIFY_PERMISSION'),
    ('READ_PERMISSION'),
    ('DELETE_PERMISSION');

INSERT INTO roles (name) VALUES 
    ('Guest'),
    ('User'),
    ('Admin'),
    ('Moderator');


INSERT INTO roles_permissions ("rolesId", "permissionsId") VALUES 
    (1,3),
    (3,1),
    (3,2),
    (3,3),
    (3,4),
    (3,5),
    (3,6),
    (3,7),
    (3,8),
    (3,9),
    (3,10),
    (3,11),
    (3,12),
    (4,2),
    (4,3),
    (4,4);

INSERT INTO users (name, email, password, "rolesId") VALUES
    ('Marquito', 'marquito@gmail.com', '1234567', 1),
    ('Jorgelito', 'jorgelito@gmail.com', '1234567', 3),
    ('Juansito', 'juansito@gmail.com', '1234567', 4);