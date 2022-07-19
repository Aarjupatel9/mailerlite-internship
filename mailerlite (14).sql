-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2022 at 08:32 PM
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
(139, 10000001, 1, 'fvf', 'option1', 'sdc', 'szvcz', 'toall', 'Sat, 20 Aug 2022 11:21:00 GMT', 'Mon, 13 Jun 2022 11:21:14 GMT'),
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
(158, 10000001, 1, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', 'Fri, 01 Jul 2022 18:00:00 GMT', 'Tue, 21 Jun 2022 18:00:07 GMT'),
(159, 10000001, 0, 'cm z,c', 'option1', 'zsd', '<p style=\"text-align: center;\">hello friends&nbsp;<strong>zjkfnvjkznsjknk<em>sdnmdmzjsdnd znfvkz&nbsp;</em></strong><em>fdvzz</em></p>', '1', '', ''),
(160, 10000001, 1, 'zcxzzv z', 'option1', 'zdc', '<p style=\"text-align: center;\">hellooo</p>\r\n<p style=\"text-align: center;\"><strong>i ma aarju patel&nbsp;</strong></p>\r\n<p style=\"text-align: center;\"><strong>and bye</strong></p>', 'toall', 'Tue, 21 Jun 2022 18:24:00 GMT', 'Tue, 21 Jun 2022 18:23:13 GMT'),
(161, 10000001, 0, 'zcxzzv z', 'option1', 'zdc', '<p style=\"text-align: center;\">hellooo</p>\r\n<p style=\"text-align: center;\"><strong>i ma aarju patel&nbsp;</strong></p>\r\n<p style=\"text-align: center;\"><strong>and bye</strong></p>', 'toall', '', ''),
(162, 10000001, 1, 'SDfsd', 'option1', 'vsdv', '<p>kb.jnk/nn</p>', 'toall', 'Wed, 22 Jun 2022 12:28:00 GMT', 'Wed, 22 Jun 2022 12:27:43 GMT'),
(163, 10000001, 0, 'SDfsd', 'option1', 'vsdv', '<p>kb.jnk/nn</p>', 'toall', '', ''),
(164, 10000001, 1, 'internship', 'option1', 'hello friends', '<p>hi i am <strong>aarju patel from BVM</strong></p>\r\n<p style=\"text-align: justify;\">i want to tell you that <strong>you are selected for annual price withdraaw program</strong> from BVM engeenirirng collage aanand</p>\r\n<p style=\"text-align: justify;\">you can collect your small gift from<strong> counter no. - 4 </strong>.</p>\r\n<p style=\"text-align: center;\">thank you&nbsp;</p>\r\n<p style=\"text-align: right;\">from -&nbsp; <strong>team BVM</strong>.</p>', 'toall', 'Wed, 22 Jun 2022 13:12:00 GMT', 'Wed, 22 Jun 2022 13:10:20 GMT'),
(165, 10000001, 0, 'internship', 'option1', 'hello friends', '<p>hi i am <strong>aarju patel from BVM</strong></p>\r\n<p style=\"text-align: justify;\">i want to tell you that <strong>you are selected for annual price withdraaw program</strong> from BVM engeenirirng collage aanand</p>\r\n<p style=\"text-align: justify;\">you can collect your small gift from<strong> counter no. - 4 </strong>.</p>\r\n<p style=\"text-align: center;\">thank you&nbsp;</p>\r\n<p style=\"text-align: right;\">from -&nbsp; <strong>team BVM</strong>.</p>', 'toall', '', ''),
(166, 10000001, 0, 'test 23-6', 'option1', 'hello', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>\r\n<p style=\"text-align: center;\"><span style=\"color: rgb(186, 55, 42);\"><strong>hello</strong></span></p>', '1,2,4', '', ''),
(167, 10000001, 3, 'test 23-6', 'option1', 'hello', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>\r\n<p style=\"text-align: center;\"><span style=\"color: rgb(186, 55, 42);\"><strong>hello</strong></span></p>', '1,2,4', 'Fri, 29 Jul 2022 10:23:00 GMT', 'Sat, 02 Jul 2022 10:23:57 GMT'),
(168, 10000001, 1, 'vbbvc', 'option1', 'fxgvdf', '<p>crate your email body here with tynimce</p>', '4,5', 'Tue, 28 Jun 2022 17:15:00 GMT', 'Tue, 28 Jun 2022 17:13:49 GMT'),
(169, 10000001, 0, 'vbbvc', 'option1', 'fxgvdf', '<p>crate your email body here with tynimce</p>', '4,5', '', ''),
(170, 10000001, 0, 'vbbvc', 'option1', 'fxgvdf', '<p>crate your email body here with tynimce</p>', '4,5', '', ''),
(171, 10000001, 1, 'internship', 'option1', 'create camp from port forwarding', '<p style=\"text-align: left;\"><strong>Hello janeman</strong></p>\r\n<p style=\"text-align: center;\">creating camp from live server port forwarding</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">hello how are you man,</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">ohk now its time to go</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">by by</p>\r\n<p style=\"text-align: right;\"><strong>your favourite Aarju</strong></p>', 'toall', 'Tue, 28 Jun 2022 17:22:00 GMT', 'Tue, 28 Jun 2022 17:20:41 GMT'),
(172, 10000001, 1, 'internship', 'option1', 'create camp from port forwarding', '<p style=\"text-align: left;\"><strong>Hello janeman</strong></p>\r\n<p style=\"text-align: center;\">creating camp from live server port forwarding</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">hello how are you man,</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">ohk now its time to go</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">by by</p>\r\n<p style=\"text-align: right;\"><strong>your favourite Aarju</strong></p>', 'toall', 'Wed, 29 Jun 2022 14:13:00 GMT', 'Wed, 29 Jun 2022 14:12:00 GMT'),
(173, 10000001, 1, 'internship', 'option1', 'create camp from port forwarding', '<p style=\"text-align: left;\"><strong>Hello janeman</strong></p>\r\n<p style=\"text-align: center;\">creating camp from live server port forwarding</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">hello how are you man,</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">ohk now its time to go</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">by by</p>\r\n<p style=\"text-align: right;\"><strong>your favourite Aarju</strong></p>', 'toall', 'Sun, 10 Jul 2022 14:12:00 GMT', 'Wed, 29 Jun 2022 14:12:32 GMT'),
(174, 10000001, 0, 'internship', 'option1', 'create camp from port forwarding', '<p style=\"text-align: left;\"><strong>Hello janeman</strong></p>\r\n<p style=\"text-align: center;\">creating camp from live server port forwarding</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">hello how are you man,</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">ohk now its time to go</p>\r\n<p style=\"text-align: left; padding-left: 360px;\">by by</p>\r\n<p style=\"text-align: right;\"><strong>your favourite Aarju</strong></p>', 'toall', '', ''),
(175, 10000001, 0, 'test 23-6', 'option1', 'hello', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>\r\n<p style=\"text-align: center;\"><span style=\"color: rgb(186, 55, 42);\"><strong>hello</strong></span></p>', '1,2,4', '', ''),
(176, 10000001, 1, 'kjdns', 'option1', 'mm nx', '<p>crate your email body here with tynimce</p>', '1,5', 'Sat, 09 Jul 2022 15:46:00 GMT', 'Sat, 09 Jul 2022 15:44:48 GMT'),
(177, 10000001, 0, 'kjdns', 'option1', 'mm nx', '<p>crate your email body here with tynimce</p>', '1,5', '', ''),
(178, 10000001, 1, 'dfvsfdv', 'option1', 'fvsfvsdfvsfv', '<p>crate your email body here with tynimcedv x x x xcv xcv xdv xfdvsdfvsdfv</p>', 'toall', 'Mon, 11 Jul 2022 21:16:00 GMT', 'Mon, 11 Jul 2022 21:15:18 GMT'),
(179, 10000001, 0, 'dfvsfdv', 'option1', 'fvsfvsdfvsfv', '<p>crate your email body here with tynimcedv x x x xcv xcv xdv xfdvsdfvsdfv</p>', 'toall', '', ''),
(180, 10000001, 2, 'dfmnvfmvfvvsfvkjsf', 'option1', 'mvz,v,vdvmlskdfvmsfv', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>', '1,2,5,1,1,1,1', 'Sat, 06 Aug 2022 12:28:00 GMT', 'Sun, 17 Jul 2022 12:28:15 GMT'),
(181, 10000001, 0, 'dfmnvfmvfvvsfvkjsf', 'option1', 'mvz,v,vdvmlskdfvmsfv', '<p style=\"text-align: center;\">crate your email body here with tynimce</p>', '1,2,5,1,1,1,1', '', ''),
(182, 10000001, 0, 'klvbmkldvm', 'option1', 'gbd', '<p style=\"text-align: center;\">crate your email body here with tynimcesmfv</p>\r\n<p style=\"text-align: center;\">sdfvmlskdfv</p>\r\n<p style=\"text-align: center;\">vsldkfnblskd</p>\r\n<p style=\"text-align: center;\">sbsdkgbjsgj</p>\r\n<p style=\"text-align: center;\">sbslkdbbsdn</p>\r\n<p style=\"text-align: center;\">sdopvjsl</p>', '`2`,`5`,`6`,`11`,`13`', '', ''),
(183, 10000001, 0, 'test drft', 'option1', 'sfdvsd', '<p>crate your email body here with tynimce</p>', '`2`,`6`,`11`,`13`', '', ''),
(184, 10000001, 0, 'test drft', 'option1', 'svs', '<p>crate your email body here with tynimce</p>', '`2`,`6`,`11`,`13`', '', ''),
(185, 10000001, 0, 'test drft', 'option1', 'sdfvsdfv', '<p>crate your email body here with tynimce</p>', '2,6,1,1,1,2,1,3', '', ''),
(186, 10000001, 0, 'test drft', 'option1', 'fvsdf', '<p>crate your email body here with tynimce</p>', '2,4,6,1,1,1,2,1,3', '', ''),
(187, 10000001, 0, 'test drft', 'option1', 'xv x', '<p>crate your email body here with tynimce</p>', '2,5,6,11,1,12,2,13,3', '', ''),
(188, 10000001, 0, 'test drft', 'option1', 'dfvdfvd', '<p>crate your email body here with tynimce</p>', '2,11,1,12,2,13,3', '', ''),
(189, 10000001, 2, 'test drft', 'option1', 'xdvbdx', '<p>crate your email body here with tynimce</p>', '2,4,11,12,13', 'Sat, 06 Aug 2022 13:10:00 GMT', 'Sun, 17 Jul 2022 13:10:51 GMT'),
(190, 10000001, 2, 'test drft', 'option1', 'xdvbdx', '<p>crate your email body here with tynimce</p>', '2,4,11,12,13', 'Fri, 05 Aug 2022 13:15:00 GMT', 'Sun, 17 Jul 2022 13:15:26 GMT'),
(191, 10000001, 0, 'test drft', 'option1', 'xdvbdx', '<p>crate your email body here with tynimce</p>', '2,4,11,12,13', '', ''),
(192, 10000001, 0, 'v x', 'option1', 'dfvdx', '<p>crate your email body here with tynimce</p>', '5,6,12,13', '', ''),
(193, 10000001, 1, 'xfvdx', 'option1', 'xdgbdxgbxd', '<p>jkdgdkxbdxgjnkbdfgbf</p>', '1,4,5,6,10,11,12,13', 'Sun, 17 Jul 2022 13:44:00 GMT', 'Sun, 17 Jul 2022 13:41:02 GMT'),
(194, 10000001, 0, 'xfvdx', 'option1', 'xdgbdxgbxd', '<p>jkdgdkxbdxgjnkbdfgbf</p>', '1,4,5,6,10,11,12,13', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `user_key` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `group_key` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `formSchema` varchar(2500) NOT NULL,
  `created_on` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`user_key`, `form_id`, `group_key`, `title`, `formSchema`, `created_on`) VALUES
(10000008, 1, '8,9', 'slknfnsf', '[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Subscribe form\",\"className\":\"text-center\"},{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"subscribe for more\"},{\"type\":\"text\",\"required\":false,\"label\":\"first name\",\"placeholder\":\"Enter your first name\",\"className\":\"form-control\",\"name\":\"fname\",\"subtype\":\"text\"},{\"type\":\"text\",\"subtype\":\"email\",\"required\":true,\"label\":\"Email\",\"placeholder\":\"Enter your email\",\"className\":\"form-control\",\"name\":\"email\"},{\"type\":\"button\",\"subtype\":\"submit\",\"label\":\"Subscribe\",\"className\":\"btn-success btn form-control\",\"name\":\"button\",\"style\":\"success\"}]', 'Wed, 13 Jul 2022 14:58:21 GMT'),
(10000008, 4, '9', 'hello sk', '[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Subscribe form\",\"className\":\"text-center\"},{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"subscribe for more\"},{\"type\":\"text\",\"subtype\":\"email\",\"required\":true,\"label\":\"Email\",\"placeholder\":\"Enter your email\",\"className\":\"form-control\",\"name\":\"email\"},{\"type\":\"button\",\"subtype\":\"submit\",\"label\":\"Subscribe\",\"className\":\"btn-success btn form-control\",\"name\":\"button\",\"style\":\"success\"}]', 'Thu, 14 Jul 2022 02:42:49 GMT'),
(10000001, 5, '1,2', 'aarju', '[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Subscribe form\",\"className\":\"text-center\"},{\"type\":\"text\",\"required\":false,\"label\":\"first name\",\"placeholder\":\"Enter your first name\",\"className\":\"form-control\",\"name\":\"fname\",\"subtype\":\"text\"},{\"type\":\"number\",\"required\":false,\"label\":\"Mobile no.\",\"placeholder\":\"Enter your mobile number\",\"className\":\"form-control\",\"name\":\"mob_no\"},{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"subscribe for more\"},{\"type\":\"text\",\"subtype\":\"email\",\"required\":true,\"label\":\"Email\",\"placeholder\":\"Enter your email\",\"className\":\"form-control\",\"name\":\"email\"},{\"type\":\"button\",\"subtype\":\"submit\",\"label\":\"Subscribe\",\"className\":\"btn-success btn form-control\",\"name\":\"button\",\"style\":\"success\"}]', 'Thu, 14 Jul 2022 16:58:36 GMT'),
(10000001, 6, '', 'mdc,.vzcx', '', 'Sun, 17 Jul 2022 12:26:42 GMT'),
(10000001, 7, '13', 'mnnbm', '[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Subscribe form\",\"className\":\"text-center\"},{\"type\":\"paragraph\",\"subtype\":\"p\",\"label\":\"subscribe for more\"},{\"type\":\"text\",\"required\":false,\"label\":\"first name\",\"placeholder\":\"Enter your first name\",\"className\":\"form-control\",\"name\":\"fname\",\"subtype\":\"text\"},{\"type\":\"text\",\"subtype\":\"email\",\"required\":true,\"label\":\"Email\",\"placeholder\":\"Enter your email\",\"className\":\"form-control\",\"name\":\"email\"},{\"type\":\"button\",\"subtype\":\"submit\",\"label\":\"Subscribe\",\"className\":\"btn-success btn form-control\",\"name\":\"button\",\"style\":\"success\"}]', 'Sun, 17 Jul 2022 13:41:42 GMT');

-- --------------------------------------------------------

--
-- Table structure for table `form_response`
--

CREATE TABLE `form_response` (
  `form_id` int(11) NOT NULL,
  `user_key` int(11) NOT NULL,
  `response_id` int(11) NOT NULL,
  `group_id` varchar(50) NOT NULL,
  `Fname` varchar(10) DEFAULT NULL,
  `Lname` varchar(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Mobno` bigint(20) DEFAULT NULL,
  `Company` varchar(50) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `State` varchar(20) DEFAULT NULL,
  `ZIP` int(6) DEFAULT NULL,
  `Country` varchar(20) DEFAULT NULL,
  `response_time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `form_response`
--

INSERT INTO `form_response` (`form_id`, `user_key`, `response_id`, `group_id`, `Fname`, `Lname`, `Email`, `Mobno`, `Company`, `City`, `State`, `ZIP`, `Country`, `response_time`) VALUES
(1, 10000008, 2, '8', 'sagar', NULL, 'sagarnanera30@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-14'),
(1, 10000008, 3, '8', 'sagar', NULL, 'sagarnanera30@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-14'),
(1, 10000008, 4, '8,9', 'sagar', NULL, 'sagarnanera3012@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-14'),
(1, 10000008, 5, '8,9', 'sagar', NULL, 'sagarnanera1230@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-14'),
(5, 10000001, 6, '1,2', 'xyz', NULL, 'chavdarohan311@gmail.com', 8787878787, NULL, NULL, NULL, NULL, NULL, '2022-07-14'),
(7, 10000001, 7, '13', 'aman', NULL, 'aarjupatel922003@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-07-17');

--
-- Triggers `form_response`
--
DELIMITER $$
CREATE TRIGGER `subs_trigger` AFTER INSERT ON `form_response` FOR EACH ROW INSERT INTO subscriber_of_users VALUES (null,new.user_key,new.group_id,new.Fname,new.Lname,new.Email,new.Mobno,now())
$$
DELIMITER ;

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
(10000001, 6, 'sagar', '2022-06-23 05:53:05'),
(10000008, 8, 'hey', '2022-07-13 20:57:32'),
(10000008, 9, 'xyz', '2022-07-13 21:01:56'),
(10000001, 10, 'test', '2022-07-17 06:56:50'),
(10000001, 11, 'test1', '2022-07-17 06:57:00'),
(10000001, 12, 'test2', '2022-07-17 06:57:06'),
(10000001, 13, 'test3', '2022-07-17 06:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber_of_users`
--

CREATE TABLE `subscriber_of_users` (
  `subscriber_key` bigint(20) NOT NULL,
  `user_key` int(11) NOT NULL,
  `group_key` varchar(30) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phonenumber` bigint(11) DEFAULT NULL,
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
(20, 10000001, '5,6', 'sagar', 'Patel', 'sagarrjuboda@gmail.com', 6353884460, '2022-06-23 05:53:51'),
(21, 10000008, '8', 'sagar', NULL, 'sagarnanera30@gmail.com', NULL, '2022-07-13 21:00:27'),
(22, 10000008, '8', 'sagar', NULL, 'sagarnanera30@gmail.com', NULL, '2022-07-13 21:00:52'),
(23, 10000008, '8,9', 'sagar', NULL, 'sagarnanera3012@gmail.com', NULL, '2022-07-13 21:11:19'),
(24, 10000008, '8,9', 'sagar', NULL, 'sagarnanera1230@gmail.com', NULL, '2022-07-13 21:12:00'),
(25, 10000001, '1,2', 'xyz', NULL, 'chavdarohan311@gmail.com', 8787878787, '2022-07-14 11:30:21'),
(26, 10000001, '13', 'aman', NULL, 'aarjupatel922003@gmail.com', NULL, '2022-07-17 08:12:33'),
(27, 10000001, '1', 'zfxvzdf', 'bxgbxf', 'xdbgxb', 989898989, '2022-07-17 08:13:18');

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
('Aarju', 'Patel', 'kjnnm,', 'mmmtravelagency3111@gmail.com', 6353884460, 10000007, '$2a$08$ihhnzwP.iQ7Jxg1argmKIOjol3VoaQvGQrydUJy7jKxI8s4lKbtlW'),
('sagar', 'nanera', 'sk pvt ltd', 'sagarnanera30@gmail.com', 8758234096, 10000008, '$2a$08$AhWV6OnlD0yJxKNfNf3Qxe8nuWJ7ceZnGUrKBzPsgY7Xy4hoJJxFe');

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
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`);

--
-- Indexes for table `form_response`
--
ALTER TABLE `form_response`
  ADD PRIMARY KEY (`response_id`);

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
  MODIFY `campaign_key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `form_response`
--
ALTER TABLE `form_response`
  MODIFY `response_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `group_details`
--
ALTER TABLE `group_details`
  MODIFY `group_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `subscriber_of_users`
--
ALTER TABLE `subscriber_of_users`
  MODIFY `subscriber_key` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users_details`
--
ALTER TABLE `users_details`
  MODIFY `user_key` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10000009;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
