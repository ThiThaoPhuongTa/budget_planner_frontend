import crc16 from "crc/crc16";
import { Tlv } from "./tlv";
import { Buffer } from "buffer";

export interface Bank {
  fullName: string;
  code: string;
  name: string;
  id: string;
}

export const banks: Bank[] = [
  {
    fullName: "NH TMCP Ngoai Thuong VN",
    code: "VCB",
    name: "VietcomBank",
    id: "970436"
  },
  {
    fullName: "NH TMCP Cong Thuong VN",
    code: "CTG",
    name: "VietinBank",
    id: "970415",
  },
  {
    fullName: "NH TMCP Ky Thuong VN",
    code: "TCB",
    name: "Techcombank",
    id: "970407",
  },
  {
    fullName: "NH TMCP Dau Tu va Phat Trien VN",
    code: "BIDV",
    name: "BIDV",
    id: "970418",
  },
  {
    fullName: "NH Nong Nghiep va Phat Trien Nong Thon Viet Nam",
    code: "VARB",
    name: "AgriBank",
    id: "970405",
  },
  {
    fullName: "Ngan hang Thuong Mai Co Phan Quoc Dan",
    code: "NVB",
    name: "Navibank",
    id: "970419",
  },
  {
    fullName: "NH TMCP Sai Gon Thuong Tin",
    code: "STB",
    name: "Sacombank",
    id: "970403",
  },
  { fullName: "NH TMCP A Chau", code: "ACB", name: "ACB", id: "970416" },
  { fullName: "NH TMCP Quan Doi", code: "MB", name: "MBBank", id: "970422" },
  { fullName: "NH TMCP Tien Phong", code: "TPB", name: "TPBank", id: "970423" },
  {
    fullName: "NH TNHH MTV Shinhan VN",
    code: "SVB",
    name: "Shinhan Bank",
    id: "970424",
  },
  {
    fullName: "NH TMCP Quoc Te VN",
    code: "VIB",
    name: "VIB Bank",
    id: "970441",
  },
  {
    fullName: "NH TMCP Viet Nam Thinh Vuong",
    code: "VPB",
    name: "VPBank",
    id: "970432",
  },
  {
    fullName: "NH TMCP Sai Gon Ha Noi",
    code: "SHB",
    name: "SHB",
    id: "970443",
  },
  {
    fullName: "NH TMCP Xuat Nhap khau VN",
    code: "EIB",
    name: "Eximbank",
    id: "970431",
  },
  {
    fullName: "NH TMCP Bao Viet",
    code: "BVB",
    name: "BaoVietBank",
    id: "970438",
  },
  {
    fullName: "NH TMCP Ban Viet",
    code: "VCCB",
    name: "VietcapitalBank",
    id: "970454",
  },
  { fullName: "NH TMCP Sai Gon", code: "SCB", name: "SCB", id: "970429" },
  {
    fullName: "NH Lien Doanh Viet Nga",
    code: "VRB",
    name: "VietNam - Russia Bank",
    id: "970421",
  },
  { fullName: "NH TMCP An Binh", code: "ABB", name: "ABBank", id: "970425" },
  {
    fullName: "NH TMCP Dai Chung VN",
    code: "PVCB",
    name: "PVCombank",
    id: "970412",
  },
  {
    fullName: "NH TM TNHH MTV Dai Duong",
    code: "OJB",
    name: "OceanBank",
    id: "970414",
  },
  { fullName: "NH TMCP Nam A", code: "NAB", name: "NamA bank", id: "970428" },
  {
    fullName: "NH TMCP Phat Trien TP HCM",
    code: "HDB",
    name: "HDBank",
    id: "970437",
  },
  {
    fullName: "NH TMCP Phat Trien TP HCM",
    code: "HDB",
    name: "HDBank",
    id: "970420",
  },
  {
    fullName: "NH TMCP Viet Nam Thuong Tin",
    code: "VB",
    name: "VietBank",
    id: "970433",
  },
  {
    fullName: "Công ty Tài chính Cổ Phần Tín Việt",
    code: "CFC",
    name: "VietCredit",
    id: "970460",
  },
  {
    fullName: "NH TNHH MTV Public VN",
    code: "PBVN",
    name: "Public bank",
    id: "970439",
  },
  {
    fullName: "NH TNHH MTV Hongleong VN",
    code: "HLB",
    name: "Hongleong Bank",
    id: "970442",
  },
  {
    fullName: "NH TMCP Xang Dau Petrolimex",
    code: "PGB",
    name: "PG Bank",
    id: "970430",
  },
  { fullName: "NH Hop Tac", code: "COB", name: "Co.op Bank", id: "970446" },
  {
    fullName: "NH TNHH MTV CIMB Viet Nam",
    code: "CIMB",
    name: "CIMB",
    id: "422589",
  },
  { fullName: "NH TNHH Indovina", code: "IVB", name: "Indovina", id: "970434" },
  { fullName: "NH TMCP Dong A", code: "DAB", name: "DongABank", id: "970406" },
  {
    fullName: "NH TM TNHH MTV Dau Khi Toan Cau",
    code: "GPB",
    name: "GPBank",
    id: "970408",
  },
  { fullName: "NH TMCP Bac A", code: "NASB", name: "BacABank", id: "970409" },
  { fullName: "NH TMCP Viet A", code: "VAB", name: "VietABank", id: "970427" },
  {
    fullName: "NH TMCP Sai Gon Cong Thuong",
    code: "SGB",
    name: "SaigonBank",
    id: "970400",
  },
  {
    fullName: "NH TMCP Hang Hai VN",
    code: "MSB",
    name: "Maritime Bank",
    id: "970426",
  },
  {
    fullName: "NH TMCP Buu Dien Lien Viet",
    code: "LPB",
    name: "LienVietPostBank",
    id: "970449",
  },
  {
    fullName: "NH TMCP Kien Long",
    code: "KLB",
    name: "KienLongBank",
    id: "970452",
  },
  {
    fullName: "NH Cong Nghiep Han Quoc CN Ha Noi",
    code: "IBKHN",
    name: "IBK - Ha Noi",
    id: "970455",
  },
  {
    fullName: "NH Cong Nghiep Han Quoc CN TP.HCM",
    code: "IBKHCM",
    name: "IBK - TP.HCM",
    id: "970456",
  },
  { fullName: "NH Wooribank", code: "WOO", name: "Woori bank", id: "970457" },
  {
    fullName: "NH TMCP Dong Nam A",
    code: "SEAB",
    name: "SeABank",
    id: "970440",
  },
  {
    fullName: "NH TNHH MTV United Overseas Bank",
    code: "UOB",
    name: "UOB",
    id: "970458",
  },
  { fullName: "NH TMCP Phuong Dong", code: "OCB", name: "OCB", id: "970448" },
];

