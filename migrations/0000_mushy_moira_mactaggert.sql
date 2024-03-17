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
CREATE UNIQUE INDEX `games_filePath_unique` ON `games` (`filePath`);