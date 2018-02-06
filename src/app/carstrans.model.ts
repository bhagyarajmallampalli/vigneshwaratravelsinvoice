export class CarTrans {
 constructor(
   public deptID: number,
	public vehicleNumber: string,
	public guestName: string,
	public startKM: number,
	public endKM: number,
	public dutySlipNo: number,
	public transDate: string,
	public totalKMs: number,
	public fuelCharges: number,
	public fixedRent: number,
	public tollGateCharge: number,
	public driverBatta: number,
	public totalAmount: number,
	public startTime: string,
	public endTime: string,
	public totalHours: string,
	public journey: string,
	public customerName: string,
	public costOfFuelPerLtr: number,
	public guestPhoneNo: number
 ){ }
}