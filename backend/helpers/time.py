from datetime import datetime

import pytz


def utcnow_with_utc_timezone():
    return datetime.utcnow().replace(tzinfo=pytz.utc)
