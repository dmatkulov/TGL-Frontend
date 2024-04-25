export interface Warehouse {
  name: string;
  address: string;
  phoneNumber: string;
}
export interface WarehouseResponse {
  message: string;
  warehouses: Warehouse[];
}
