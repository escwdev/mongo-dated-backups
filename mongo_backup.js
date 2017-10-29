#!/usr/bin/env node
const exec = require('child_process').exec

const db = "database"
const collection = "collection"
const time = new Date()

// Helper function for MongoDB datetime by Object Id
const objectIdFromDate = function(date) {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000"
}

// Helper function to set start date
const getStartDate = function() {
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  if (month === 0) {
    month = 12
  } else {
    month--
  }
  return new Date(year, month, date)
}

// Helper function to set end date
const getEndDate = function() {
  let year = time.getFullYear()
  let month = time.getMonth()
  let date = time.getDate()
  return new Date(year, month, date)
}

// const fromDate = Math.floor(new Date(new Date().getTime() - 1000 * 60 * 60 * 24) / 1000).toString(16) + '0000000000000000'
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
const mongodump = `${mongodumpPath} -d ${db} -c ${collection} -q ${query} --archive=${archivePath} --gzip`

let child = exec(mongodump, function(err, stdout, stderr) {
        if (err) {
                console.log(stderr)
        } else {
                console.log(stdout)
        }
})
