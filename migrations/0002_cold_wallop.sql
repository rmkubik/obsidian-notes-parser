CREATE TABLE `reads` (
	`bookId` integer,
	`content` text,
	`date` integer,
	FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE no action
);
