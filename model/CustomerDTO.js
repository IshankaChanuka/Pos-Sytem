function CustomerDTO(id,name,address,number) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __number=number;

    this.getCustomerID=function () {
        return __id;
    }
    this.setCustomerID=function (idPara) {
        __id=idPara;
    }
    this.getCustomerName=function () {
        return __name;
    }
    this.setCustomerName=function (namePara) {
        __name=namePara;
    }
    this.getCustomerAddress=function () {
        return __address;
    }
    this.setCustomerAddress=function (addressPara) {
        __address=addressPara;
    }
    this.getCustomerNumber=function () {
        return __number;
    }
    this.setCustomeNumber=function (numberPara) {
        __number=numberPara;
    }
}



