create table `employee` (
`id` INT(11) NOT NULL auto_increment,
`name` VARCHAR(255) NOT NULL,
`phone` VARCHAR(255),
`email` VARCHAR(255) NOT NULL,
`username` VARCHAR(20) NOT NULL,
`password` VARCHAR(255),
`manager_flag` BOOLEAN,
`profile_image_string` VARCHAR(5000),
`start_date` DATE,
PRIMARY KEY (`id`),
UNIQUE (`email`),
UNIQUE (`username`)
);

INSERT into employee(`name`, `phone`, `email`, `username`, `manager_flag`) VALUES 
('Casey', '8479998738', 'casey@homebase.com', 'casey', false),
('Dom', '3829182938', 'dom@homebase.com', 'dom', true),
('Daniel', '3948238495', 'daniel@homebase.com', 'daniel', true),
('Rachael', '0283748593', 'rachael@homebase.com', 'rachael', false),
('Sam', '2817263574', 'sam@homebase.com', 'sam', false),
('Chas', '8182937465', 'chas@homebase.com', 'chas', false),
('Maci', '9192837462', 'maci@homebase.com', 'maci', false),
('Kaley', '9192837465', 'kaley@homebase.com', 'kaley', false),
('Chloe', '0392861723', 'chloe@homebase.com', 'chloe', false),
('Jason', '4758392038', 'jason@homebase.com', 'jason', false);
select * from shift;
SHOW columns from employee;

ALTER TABLE employee add column username VARCHAR(20) after email;

create table `shift` (
`id` INT(11) NOT NULL auto_increment,
`date` DATE NOT NULL,
`employee_id` INT(11) NOT NULL,
`position` VARCHAR(255) NOT NULL,
`start` DATETIME NOT NULL,
`end` DATETIME NOT NULL,
`clock_in` DATETIME,
`clock_out` DATETIME,
`tips` Double,
`total_tips` DOUBLE,
PRIMARY KEY (`id`),
foreign key (`employee_id`) references employee(id)
-- foreign key (`date`) references `day`(`date`)
);
ALTER TABLE `shift` change `out` `clock_out` DATETIME;
alter table shift drop foreign key shift_ibfk_2;

INSERT INTO shift(`date`, `employee_id`, `position`, `start`, `end`, `total_tips`) VALUES
('2022-07-06', 1, 'BARTENDER', '2022-07-06 10:00:00', '2022-07-06 16:00:00', 2000.0),
('2022-07-06', 4, 'BARTENDER', '2022-07-06 16:00:00', '2022-07-06 22:00:00', 2000.0),
('2022-07-06', 7, 'BARBACK', '2022-07-06 10:00:00', '2022-07-06 22:00:00', 2000.0),
('2022-07-06', 3, 'MANAGER', '2022-07-06 10:00:00', '2022-07-06 22:00:00', 2000.0),
('2022-07-07', 5, 'BARTENDER', '2022-07-07 10:00:00', '2022-07-07 16:00:00', 2200.0),
('2022-07-07', 10, 'BARTENDER', '2022-07-07 16:00:00', '2022-07-07 22:00:00', 2200.0),
('2022-07-07', 8, 'BARBACK', '2022-07-07 10:00:00', '2022-07-07 22:00:00', 2200.0),
('2022-07-07', 2, 'MANAGER', '2022-07-07 10:00:00', '2022-07-07 22:00:00', 2200.0),
('2022-07-08', 6, 'BARTENDER', '2022-07-08 10:00:00', '2022-07-08 16:00:00', 2800.0),
('2022-07-08', 1, 'BARTENDER', '2022-07-08 16:00:00', '2022-07-08 22:00:00', 2800.0),
('2022-07-08', 4, 'BARTENDER', '2022-07-08 16:00:00', '2022-07-08 22:00:00', 2800.0),
('2022-07-08', 9, 'BARBACK', '2022-07-08 10:00:00', '2022-07-08 22:00:00', 2800.0),
('2022-07-08', 3, 'MANAGER', '2022-07-08 10:00:00', '2022-07-08 22:00:00', 2800.0),
('2022-07-09', 6, 'BARTENDER', '2022-07-09 10:00:00', '2022-07-09 16:00:00', 3100.0),
('2022-07-09', 4, 'BARTENDER', '2022-07-09 16:00:00', '2022-07-09 22:00:00', 3100.0),
('2022-07-09', 10, 'BARTENDER', '2022-07-09 16:00:00', '2022-07-09 22:00:00', 3100.0),
('2022-07-09', 7, 'BARBACK', '2022-07-09 10:00:00', '2022-07-09 22:00:00', 3100.0),
('2022-07-09', 2, 'MANAGER', '2022-07-09 10:00:00', '2022-07-09 22:00:00', 3100.0),
('2022-07-10', 1, 'BARTENDER', '2022-07-10 10:00:00', '2022-07-10 16:00:00', 2400.0),
('2022-07-10', 10, 'BARTENDER', '2022-07-10 16:00:00', '2022-07-10 22:00:00', 2400.0),
('2022-07-10', 9, 'BARBACK', '2022-07-10 10:00:00', '2022-07-10 22:00:00', 2400.0),
('2022-07-10', 3, 'MANAGER', '2022-07-10 10:00:00', '2022-07-10 22:00:00', 2400.0),
('2022-07-11', 4, 'BARTENDER', '2022-07-11 10:00:00', '2022-07-11 16:00:00', 1800.0),
('2022-07-11', 5, 'BARTENDER', '2022-07-11 16:00:00', '2022-07-11 22:00:00', 1800.0),
('2022-07-11', 8, 'BARBACK', '2022-07-11 10:00:00', '2022-07-11 22:00:00', 1800.0),
('2022-07-11', 2, 'MANAGER', '2022-07-11 10:00:00', '2022-07-11 22:00:00', 1800.0),
('2022-07-12', 1, 'BARTENDER', '2022-07-12 10:00:00', '2022-07-12 16:00:00', 1900.0),
('2022-07-12', 6, 'BARTENDER', '2022-07-12 16:00:00', '2022-07-12 22:00:00', 1900.0),
('2022-07-12', 8, 'BARBACK', '2022-07-12 10:00:00', '2022-07-12 22:00:00', 1900.0),
('2022-07-12', 3, 'MANAGER', '2022-07-12 10:00:00', '2022-07-12 22:00:00', 1900.0);
select * from shift;
delete from shift;

create table `day` (
`date` DATE NOT NULL,
`total_tips` Double,
primary key (`date`)
);

INSERT INTO `day`(`date`, `total_tips`) VALUES 
('2022-07-06', 2000.0),
('2022-07-07', 2200.0),
('2022-07-08', 2800.0),
('2022-07-09', 3100.0),
('2022-07-10', 2400.0),
('2022-07-11', 1800.0),
('2022-07-12', 1900.0);
select * from day;
drop table `day`;
