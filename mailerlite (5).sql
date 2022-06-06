-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 07:07 PM
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
  `campaigns_status` varchar(7) NOT NULL,
  `campaign_name` varchar(50) NOT NULL,
  `campaign_type` varchar(10) NOT NULL,
  `subjectofemail` varchar(100) NOT NULL,
  `email_body` varchar(1000) NOT NULL,
  `whomtosend` varchar(10) NOT NULL,
  `timeofsend` varchar(30) NOT NULL,
  `timeofscheduled` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `campaigns_details`
--

INSERT INTO `campaigns_details` (`campaign_key`, `user_key`, `campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES
(7, 10000001, 'sent', 'first campagn', 'option1', 'hello friends', 'how are you', 'option1', 'Thu, 02 Jun 2022 11:47:00 GMT', 'Thu, 02 Jun 2022 11:46:09 GMT'),
(8, 10000001, 'sent', 'outbox test', 'option1', 'outbox test', 'bhjvbgvh', 'option1', 'Sat, 25 Jun 2022 22:00:00 GMT', 'Thu, 02 Jun 2022 22:00:47 GMT'),
(9, 10000001, 'sent', 'crystal', 'option1', 'vbnb', 'vcvbvn', 'option1', 'Fri, 24 Jun 2022 22:02:00 GMT', 'Thu, 02 Jun 2022 22:02:08 GMT'),
(15, 10000001, 'draft', 'test outbox2', 'option1', 'yguygyukg', 'hrdjdg', 'toall', '', ''),
(16, 10000001, 'draft', '', 'option1', 'outbox test 3', 'knvjksvks', 'toall', '', ''),
(20, 10000001, 'draft', 'fsd', 'option1', 'internship massage', '                                        ', 'toall', '', ''),
(22, 10000001, 'draft', 'jlhsfvnv', 'option1', 'kdv.hafhvl', 'jkfvlskfjvsfvsdf', 'toall', '', ''),
(23, 10000001, 'outbox', 'fnvj,hzsv', 'option1', 's;kfj;', 'jksf;vaj', 'toall', 'Fri, 24 Jun 2022 11:38:00 GMT', 'Sat, 04 Jun 2022 11:38:22 GMT'),
(24, 10000001, 'sent', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:27 GMT'),
(25, 10000001, 'sent', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:31 GMT'),
(26, 10000001, 'sent', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:31 GMT'),
(27, 10000001, 'sent', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:31 GMT'),
(28, 10000001, 'draft', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:31 GMT'),
(29, 10000001, 'sent', 'skdf;ljsf', 'option1', 'nf;sfkja;f', '/lksfv/s', 'toall', 'Thu, 30 Jun 2022 11:41:00 GMT', 'Sat, 04 Jun 2022 11:41:32 GMT'),
(30, 10000001, 'sent', 'kjf;sdkf', 'option1', 'kjsfv;sd', 'wdscsaf', 'toall', 'Thu, 07 Jul 2022 12:20:00 GMT', 'Sat, 04 Jun 2022 12:20:50 GMT'),
(32, 10000001, 'outbox', 'test2', 'option1', 'fhskf', 'agkas', 'toall', 'Sat, 25 Jun 2022 12:34:00 GMT', 'Sat, 04 Jun 2022 12:35:02 GMT'),
(35, 10000001, 'outbox', 'test2', 'option1', 'fhskf', 'agkas', 'toall', 'Mon, 27 Jun 2022 12:37:00 GMT', 'Sat, 04 Jun 2022 12:37:10 GMT'),
(40, 10000001, 'draft', 'test2', 'option1', 'fhskf', 'agkas', 'toall', '', ''),
(41, 10000001, 'draft', 'test2', 'option1', 'fhskf', 'agkas', 'toall', '', ''),
(42, 10000001, 'draft', 'send mail test', 'option1', 'nfskfjav', 'AGFVJSFGKUYER', 'toall', '', ''),
(43, 10000001, 's_later', 'internship', 'option1', 'information about conference', 'mnk', 'toall', 'Thu, 30 Jun 2022 22:41:00 GMT', 'Sat, 04 Jun 2022 22:41:50 GMT'),
(44, 10000001, 'outbox', 'at 5-6', 'option1', 'test perpose', 'jrhfkajf', 'toall', 'Sat, 25 Jun 2022 21:41:00 GMT', 'Sun, 05 Jun 2022 21:41:16 GMT'),
(45, 10000005, 'outbox', 'deven first campaign', 'option1', 'test perpose', 'hi njnjcnj', 'toall', 'Fri, 24 Jun 2022 22:03:00 GMT', 'Mon, 06 Jun 2022 22:01:21 GMT');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_of_users`
--

CREATE TABLE `subscriber_of_users` (
  `user_key` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phonenumber` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriber_of_users`
--

INSERT INTO `subscriber_of_users` (`user_key`, `firstname`, `lastname`, `email`, `phonenumber`) VALUES
(10000001, 'aarju', 'boda', 'aarjupatel922003@gmail.com', 1234567890),
(10000001, 'aman', 'boda', 'wwwaarjubodaaarjuboda@gmail.com', 1987687960),
(10000005, 'deven', 'parmar', 'aarjupatel922003@gmail.com', 1234567788);

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
-- Indexes for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  ADD KEY `user_key` (`user_key`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns_details`
--
ALTER TABLE `campaigns_details`
  MODIFY `campaign_key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaigns_details`
--
ALTER TABLE `campaigns_details`
  ADD CONSTRAINT `campaigns_details_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users_details` (`user_key`);

--
-- Constraints for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  ADD CONSTRAINT `subscriber_of_users_ibfk_1` FOREIGN KEY (`user_key`) REFERENCES `users_details` (`user_key`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;