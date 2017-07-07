/* Create initial table */
CREATE TABLE "koalas" (
	"id" serial primary key,
	"name" varchar(40) not null,
	"gender" varchar(40) not null,
	"age" integer,
	"ready_for_transfer" varchar(10) not null,
	"notes" varchar(120) not null
);

/* Copy & paste koalaHolla.tsv file
-- But this causes a bug where it tries to insert a new koala at index 1 --
If you keep adding until error message increments to index 7, it will start
correctly adding koalas at that point w/o error messages. */
