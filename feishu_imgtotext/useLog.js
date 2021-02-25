const log4js = require('./util/Log4J');
const logger = log4js.getLogger();
const errLog = log4js.getLogger('err');
//打印debug级别的日志信息:
logger.info('req的值是:');
//打印error级别的日志信息:
errLog.error('123213');