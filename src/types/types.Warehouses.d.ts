export interface Warehouse {
  _id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface WarehouseMutation {
  name: string;
  address: string;
  phoneNumber: string;
}
export interface WarehouseResponse {
  message: string;
  warehouses: Warehouse[];
}


export interface UpdateWarehouseArg {
  warehouseId: string;
  warehouseMutation: WarehouseMutation;
}
