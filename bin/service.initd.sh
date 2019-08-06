#! /bin/bash
#
# divorce-prototype
#
# chkconfig: 345 85 15
# description: Runs the divorce-prototype node js app
#

export NODE_PATH="/opt/divorce/prototype"
APP_NAME="divorce-prototype"

APPLICATION_PATH="$NODE_PATH/server.js"
PIDFILE="/var/run/${APP_NAME}.pid"
LOG="/var/log/${APP_NAME}.log"
MIN_UPTIME="5000"
SPIN_SLEEP_TIME="2000"
USER="$(stat -c "%U" $NODE_PATH)"
FOREVER="$NODE_PATH/node_modules/.bin/forever"

rc=0

start() {

  touch $PIDFILE
  chown $USER $PIDFILE

  touch $LOG
  chown $USER $LOG
  chmod a+r $LOG

  su $USER -c "$FOREVER \
    --pidFile $PIDFILE \
    -a \
    -l $LOG \
    --minUptime $MIN_UPTIME \
    --spinSleepTime $SPIN_SLEEP_TIME \
    start $APPLICATION_PATH"
  rc=$?

}

stop() {

  NPID=$( cat $PIDFILE )
  su $USER -c "$FOREVER stop $NPID"
  rc=$?

}

case "$1" in
start)
  start
  ;;
stop)
  stop
  ;;
restart)
  stop
  start
  ;;
status)
  if [ -f $PIDFILE ]; then
    PID=`cat $PIDFILE`
    if [ -z "`ps axf | grep ${PID} | grep -v grep`" ]; then
      printf "%s\n" "$0 Process dead but pidfile exists"
      exit 1
    else
      printf "%s\n" "$0 Running, process $PID"
    fi
  else
    printf "%s\n" "$0 Dead"
    exit 3
  fi
  ;;
*)
  echo "Usage: $0 {start|stop}"
  ;;
esac

exit $rc
