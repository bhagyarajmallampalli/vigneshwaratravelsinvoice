import { Component, OnInit } from '@angular/core';

import { VehicleService } from '../vehicle-service.service';
import { DeptService } from '../dept-service.service';
import { CustomersService } from '../customers-service.service';
import { CarsTransService } from '../cars-trans.service';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import { CarTrans} from '../carstrans.model';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { AmazingTimePickerService } from 'amazing-time-picker';
import { InvoiceService } from '../invoice.service';
import { InvoiceData } from '../invoice.model';

import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'app-cars-trans',
  templateUrl: './cars-trans.component.html',
  styleUrls: ['./cars-trans.component.css']
})
export class CarsTransComponent implements OnInit {

  
  title = 'Car Transactions';
  vehicle: any;
  vehicles: any[];
  customers: any[];
  depts: any[];
  vehicle_number: string;
  public invoiceNumber: number;
  filteredVechicleSingle: any[];

  public selectedTransDate: string;
  public transDate: Date;
  public startKM: number = 0;
  public endKM: number = 0;
  public totalKM: number;
  public fuelCharges: number = 0;
  public fixedRent: number = 0;
  public tollGateCharges: number = 0;
  public driverBatta: number = 0;
  public totalAmount: number=0;
  carTrans: CarTrans;
  journey: string;
  carImage: string;
  vigneshaImage: string;
  titleImage: string;
  invoiceTitle: string;
  private toasterService: ToasterService;

  public config: ToasterConfig = 
        new ToasterConfig({
            showCloseButton: true, 
            tapToDismiss: false, 
            timeout: 0
        });

  constructor(
    public http: Http, 
    private vehicleservice: VehicleService,
    private deptservice: DeptService, 
    private customerservice: CustomersService, private carsTransService:CarsTransService,
    private messageService: MessageService,
    private atp: AmazingTimePickerService,
    private invoiceService: InvoiceService,
    toasterService: ToasterService
  ) {
    this.transDate = new Date();
    this.vigneshaImage = '/assets/vignesha.png';
    this.carImage = '/assets/car.png';
    this.titleImage = '/assets/travelname.png';
    this.invoiceTitle = '/assets/travelname_prop.png';
    this.toasterService = toasterService;
  }

  configVehicle: any = {'placeholder': 'test', 'sourceField': ['vehicleNumber']};
  configCustomers: any = {'placeholder': 'test', 'sourceField': ['customerName']};
  configDepts: any = {'placeholder': 'test', 'sourceField': ['deptName']};

  hideTransTable: boolean = false;

  ngOnInit() {
    this.getVehicles();
    this.getCustomers();
    this.getDepts();
    this.setInvoiceNumber();
    this.hideTransTable = true;
    this.showInvoiceTable = false;
  }

  setInvoiceNumber()
  {
    this.carsTransService.getInvoiceNumber()
    .subscribe(data => {
      this.invoiceNumber = +data + 1;
    });
  }
  public selectedVehicle: any;
  
  public vehicleNumber: string;
  
  getVehicles() {
    this.vehicleservice.getVehicles()
    .subscribe(data => {
      this.vehicles = data;
     // this.selectedVehicle = this.vehicles[0];
      //this.vehicleSelected(this.vehicles[0]);
      console.log(this.vehicles);
    });
  }

 
  public vehicleSelected(vehicle) {
    this.vehicleNumber = vehicle ? vehicle.vehicleNumber : 'none';
    this.mileageOfVehicle = vehicle ? vehicle.vehicleMileage: 'none';
    console.log("vehicleNumber ::"+this.vehicleNumber);
    if(this.selectedTransDate && this.vehicleNumber){
      this.invoiceService.getInvoiceByDate(this.selectedTransDate, this.vehicleNumber)
      .subscribe(data => {
        console.log("invoice result::"+data);
        this.invoice = data;
        if(data.dutySlipNo === 0){
          this.showError();
        }
        else{
          this.invoice = data;
          this.selectedCustomer = this.invoice.customerName; 
          this.guestPhoneNo = this.invoice.guestNumber;
          //this.deptSelected = this.invoice.deptName;
          this.mainCustomerName = this.invoice.customerName;
          this.invoiceNumber = this.invoice.dutySlipNo;
          this.startKM = this.invoice.startKMs;
          this.endKM = this.invoice.endKMs;
          this.totalKM = this.invoice.totalKMs;
          this.startTime = this.invoice.startingTime;
          this.endTime = this.invoice.endingTime;
          this.totalHours = this.invoice.totalHours;
          this.journey = this.invoice.journey;
          this.mileageOfVehicle = this.invoice.vehicleMileage;
          this.fuelCharges = this.invoice.dieselCharges;
          this.fixedRent = this.invoice.hireCharges;
          this.tollGateCharges = this.invoice.tollGate;
          this.driverBatta = this.invoice.driverAllowances;
          this.totalAmount = this.invoice.total;
        }
      });
    }
  }

