-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2022 at 07:57 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mailerlite`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns_details`
--

CREATE TABLE `campaigns_details` (
  `campaign_key` bigint(20) NOT NULL,
  `user_key` int(11) NOT NULL,
  `campaigns_status` int(1) NOT NULL,
  `campaign_name` varchar(50) NOT NULL,
  `campaign_type` varchar(10) NOT NULL,
  `subjectofemail` varchar(100) NOT NULL,
  `email_body` varchar(1000) NOT NULL,
  `whomtosend` varchar(30) NOT NULL,
  `timeofsend` varchar(30) NOT NULL,
  `timeofscheduled` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `campaigns_details`
--

INSERT INTO `campaigns_details` (`campaign_key`, `user_key`, `campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES
(48, 10000005, 0, 'deven first campaign', 'option1', 'test perpose', 'hi njnjcnj', 'toall', '', ''),
(49, 10000005, 0, 'deven first campaign', 'option1', 'test perpose', 'hi njnjcnj', 'toall', '', ''),
(67, 10000005, 0, 'jkjsf', 'option1', 'sfnldk', 'lkasjkldl', 'toall', '', ''),
(68, 10000005, 0, 'SGSG', 'option1', 'DKFNKLNSD', 'KALSFJAKL', 'toall', '', ''),
(70, 10000005, 0, 'FSVDS', 'option1', 'DVXD', 'VXV', 'toall', '', ''),
(71, 10000005, 0, 'FSVDS', 'option1', 'FVSFVD', 'FVDF', 'toall', '', ''),
(72, 10000005, 0, 'FSVDS', 'option1', 'DVBDF', 'CVZXCVZXC', 'toall', '', ''),
(73, 10000005, 1, 'ZSVSZ', 'option1', 'SDCVZX', 'ZCVXZC', 'toall', 'Thu, 09 Jun 2022 13:12:00 GMT', 'Thu, 09 Jun 2022 13:11:54 GMT'),
(74, 10000005, 1, 'SFDVDS', 'option1', 'DSFVDS', 'SDBSDB', 'toall', 'Thu, 09 Jun 2022 13:26:00 GMT', 'Thu, 09 Jun 2022 13:25:06 GMT'),
(75, 10000005, 1, 'crystal', 'option1', 'internship massage', 'zfvzv', 'toall', 'Thu, 09 Jun 2022 14:20:00 GMT', 'Thu, 09 Jun 2022 14:19:03 GMT'),
(76, 10000005, 0, 'deven secound campaigns', 'option1', 'nothing special', 'kjfjksfsfk', 'toall', '', ''),
(77, 10000005, 1, 'KML', 'option1', 'CVXDV', 'CVZXCV', 'toall', 'Thu, 09 Jun 2022 16:25:00 GMT', 'Thu, 09 Jun 2022 16:24:18 GMT'),
(78, 10000005, 0, 'XCVXV', 'option1', 'CXVXCV', 'ZFVZ', 'toall', '', ''),
(79, 10000005, 0, 'mhb', 'option1', 'lz,ms;vm', 'zdvzv', 'toall', '', ''),
(80, 10000005, 0, 'mhb', 'option1', 'lz,ms;vm', 'zdvzv', 'toall', '', ''),
(81, 10000005, 0, 'mhb', 'option1', 'lz,ms;vm', 'zdvzv', 'toall', '', ''),
(82, 10000005, 0, 'mhb', 'option1', 'lz,ms;vm', 'zdvzv', 'toall', '', ''),
(110, 10000001, 0, 'intern', 'option1', 'dfvsdf', 'cvz', '2', '', ''),
(112, 10000001, 1, 'internship', 'option1', 'information about conference', 'sdasdc', '1', 'Mon, 13 Jun 2022 17:18:00 GMT', 'Mon, 13 Jun 2022 17:17:10 GMT'),
(113, 10000001, 0, 'internship', 'option1', 'adsz', 'aaaa', '1,4', '', ''),
(114, 10000001, 0, 'dszds', 'option1', 'svszds', 'aaavfvf', '2', '', ''),
(115, 10000001, 0, 'dszds', 'option1', 'svszds', 'aaavfvf', '2', '', ''),
(116, 10000001, 1, 'zsdfz', 'option1', 'sdczs', 'aaawwww', 'toall', 'Fri, 17 Jun 2022 10:09:00 GMT', 'Fri, 17 Jun 2022 10:08:46 GMT'),
(117, 10000001, 0, 'internship', 'option1', 'information about conference', 'zsfvz', 'toall', '', ''),
(139, 10000001, 3, 'fvf', 'option1', 'sdc', 'szvcz', 'toall', 'Sat, 20 Aug 2022 11:21:00 GMT', 'Mon, 13 Jun 2022 11:21:14 GMT'),
(142, 10000001, 1, 'test email_body', 'option1', 'sscn zk', 'jdskjasjdskjasjdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjas\r\njdskjasjdskjasjdskjasjdskjas', '2,4', 'Mon, 13 Jun 2022 17:03:00 GMT', 'Mon, 13 Jun 2022 17:01:50 GMT'),
(143, 10000006, 1, 'Najjajs', 'option1', 'Jsjs', '                                        ', 'toall', 'Mon, 13 Jun 2022 17:12:00 GMT', 'Mon, 13 Jun 2022 17:11:07 GMT'),
(144, 10000001, 0, 'zsdfz', 'option1', 'sdczs', 'aaawwww', 'toall', '', ''),
(145, 10000001, 0, 'xfdx', 'option1', 'xfgxdf', 'adsezf', '1,2', '', ''),
(146, 10000001, 0, 'fxbxd', 'option1', 'internship purpose', 'serfd', '1,2,4', '', ''),
(147, 10000001, 0, 'fxbxd', 'option1', 'aSdaca', 'zdfvdx', '1,4', '', ''),
(148, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(149, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(150, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(151, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(152, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(153, 10000001, 0, 'fxbxd', 'option1', 'szf', 'zsd', '2', '', ''),
(154, 10000001, 0, 'dfsdf', 'option1', 'sfvsf', 'sdcz', '2', '', ''),
(155, 10000001, 0, 'dfsdf', 'option1', 'sfvsf', 'sdcz', '2,4', '', ''),
(156, 10000001, 1, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', 'Tue, 21 Jun 2022 17:57:00 GMT', 'Tue, 21 Jun 2022 17:56:54 GMT'),
(157, 10000001, 1, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', 'Tue, 21 Jun 2022 17:59:00 GMT', 'Tue, 21 Jun 2022 17:58:22 GMT'),
(158, 10000001, 2, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', 'Fri, 01 Jul 2022 18:00:00 GMT', 'Tue, 21 Jun 2022 18:00:07 GMT'),
(159, 10000001, 0, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', '', ''),
(160, 10000001, 1, 'zcxzzv z', 'option1', 'zdc', '<p style=\"text-align: center;\">hellooo</p>\r\n<p style=\"text-align: center;\"><strong>i ma aarju patel&nbsp;</strong></p>\r\n<p style=\"text-align: center;\"><strong>and bye</strong></p>', 'toall', 'Tue, 21 Jun 2022 18:24:00 GMT', 'Tue, 21 Jun 2022 18:23:13 GMT'),
(161, 10000001, 0, 'zcxzzv z', 'option1', 'zdc', '<p style=\"text-align: center;\">hellooo</p>\r\n<p style=\"text-align: center;\"><strong>i ma aarju patel&nbsp;</strong></p>\r\n<p style=\"text-align: center;\"><strong>and bye</strong></p>', 'toall', '', ''),
(162, 10000001, 1, 'SDfsd', 'option1', 'vsdv', '<p>kb.jnk/nn</p>', 'toall', 'Wed, 22 Jun 2022 12:28:00 GMT', 'Wed, 22 Jun 2022 12:27:43 GMT'),
(163, 10000001, 0, 'SDfsd', 'option1', 'vsdv', '<p>kb.jnk/nn</p>', 'toall', '', ''),
(164, 10000001, 1, 'internship', 'option1', 'hello friends', '<p>hi i am <strong>aarju patel from BVM</strong></p>\r\n<p style=\"text-align: justify;\">i want to tell you that <strong>you are selected for annual price withdraaw program</strong> from BVM engeenirirng collage aanand</p>\r\n<p style=\"text-align: justify;\">you can collect your small gift from<strong> counter no. - 4 </strong>.</p>\r\n<p style=\"text-align: center;\">thank you&nbsp;</p>\r\n<p style=\"text-align: right;\">from -&nbsp; <strong>team BVM</strong>.</p>', 'toall', 'Wed, 22 Jun 2022 13:12:00 GMT', 'Wed, 22 Jun 2022 13:10:20 GMT'),
(165, 10000001, 0, 'internship', 'option1', 'hello friends', '<p>hi i am <strong>aarju patel from BVM</strong></p>\r\n<p style=\"text-align: justify;\">i want to tell you that <strong>you are selected for annual price withdraaw program</strong> from BVM engeenirirng collage aanand</p>\r\n<p style=\"text-align: justify;\">you can collect your small gift from<strong> counter no. - 4 </strong>.</p>\r\n<p style=\"text-align: center;\">thank you&nbsp;</p>\r\n<p style=\"text-align: right;\">from -&nbsp; <strong>team BVM</strong>.</p>', 'toall', '', ''),
(166, 10000001, 0, 'test 23-6', 'option1', 'hello', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>\r\n<p style=\"text-align: center;\"><span style=\"color: rgb(186, 55, 42);\"><strong>hello</strong></span></p>', '1,2,4', '', ''),
(167, 10000001, 0, 'test 23-6', 'option1', 'hello', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>\r\n<p style=\"text-align: center;\"><span style=\"color: rgb(186, 55, 42);\"><strong>hello</strong></span></p>', '1,2,4', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `group_details`
--

CREATE TABLE `group_details` (
  `user_key` int(11) NOT NULL,
  `group_key` int(11) NOT NULL,
  `group_name` varchar(20) NOT NULL,
  `time_of_edit` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_details`
--

INSERT INTO `group_details` (`user_key`, `group_key`, `group_name`, `time_of_edit`) VALUES
(10000001, 1, 'intern', '2022-06-23 05:53:05'),
(10000001, 2, 'students', '2022-06-23 05:53:05'),
(10000005, 3, 'intern', '2022-06-23 05:53:05'),
(10000001, 4, 'nothing', '2022-06-23 05:53:05'),
(10000001, 5, 'zsfvzsfv', '2022-06-23 05:53:05'),
(10000001, 6, 'sagar', '2022-06-23 05:53:05');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_of_users`
--

CREATE TABLE `subscriber_of_users` (
  `subscriber_key` bigint(20) NOT NULL,
  `user_key` int(11) NOT NULL,
  `group_key` varchar(30) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phonenumber` bigint(11) NOT NULL,
  `time_of_add` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriber_of_users`
--

INSERT INTO `subscriber_of_users` (`subscriber_key`, `user_key`, `group_key`, `firstname`, `lastname`, `email`, `phonenumber`, `time_of_add`) VALUES
(1, 10000001, '1', 'aarju', 'patel', 'aarjupatel922003@gmail.com', 8787878787, '2022-06-23 05:53:51'),
(2, 10000001, '1', 'aman', 'patel', 'wwwaarjubodaaarjuboda@gmail.com', 989089898, '2022-06-23 05:53:51'),
(3, 10000001, '2', 'deven', 'parmar', 'deven@gmail.com', 9878978978, '2022-06-23 05:53:51'),
(4, 10000006, '2', 'deven', 'parmar', 'deven@gmail.com', 9878978978, '2022-06-23 05:53:51'),
(5, 10000001, '2,4', 'Aarju', 'Patel', 'aarjubodaaarjusvzsboda@gmail.com', 6353884460, '2022-06-23 05:53:51'),
(20, 10000001, '5,6', 'sagar', 'Patel', 'sagarrjuboda@gmail.com', 6353884460, '2022-06-23 05:53:51');

-- --------------------------------------------------------

--
-- Table structure for table `users_details`
--

CREATE TABLE `users_details` (
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `companyname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phonenumber` bigint(20) NOT NULL,
  `user_key` int(11) NOT NULL,
  `pass` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_details`
--

INSERT INTO `users_details` (`firstname`, `lastname`, `companyname`, `email`, `phonenumber`, `user_key`, `pass`) VALUES
('aarju', 'patel', 'aman pvt limited', 'travelagency3111@gmail.com', 6353884460, 10000001, '$2a$08$HNg5HyL8V2aJHkK.HFq10eQ1PiBK2Ry.BpQ4wnx6xYxIvf474DquO'),
('Aarju', 'Patel', 'xyzpvt ltd', 'aarjupatel922003@gmail.com', 6353884460, 10000003, '$2a$08$SoEhD5VITnHi.vNDUCWa7Ou8QWTBsEypCZLdg2sZA7f1l6thVLzHy'),
('Aarju', 'Patel', 'Aarju pt. Lmt.', 'aarjubodaaarjuboda@gmail.com', 6353884460, 10000004, '$2a$08$HNg5HyL8V2aJHkK.HFq10eQ1PiBK2Ry.BpQ4wnx6xYxIvf474DquO'),
('Deven', 'Parmar', 'dvd pvt ltd', 'deven@gmail.com', 9999999999, 10000005, '$2a$08$uP4jaEVw1X3nEY6e.n0cq.n91Hu3Q7N3SfKc9ITX420sR4vj5pH/S'),
('aman', 'patel', 'aman  Lmt.', 'aman@gmail.com', 6353884460, 10000006, '$2a$08$RKYGtzEC3Fd/XMC4tmNANe6Ndb6PxfWuy3sdkj6shRM7f9BD/HT96'),
('Aarju', 'Patel', 'kjnnm,', 'mmmtravelagency3111@gmail.com', 6353884460, 10000007, '$2a$08$ihhnzwP.iQ7Jxg1argmKIOjol3VoaQvGQrydUJy7jKxI8s4lKbtlW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns_details`
--
ALTER TABLE `campaigns_details`
  ADD PRIMARY KEY (`campaign_key`),
  ADD KEY `user_key` (`user_key`);

--
-- Indexes for table `group_details`
--
ALTER TABLE `group_details`
  ADD PRIMARY KEY (`group_key`),
  ADD KEY `user_key` (`user_key`);

--
-- Indexes for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  ADD PRIMARY KEY (`subscriber_key`),
  ADD KEY `user_key` (`user_key`);

--
-- Indexes for table `users_details`
--
ALTER TABLE `users_details`
  ADD PRIMARY KEY (`user_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns_details`
--
ALTER TABLE `campaigns_details`
  MODIFY `campaign_key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `group_details`
--
ALTER TABLE `group_details`
  MODIFY `group_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  MODIFY `subscriber_key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users_details`
--
ALTER TABLE `users_details`
  MODIFY `user_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000008;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaigns_details`
--
ALTER TABLE `campaigns_details`
  ADD CONSTRAINT `campaigns_details_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users_details` (`user_key`);

--
-- Constraints for table `group_details`
--
ALTER TABLE `group_details`
  ADD CONSTRAINT `group_details_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users_details` (`user_key`);

--
-- Constraints for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  ADD CONSTRAINT `subscriber_of_users_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users_details` (`user_key`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
