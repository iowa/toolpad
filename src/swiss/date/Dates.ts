import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export class Dates {
  public static readonly _DateFormat = 'DD-MM-YYYY';
  public static readonly _ISO_8601_DateFormat = 'YYYY-MM-DD';

  static of(v: string | Date, inFormat: string, outFormat: string) {
    if (v instanceof Date) {
      return dayjs(v).format(outFormat);
    }
    if (dayjs.isDayjs(v)) {
      return v.format(outFormat);
    }
    dayjs.extend(customParseFormat);
    return dayjs(v, inFormat).format(outFormat);
  }

  static toQueryString(v?: dayjs.Dayjs | string) {
    if (dayjs.isDayjs(v) && v.isValid()) {
      return v.format(Dates._ISO_8601_DateFormat);
    }
    return undefined
  }

}