import { DtMoneyDataSource } from "./typeorm/dt-money/data-source";

export const connect = async () => {
  try {
    console.info("[DATABASE] Connecting...");

    await Promise.all([DtMoneyDataSource.initialize()]);

    console.info("[DATABASE] Connected.");
  } catch (error) {
    console.error("[DATABASE] Conection error.", error);

    throw error;
  }
};
