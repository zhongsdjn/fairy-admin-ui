// pnpm install dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_FORMAQT = "YYYY-MM-DD HH:mm:ss";

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAQT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
