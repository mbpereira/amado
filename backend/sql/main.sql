CREATE TABLE Users (
    id SERIAL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    pass VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    name VARCHAR (100) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE Categories (
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE Products (
    id SERIAL,
    code VARCHAR(20),
    name VARCHAR (100),
    idCategory INTEGER,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);
ALTER TABLE Products ADD CONSTRAINT Products_idCategory_fkey FOREIGN KEY (idCategory) REFERENCES Categories (id);
ALTER TABLE Products ADD CONSTRAINT Products_code_unique UNIQUE (code);

CREATE TABLE Sku (
    id SERIAL,
    idProduct INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);
ALTER TABLE Sku ADD CONSTRAINT Sku_idProduct_fkey FOREIGN KEY (idProduct) REFERENCES Products (id);

CREATE TABLE SkuStock (
    id SERIAL NOT NULL,
    idSku INT NOT NULL,
    cost DECIMAL NOT NULL,
    price DECIMAL NOT NULL,
    stock DECIMAL NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);
ALTER TABLE SkuStock ADD CONSTRAINT SkuStock_idSku_fkey FOREIGN KEY (idSku) REFERENCES Sku (id);

CREATE TABLE SkuImages (
    id SERIAL,
    idSku INTEGER NOT NULL,
    src VARCHAR(255),
    name VARCHAR(255) NOT NULL UNIQUE,
    link VARCHAR(255),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);
ALTER TABLE SkuImages ADD CONSTRAINT SkuImages_idSku_fkey FOREIGN KEY (idSku) REFERENCES Sku (id);

CREATE TABLE Customers (
    id SERIAL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR (100) NOT NULL UNIQUE,
    pass VARCHAR (100) NOT NULL,
    name VARCHAR (100),
    phone VARCHAR (20),
    birthday DATE,
    status INTEGER,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY(id)
);
CREATE TABLE CustomerAddresses (
    id SERIAL,
    idCustomer INTEGER NOT NULL,
    street VARCHAR (150) NOT NULL,
    number INTEGER,
    block VARCHAR (150),
    zip VARCHAR (8),
    complement VARCHAR (100),
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY(id)
);
ALTER TABLE CustomerAddresses ADD CONSTRAINT Orders_idCustomer_fkey FOREIGN KEY (idCustomer) REFERENCES Customers (id);

CREATE TABLE Orders (
    id SERIAL,
    idCustomer INTEGER NOT NULL,
    deliveryAddress INTEGER NOT NULL,
    status INTEGER NOT NULL,
    requiredAt TIMESTAMP,
    shippedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY(id)
);
ALTER TABLE Orders ADD CONSTRAINT Orders_idCustomer_fkey FOREIGN KEY (idCustomer) REFERENCES Customers (id);
ALTER TABLE Orders ADD CONSTRAINT Orders_deliveryAddress_fkey FOREIGN KEY (deliveryAddress) REFERENCES CustomerAddresses (id);

CREATE TABLE OrderItems (
    id SERIAL,
    idOrder INTEGER NOT NULL,
    idSku INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    discount REAL,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP,
    PRIMARY KEY (id)
);
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_idOrder_fkey FOREIGN KEY (idOrder) REFERENCES Orders (id);
ALTER TABLE OrderItems ADD CONSTRAINT OrderItems_idSku_fkey FOREIGN KEY (idSku) REFERENCES Sku (id);

