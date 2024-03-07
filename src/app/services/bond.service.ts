import { Injectable } from '@angular/core';
// import {Member} from "../interfaces/member.interface";
import { ApiService } from './api.service';
import { BondOrder } from '../interfaces/bond-order.interface';

@Injectable()
export class BondService {
    constructor(private api: ApiService) { }

    getBondInfo(bond_type: string) {
        return this.api.getPrivate('bond/' + bond_type);
    }

    //post /api/bond/order
    postBondOrder(bondOrder: BondOrder) {
        return this.api.postPrivate('bond/order', bondOrder);
    }

    ///api/bond/order/{bondOrderId}/updatePayment
    updateBondOrderPayment(bondOrderId: String, bondOrder: BondOrder) {
        return this.api.postPrivate('bond/order/' + bondOrderId + '/updatePayment', bondOrder);
    }

    ///api/bond/order/{bondOrderId}/confirmOrder
    confirmBondOrder(bondOrderId: String) {
        return this.api.postPrivate('bond/order/' + bondOrderId + '/confirmOrder', {});
    }

    ///api/bond/order/{bondOrderId}/confirmOrderWithoutKyc
    confirmBondOrderWithoutKyc(bondOrderId: String) {
        return this.api.postPrivate('bond/order/' + bondOrderId + '/confirmOrderWithoutKyc', {});
    }

    // TODO: will add pagination later
    ///api/bond/order/all get all bond order

    // getAllBondOrder(pageSize: number, pageNum: number) {
    //     pageSize = 10; pageNum = 1;
    //     return this.api.getPrivate('bond/order/all/' + pageSize + '/' + pageNum);
    // }

    ///api/bond/order/all
    // getAllBondOrder() {

    //     return this.api.getPrivate('bond/order/all/');
    // }

    ///api/bond/order/all/{pageSize}/{pageNum}
    getAllBondOrder(pageSize: number, pageNum: number) {
        return this.api.getPrivate('bond/order/all/' + pageSize + '/' + pageNum);
    }

    ///api/bond/order/{bondOrderId}
    getBondOrderById(bondOrderId: String) {
        return this.api.getPrivate('bond/order/' + bondOrderId);
    }

    ///api/bond/order/{bondOrderId}/cancelOrder deletePrivate
    cancelBondOrder(bondOrderId: String) {

        return this.api.deletePrivate('bond/order/' + bondOrderId + '/cancelOrder');
    }

    //api/bond/bondAsset/10/0
    getBondAsset(pageSize: number, pageNum: number) {
        return this.api.getPrivate('bond/bondAsset/' + pageSize + '/' + pageNum);
    }

    //post /api/bond/order/{bondOrderId}/fiatPayment
    fiatPayment(bondOrderId: String, name: String, phoneNumber: String) {
        const data = {
            name: name,
            phoneNumber: phoneNumber
        }
        return this.api.postPrivate('bond/order/' + bondOrderId + '/fiatPayment', data);
    }


    // get /api/bond/asset/temporaryOrderAssetAmount
    // {
    //     "success": true,
    //     "message": "Successfully retrieved temporary asset",
    //     "data": {
    //     "temporaryAsset": {
    //     "DNBtotalPaidAmount": 15000,
    //     "DNBtotalPaidQuantity": 1,
    //     "XDNBtotalPaidAmount": 10000,
    //     "XDNBtotalPaidQuantity": 100
    //         }
    //     }
    // }
    getTemporaryOrderAssetAmount() {
        return this.api.getPrivate('bond/asset/temporaryOrderAssetAmount');
    }


}
