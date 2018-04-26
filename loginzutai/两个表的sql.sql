CREATE DATABASE equipmentrepairsystem;
USE equipmentrepairsystem;


DROP TABLE IF EXISTS history_table;

CREATE TABLE history_table(
`id` INT(11) NOT NULL AUTO_INCREMENT,
  `tag_id` VARCHAR(30) NOT NULL,
  `tag_name` VARCHAR(255) NOT NULL,
  `value` FLOAT(5,2),
  `timestamp` DATETIME NOT NULL ,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

INSERT INTO histor_table VALUES('1', '20180101', 'tag020', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('2', '20180102', 'tag021', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('3', '20180103', 'tag022', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('4', '20180104', 'tag023', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('5', '20180105', 'tag024', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('6', '20180106', 'tag025', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('7', '20180107', 'tag026', '20', '2018-02-02 14:01');
INSERT INTO histor_table VALUES('8', '20180108', 'tag027', '20', '2018-02-02 14:01');


DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(20) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `phone` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

INSERT INTO `user_info` VALUES ('1', '3901120212', 'root', '123', '13778906789');
INSERT INTO `user_info` VALUES ('2', '6901120201', '王鑫', '123', '13678906789');
INSERT INTO `user_info` VALUES ('3', '3901120901', '王凯', '123', '13578906789');
INSERT INTO `user_info` VALUES ('4', '3901320201', '王源', '123', '13478906789');
INSERT INTO `user_info` VALUES ('5', '5901120201', '李易峰', '123',  '13378906789');
INSERT INTO `user_info` VALUES ('6', '3451120201', '谢尔顿', '123', '13278906789');
INSERT INTO `user_info` VALUES ('7', '3902220201', '霍金', '123', '13178906789');
INSERT INTO `user_info` VALUES ('8', '3902120201', '牛顿', '123', '13078906789');
INSERT INTO `user_info` VALUES ('9', '3901120301', '爱因斯坦', '123', '17978906789');
INSERT INTO `user_info` VALUES ('11', '3901120201', 'user', '123', '15778906789');