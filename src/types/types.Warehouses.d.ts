export interface Warehouse {
  name: string;
  address: string;
  phoneNumber: string;
}
export interface WarehouseResponse {
  warehouses: Warehouse[];
}