enum Method {
  DynamicMethod = "11",
  StaticMethod = "12",
}

enum Currency {
  JPY = "392",
  KRW = "410",
  MYR = "458",
  CNY = "156",
  IDR = "360",
  PHP = "608",
  SGD = "702",
  THB = "764",
  VND = "704",
}

enum CountryCode {
  Japan = "JP",
  Korea = "KR",
  Malaysia = "MY",
  China = "CN",
  Indonesia = "ID",
  Philippines = "PH",
  Singapore = "SG",
  Thailand = "TH",
  Vietnam = "VN",
}

enum ServiceCode {
  TransferToCard = "QRIBFTTC",
	TransferToAccount = "QRIBFTTA"
}

const NAPAS = "A000000727";

enum Version {
  V1 = 1
}

interface BankAccount {
  bankId: string;
  bankCode: string;
  accountNumber: string;
}

export const encodeBankAccount = (bankAccount: BankAccount) => {
  return [
    new Tlv(0, bankAccount.bankId),
    new Tlv(1, bankAccount.accountNumber)
  ].join('');
}

class ConsumerAccount {
  constructor(public guid: string, public bankAccount: string, public serviceCode: ServiceCode) {}

  toString() {
    return [
      new Tlv(0, this.guid), 
      new Tlv(1, this.bankAccount), 
      new Tlv(2, this.serviceCode)
    ].join('');
  }
}

export interface BankTransfer {
  bankAccount: BankAccount;
  amount: number, 
  purpose: string
}

export const encodeBankTransfer = (bankTransfer: BankTransfer) =>{
  const version = Version.V1;
  const method = Method.DynamicMethod;
  const consumerAccount = new ConsumerAccount(NAPAS, encodeBankAccount(bankTransfer.bankAccount), ServiceCode.TransferToAccount);
  const currency = Currency.VND;
  const countryCode = CountryCode.Vietnam;
  const payLoad = [
    new Tlv(0, version),
    new Tlv(1, method),
    new Tlv(38, consumerAccount),
    new Tlv(53, currency),
    new Tlv(54, bankTransfer.amount),
    new Tlv(58, countryCode),
    new Tlv(62, new Tlv(8, bankTransfer.purpose)),
  ].join('') + '6304';
  const checkSum = crc16(Buffer.from(payLoad)).toString(16);

  return payLoad + checkSum;
}