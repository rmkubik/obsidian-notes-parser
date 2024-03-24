CREATE TABLE `games` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`filePath` text NOT NULL,
	`rating` text,
	`status` text,
	`tags` text,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `links` (
	`fromPath` text NOT NULL,
	`toPath` text NOT NULL,
	PRIMARY KEY(`fromPath`, `toPath`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `games_filePath_unique` ON `games` (`filePath`);