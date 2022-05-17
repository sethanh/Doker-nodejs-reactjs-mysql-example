-- books
CREATE TABLE `books_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(50) NOT NULL,
  `book_review` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
-- study
CREATE TABLE `study` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vietnam` varchar(200) NOT NULL,
  `english` varchar(200) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
-- users
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `birthday` DATE NULL DEFAULT NULL,
  `name` varchar(50) NULL DEFAULT NULL,
  `email` varchar(100) NULL DEFAULT NULL,
  `username` varchar(50) NULL DEFAULT NULL,
  `phone` varchar(20) NULL DEFAULT NULL,
  `rule` ENUM('admin', 'customer','staff','management') NULL DEFAULT 'customer',
  `password` varchar(225) NOT NULL,
  `image` varchar(225) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `address` varchar(225) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES users(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_facebook` varchar(100) NULL DEFAULT NULL,
  `address` varchar(225) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user`) REFERENCES users(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NULL DEFAULT NULL,
  `unit` ENUM('0','1','2','3','4') NULL DEFAULT '0',
  `price` float(40) NULL DEFAULT 0,
  `image` varchar(225) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `invoices_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_customer` int(11) NOT NULL,
  `address_receive` varchar(225) NULL DEFAULT NULL,
  `orders` varchar(225) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_customer`) REFERENCES customers(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_customer` int(11) NOT NULL,
  `id_staff` int(11) NOT NULL,
  `address_receive` varchar(225) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_customer`) REFERENCES customers(`id`),
  FOREIGN KEY (`id_staff`) REFERENCES staffs(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
CREATE TABLE `invoices_detail` (
  `id_invoice` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantify` int(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`id_invoice`) REFERENCES invoices(`id`),
  FOREIGN KEY (`id_product`) REFERENCES products(`id`),
  primary key (`id_invoice`,`id_product`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;