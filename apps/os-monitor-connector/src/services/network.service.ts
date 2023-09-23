import os from "node:os";
import { NetworkInterfaceInfo } from "os";

async function getNetwork(): Promise<NodeJS.Dict<os.NetworkInterfaceInfo[]>> {
  return os.networkInterfaces();
}

async function getSpecificNetwork(
  networkName: string,
): Promise<NetworkInterfaceInfo[]> {
  try {
    const networkInterfaces = os.networkInterfaces();
    const specificNetwork = networkInterfaces[networkName];

    if (!specificNetwork) {
      throw new Error(
        `Network ${networkName} could not be found on the machine.`,
      );
    }

    return specificNetwork;
  } catch (e) {
    throw e;
  }
}

export default {
  getNetwork,
  getSpecificNetwork,
};
