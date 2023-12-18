DROP TABLE IF EXISTS foodshelf;

CREATE TABLE foodshelf (
  id int unsigned AUTO_INCREMENT,
  food_name VARCHAR(20) NOT NULL,
  expiration_date date NOT NULL,
  sending_times int unsigned NOT NULL,
  PRIMARY KEY(id)
 );

 INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("鶏肉",　"2023-12-01", 3);
INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("牛肉",　"2023-12-11", 2);
INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("卵",　"2023-12-21", 1);
INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("玉ねぎ",　"2023-01-01", 2);
INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("にんじん",　"2023-01-11", 2);
INSERT INTO notifications (food_name, expiration_date, sending_times) VALUES ("じゃがいも",　"2023-01-21", 3);
