import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  if (statusCode !== 500) {
    res.json({ message: err.message, error: true });
  }else{
    log('ERROR', err);
  }
}

type LogLevel = 'ERROR'|'WARNING'|'INFO'

function log(level: LogLevel, err: any) {
  let today: Date = new Date();
  let _dateString = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
	let _timeString = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  fs.open(path.join(__dirname, 'errors.log'), 'a', (_err, _fileDescriptor) => {
    if (!_err && _fileDescriptor) {
      // Append to file and close it
      fs.appendFile(
        _fileDescriptor, 
        `[${_dateString} ${_timeString}] [${level}] ${err?.stack}\n`, 
        (_err) => {

        if (! _err) {
          fs.close(_fileDescriptor, (_err) => {
            if (! _err) {
              return true;
            } else {
              return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');
            }
          });
        } else {
          return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
        }

      });
    } else {
      return console.log('\x1b[31m%s\x1b[0m', 'Error cloudn\'t open the log file for appending');
    }
  });
}

export default { notFound, errorHandler };