#!/usr/bin/env node
const exec = require('child_process').exec

const db = "database"
const collection = "collection"
const time = new Date()

// Helper function for MongoDB datetime by Object Id
const objectIdFromDate = function(date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
}

// Helper function to set start date [DEFAULT: set to be 1 month]
const getStartDate = function() {
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  month === 0 ? month = 11 : month--
  return new Date(year, month, date)
}

// Helper function to set end date
const getEndDate = function() {
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  return new Date(year, month, date)
}

// Set to/from dates for ObjectId
const toDate = objectIdFromDate(getEndDate(time))
const fromDate = objectIdFromDate(getStartDate(time))

// Mongodump shell variables
const timestamp = new Date().toJSON().slice(0, 10)
const mongodumpPath = "/usr/bin/mongodump"
const backupDir = "/var/backups"
const backupName = collection + '-' +  timestamp
const archivePath = backupDir + '/' + backupName + '.gz'

// Query setup
const query = `'{_id: { $lte: ObjectId("${toDate}"), $gte: ObjectId("${fromDate}")}}'`

// Mongodump command line setup
const mongodump = `${mongodumpPath} -d ${db} -c ${collection} -q ${query} --archive=${archivePath} --gzip`

// Shell execution
let child = exec(mongodump, function(err, stdout, stderr) {
        if (err) {
                console.log(stderr)
        } else {
                console.log(stdout)
        }
})