  public selectedCustomer: any;
  
  public customerName: string;

  getCustomers() {
    this.customerservice.getCustomers()
      .subscribe(data => {
        this.customers = data;
        //this.selectedCustomer = this.customers[0];
        //this.customerSelected(this.customers[0]);
        console.log(this.customerName);
      });
  }
  
  
  public customerSelected(customer) {
    this.customerName = customer ? customer.customerName : 'none';
   // console.log("customer Name::"+this.customerName);
  }

  
  public selectedDept: any;
  
  public deptID: number;

  getDepts() {
    this.deptservice.getDepts()
      .subscribe(data => {
        this.depts = data;
       // this.selectedDept = this.depts[0];
        //this.deptSelected(this.depts[0]);
       // console.log(this.deptID);
      });
  }

  
  
  public deptSelected(dept) {
    this.deptID = dept ? dept.deptID : 'none';
    //console.log("deptID::"+this.deptID);
  }

  set setTransDate(e){
    e = e.split('-');
    this.selectedTransDate = e[0]+"-"+e[1]+"-"+e[2];
    if(this.selectedTransDate && this.vehicleNumber){
      this.invoiceService.getInvoiceByDate(this.selectedTransDate, this.vehicleNumber)
      .subscribe(data => {
        console.log("invoice result::"+data);
        this.invoice = data;
        if(data.dutySlipNo === 0){
          this.showError();
        }
        else{
          this.invoice = data;
          this.selectedCustomer = this.invoice.customerName; 
        }
      });
    }
}

  calcTotalKM(){
    this.totalKM = +this.endKM - +this.startKM;
  }

  calcFuelCharges()
  {
    this.fuelCharges = Math.round((+this.totalKM/this.mileageOfVehicle)*this.fuelCost);
  }
  calcTotalAmount(){
    this.totalAmount = +this.fuelCharges + +this.fixedRent + +this.tollGateCharges + +this.driverBatta;
  }

  mainCustomerName: string;
  fuelCost: number;
  mileageOfVehicle: number;
  guestPhoneNo: number;
  submitDetails(){
    this.carTrans = {deptID: this.deptID, vehicleNumber: this.vehicleNumber, guestName: this.customerName,
      startKM: this.startKM, endKM: this.endKM, dutySlipNo: this.invoiceNumber, transDate: this.selectedTransDate,
      totalKMs: this.totalKM, fuelCharges: this.fuelCharges, fixedRent: this.fixedRent, tollGateCharge: this.tollGateCharges,
      driverBatta: this.driverBatta, totalAmount: this.totalAmount, startTime: this.startTime, endTime: this.endTime,
    totalHours: this.totalHours, journey: this.journey, customerName: this.mainCustomerName, costOfFuelPerLtr: this.fuelCost, guestPhoneNo: this.guestPhoneNo};
      
      this.carsTransService.insertCarsTrans(this.carTrans)
        .subscribe(
            result => { this.successResult(result) },
            error => { this.showError() }
        );    
  }
  public successResult(data){
    console.log(data);
    if(data.status == "SUCCESS"){
      this.showSuccess();
    }
    else{
      this.showError()
    }
  }
  
  showSuccess() {
    this.toasterService.pop('success', 'Sucess!', 'The data has been successfully saved..');
  }

  showError() {
    this.toasterService.pop('failure', 'Data Error!', 'No records found');
  }

  showWarning() {
    this.toasterService.pop('warning', 'Warning!', 'Please enter valid data..');
  }

  showInfo() {
    this.toasterService.pop('Info', 'Info!', 'Validation failed');
  }
  
  

    startTime: string;
    endTime: string;
    totalHours: string;

    calcTotalHours(){
      console.log(this.startTime);
      //let st = this.startTime.split(':');
      let date1:any = new Date("2017-03-05 "+this.startTime).getHours();
      let date2:any = new Date("2017-03-06 "+this.endTime).getHours();
      let time = date2 - date1;
      let hoursDiff = time ;
      this.totalHours = hoursDiff+ ' hrs';
    }

    public invoice: InvoiceData;
    showInvoiceTable: boolean = false;

    generateInvoice(){
      if(this.selectedTransDate && this.vehicleNumber){
      this.invoiceService.getInvoiceByDate(this.selectedTransDate, this.vehicleNumber)
      .subscribe(data => {
        console.log("invoice result::"+data);
        this.invoice = data;
        if(data.dutySlipNo === 0){
          this.showError();
        }
        else{
        this.showInvoiceTable = true;
        this.hideTransTable = false;
        }
      });
    }
    else{
      this.showWarning();
    }
    }
    showTransTable(){
      this.showInvoiceTable = false;
        this.hideTransTable = true;
    }
    open() {
      const amazingTimePicker = this.atp.open();
      amazingTimePicker.afterClose().subscribe(time => {
        console.log("time::"+time);
      });
    }

    
}