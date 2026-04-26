export class QueryStrings {

  static parse(values?: Record<string, unknown> | null): string {
    if (this.isInvalidInput(values)) {
      return '?';
    }

    const safeValues = values as Record<string, unknown>;
    const params = new URLSearchParams();
    Object.entries(safeValues).forEach(([key, value]) => {
      if (this.isSkippableTopLevelValue(value)) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((val) => this.appendSingle(params, key, val));
      } else {
        this.appendSingle(params, key, value);
      }
    });

    const paramString = params.toString();
    return paramString ? `?${paramString}` : '?';
  }

  static appendSingle(params: URLSearchParams, key: string, value: unknown): void {
    if (this.isSkippableSingleValue(value)) {
      return;
    }

    if (typeof value === 'string') {
      params.append(key, value.trim());
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      params.append(key, String(value));
    } else if (value instanceof Date) {
      params.append(key, value.toISOString());
    } else if (typeof value === 'object') {
      try {
        params.append(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`Could not stringify object for key: ${key}`);
      }
    } else {
      params.append(key, String(value));
    }
  }

  private static isInvalidInput(values?: Record<string, unknown> | null): boolean {
    return !values || typeof values !== 'object';
  }

  private static isSkippableTopLevelValue(value: unknown): boolean {
    return value === null || value === undefined || (Array.isArray(value) && value.length === 0);
  }

  private static isSkippableSingleValue(value: unknown): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    );
  }
}