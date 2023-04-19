import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Techsupport } from '../modal/techsupport';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  //private baseUrl = "http://69.216.19.140:8080/usit/"; 
  //private baseUrl = "http://localhost:8090/usit/";
  private baseUrl: any = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }

  // for states 
  //register state/ update state
  public addstates(entity: any) {
    return this.http.post(this.baseUrl + "states/save", entity);
  }

  // autocomplete..................

  // autocomplete(){

    
  //   return this.http.get( "https://countriesnow.space/api/v0.1/countries/population/cities")
  // }


  // get state by id
  getstatebyid(id: number) {
    return this.http.get(this.baseUrl + "states/getstate/" + id);
  }
  //used for get the resource
  getAllstates() {
    return this.http.get(this.baseUrl + "states/all");
  }
  public deletestate(id: number) {
    return this.http.delete(this.baseUrl + "states/delete/" + id);
  }

  //register city/ update city
  public addcity(entity: any) {
    return this.http.post(this.baseUrl + "city/save", entity);
  }
  // get city by id
  getcitybyid(id: number) {
    return this.http.get(this.baseUrl + "city/getcity/" + id);
  }
  //used for get the resources
  getAllcities() {
    return this.http.get(this.baseUrl + "city/all");
  }
  // delete city by id
  public deletecity(id: number) {
    return this.http.delete(this.baseUrl + "city/delete/" + id);
  }

  // Pin COde 
  //register/update Zip code
  public addpin(entity: any) {
    return this.http.post(this.baseUrl + "pincode/save", entity);
  }
  // get zip code by id
  getpinbyid(id: number) {
    return this.http.get(this.baseUrl + "pincode/getpincode/" + id);
  }
  //used for get the resource
  getAllpin() {
    return this.http.get(this.baseUrl + "pincode/all");
  }
  // delete pincode
  public deletepin(id: number) {
    return this.http.delete(this.baseUrl + "pincode/delete/" + id);
  }


  // for visa
  //register/update Visa
  public addvisa(entity: any) {
    return this.http.post(this.baseUrl + "visa/save", entity);
  }
  //get visa by id
  getvisabyid(id: number) {
    return this.http.get(this.baseUrl + "visa/getbyid/" + id);
  }
  //fetch visa resource
  getAllvisa() {
    return this.http.get(this.baseUrl + "visa/all");
  }
  // deleting visa by id
  public deletevisa(id: number) {
    return this.http.delete(this.baseUrl + "visa/delete/" + id);
  }

  //  technology service
  //register technology
  public registerTechnology(entity: any) {
    return this.http.post(this.baseUrl + "technology/save", entity);
  }
  //update technology
  public updateTechnology(entity: any) {
    return this.http.put(this.baseUrl + "technology/technologies", entity);
  }
  //used for get the resource
  getAllTechnology() {
    return this.http.get(this.baseUrl + "technology/all");
  }
  //used for get the resource
  getPaginationTechnology(pageno: number) {
    return this.http.get(this.baseUrl + "technology/pagination/" + pageno);
  }
  public deleteTechnology(id: number) {
    return this.http.delete(this.baseUrl + "technology/delete/" + id);
  }
  //used for delete the resource
  changeTechnologyStatus(entity: any) {
    return this.http.patch(this.baseUrl + "technology/status", entity);
  }
  //used for get one resource
  getTechnology(id: number) {
    return this.http.get(this.baseUrl + "technology/getbyid/" + id);
  }
  // end technology

  // tech support service
  //used for create the resource
  registerTechSupport(tech: Techsupport) {
    return this.http.post(this.baseUrl + "techsupp/save", tech);
  }

  updateTechSupport(tech: Techsupport) {
    return this.http.post(this.baseUrl + "techsupp/update", tech);
  }

  //used for get one resource
  getTechsupportById(id: number) {
    return this.http.get(this.baseUrl + "techsupp/edit/" + id);
  }
  getTechSupportList() {
    //let search = "dummysearch";
    // return this.http.get(this.baseUrl+"usit/techsupp/search/"+search);
    return this.http.get(this.baseUrl + "techsupp/all");
  }
  //used for delete the resource
  deleteTechsupport(id: number) {
    return this.http.delete(this.baseUrl + "techsupp/delete/" + id);
  }
  //used for change the resource
  changeTechSupportStatus(vendor: Techsupport) {
    return this.http.patch(this.baseUrl + "techsupp/status", vendor);
  }
  public getSkilldata(id:number){
    return this.http.get(this.baseUrl + "technology/getskillsbyid/" + id);
  }
  // supporting drop down methods
  getcitydetails() {
    return this.http.get(this.baseUrl + "city/city");
  }
  getpindetails() {
    return this.http.get(this.baseUrl + "pincode/pincode");
  }
  getstatedetails() {
    return this.http.get(this.baseUrl + "states/states");
  }
  public gettechnicalskills() {
    return this.http.get(this.baseUrl + "technology/tech");
  }

  // Qualification Master

   //register Qualification
   public addQualification(entity: any) {
    return this.http.post(this.baseUrl + "qualification/saveQualification", entity);
  }
  //update Qualification
  public updateQualification(entity: any) {
    return this.http.put(this.baseUrl + "technology/technologies", entity);
  }
  //used for get the resource
  getAllQualification() {
    return this.http.get(this.baseUrl + "qualification/all");
  }

    //used for get the resource
    getQualificationById(id:number) {
      return this.http.get(this.baseUrl + "qualification/getQualificationById/"+id);
    }

   //used for get the resource
   deleteQualification(id:number) {
    return this.http.delete(this.baseUrl + "qualification/delete/"+id);
  }

  //register vms
  // public updateEntity(entity: any) {
  //   return this.http.put(this.baseUrl + "users/update", entity);
  // }

  // getRoles() {
  //   return this.http.get(this.baseUrl + "users/getroles");
  // }
  //used for delete the resource
  // changeStatus(entity: any) {
  //   return this.http.patch(this.baseUrl + "users/status", entity);
  // }

  //used for get one resource
  // getEntity(id: number) {
  //   return this.http.get(this.baseUrl + "users/userbyid/" + id);
  // }
  public calingemail() {
    return this.http.get(this.baseUrl + "mail/mail");
  }

}
