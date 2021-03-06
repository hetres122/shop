import {Injectable} from '@angular/core';
import IBasket, {Basket, IProductInformation} from "../../../shared/models/IBasket";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor() {
  }

  private _basketElements: Basket = [];

  get basketElements(): Basket {
    return this._basketElements;
  }

  private getItemIndex(itemId: string): number {
    return this._basketElements.findIndex((item: IProductInformation) => item._id === itemId);
  }

  addToBasket(newItem: IProductInformation): void {
    const isUnique: boolean = this._basketElements.every((item: IProductInformation) => item._id !== newItem._id);
    console.log({isUnique});
    if (isUnique) {
      this._basketElements.push(newItem);
    } else {
      const itemIndex: number = this.getItemIndex(newItem._id);

      if (this._basketElements[itemIndex].amount >= 5) {
        this._basketElements[itemIndex].amount = 5
      } else {
        const sum = this._basketElements[itemIndex].amount += newItem.amount;

        (sum >= 5)
          ? this._basketElements[itemIndex].amount = 5
          : this._basketElements[itemIndex].amount += newItem.amount;
      }
    }
    console.log({basket: this._basketElements});
  }

  removeFromBasket(itemId: string): void {
    const itemIndex: number = this.getItemIndex(itemId);
    this._basketElements.splice(itemIndex, 1);
  }

  setItemAmount(itemId: string, amount: number): void {
    const itemIndex: number = this.getItemIndex(itemId);
    this._basketElements[itemIndex].amount = amount;
  }

  increaseTheAmount(itemId: string): void {
    const itemIndex: number = this.getItemIndex(itemId);

    (this._basketElements[itemIndex].amount >= 5)
      ? this._basketElements[itemIndex].amount = 5
      : this._basketElements[itemIndex].amount++;
  }

  decreaseTheAmount(itemId: string): void {
    const itemIndex: number = this.getItemIndex(itemId);

    (this._basketElements[itemIndex].amount <= 1)
      ? this._basketElements[itemIndex].amount = 1
      : this._basketElements[itemIndex].amount--;
  }
}
