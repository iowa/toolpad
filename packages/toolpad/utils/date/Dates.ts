import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export class Dates {
  public static readonly _DateFormat = 'DD-MM-YYYY';
  public static readonly _ISO_8601_DateFormat = 'YYYY-MM-DD';

  static dayjsFromQueryStringDate(v: string | null): dayjs.Dayjs | null {
    if (v == null) return null
    const parsed = dayjs(v, Dates._ISO_8601_DateFormat, true)
    return parsed.isValid() ? parsed : null
  }

  static toQueryStringDate(v?: dayjs.Dayjs | string | null) {
    if (dayjs.isDayjs(v) && v.isValid()) {
      return v.format(Dates._ISO_8601_DateFormat);
    }
    return null
  }

}