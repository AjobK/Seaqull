-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 25 okt 2018 om 17:52
-- Serverversie: 10.1.32-MariaDB
-- PHP-versie: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `athena`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `attachments`
--

CREATE TABLE `attachments` (
  `AttachmentId` int(8) NOT NULL,
  `AttachmentDate` date NOT NULL,
  `AttachmentPath` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `posts`
--

CREATE TABLE `posts` (
  `PostId` int(11) NOT NULL,
  `PostCat` enum('C++','C#','C','PHP','HTML','CSS','SASS','Web','Software','Hardware','JS','General','Other') NOT NULL DEFAULT 'Other',
  `PostContent` text NOT NULL,
  `PostCreator` int(11) NOT NULL,
  `PostDate` date NOT NULL,
  `PostThumbnailId` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserDisplayName` varchar(30) NOT NULL,
  `UserEmail` varchar(50) NOT NULL,
  `UserPassword` char(60) NOT NULL,
  `UserStage` enum('1','2','3','4','5','6','7') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`AttachmentId`);

--
-- Indexen voor tabel `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`PostId`),
  ADD KEY `creator` (`PostCreator`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `attachments`
--
ALTER TABLE `attachments`
  MODIFY `AttachmentId` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `posts`
--
ALTER TABLE `posts`
  MODIFY `PostId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `creator` FOREIGN KEY (`PostCreator`) REFERENCES `users` (`UserId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
