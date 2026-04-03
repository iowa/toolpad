import { QueryStrings } from "@/swiss/url/QueryStrings";

export class Urls {

  public toQueryString(values?: Record<string, unknown> | null): string {
    return QueryStrings.parse(values)
  }

}
