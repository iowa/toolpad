import type { getDC, getMockDC } from "@/lib/db/dm";

export type ProdDrizzleClient = ReturnType<typeof getDC>;
export type MockDrizzleClient = ReturnType<typeof getMockDC>;
export type DrizzleClient = ProdDrizzleClient | MockDrizzleClient;
