export class InvoiceData {
 constructor(
     public dutySlipNo: number,
   public customerName: string,
    public vehicleNumber: string,
    public guestName: string,
    public vehicleType: string,
    public guestNumber: number,
    public bookedBy: string,
    public journey: string,
    public hireCharges: number,
    public startKMs: number,
    public dieselCharges: number,
    public endKMs: number,
    public driverAllowances: number,
    public totalKMs: number,
    public tollGate: number,
    public startingTime: string,
    public total: number,
    public endingTime: string,
    public totalHours: string,
    public deptName: string,
    public vehicleMileage: number
 ){ }
}