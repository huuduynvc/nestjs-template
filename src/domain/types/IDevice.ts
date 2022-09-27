export interface IDevice {
  client: Client;
  os: Os;
  device: Device;
  ip: string;
  agent: string;
}

export interface Client {
  type: string;
  name: string;
  version: string;
}

export interface Os {
  name: string;
  version: string;
  platform: string;
}

export interface Device {
  type: string;
  brand: string;
  model: string;
}
