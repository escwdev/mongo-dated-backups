# mongo-date-backups

This is a small Node.js shell script for backing up MongoDB databases and collections based on the timestamps from ObjectId. The script uses the child_process module to conduct a bash shell mongodump command with helper functions to deal with any complexity around datetime. This was made and tested with Node.js 8.x and Linux's bash.

The script uses mongodump's archive and gzip options so the result is a .gz archive file. It works well as a regularly scheduled cronjob for archiving between specific dates (i.e. monthly backups). By default it is set for monthly but can be adjusted based on the getStartDate() helper function.

## Getting Started

Clone the repository and make alter the mongo_backup.js file to make use of your Database/Collection that you would like to backup. The backup location is by default /var/backups but can be changed accordingly. 

## Running the Script

To run the script simply execute it in bash, from the script's path, with nodejs prefix:

`nodejs mongo_backup.js`

## Future Considerations

Depending on use and demand, the script may be expanded to have more dynamic datetime selection (i.e. as options during execution) as well as different mongodump options instead of solely using archive/gzip.

Feel free to provide suggestions as well.