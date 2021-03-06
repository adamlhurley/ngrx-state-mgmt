import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
  LoadShoppingAction,
  ShoppingActionTypes,
  LoadShoppingSuccessAction,
  LoadShoppingFailureAction,
  AddItemAction,
  AddItemSuccessAction,
  AddItemFailureAction,
  DeleteItemAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
  EditItemAction,
  EditItemSuccessAction,
  EditItemFailureAction
} from '../actions/shopping.actions';
import { of } from 'rxjs';
import { ShoppingService } from 'src/app/shopping.service';

@Injectable()
export class ShoppingEffects {
  @Effect()
  loadShopping$ = this.actions$.pipe(
    ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
    mergeMap(() =>
      this.shoppingService.getShoppingItems().pipe(
        map(data => {
          return new LoadShoppingSuccessAction(data);
        }),
        catchError(error => of(new LoadShoppingFailureAction(error)))
      )
    )
  );

  @Effect()
  addShoppingItem$ = this.actions$.pipe(
    ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
    mergeMap(data =>
      this.shoppingService
        .addShoppingItems(data.payload)
        .pipe(
          map(() => new AddItemSuccessAction(data.payload)),
          catchError(error => of(new AddItemFailureAction(error)))
        )
    )
  );

  @Effect()
  deleteShoppingItem$ = this.actions$.pipe(
    ofType<DeleteItemAction>(ShoppingActionTypes.DELETE_ITEM),
    mergeMap(data =>
      this.shoppingService
        .deleteShoppingItems(data.payload)
        .pipe(
          map(() => new DeleteItemSuccessAction(data.payload)),
          catchError(error => of(new DeleteItemFailureAction(error)))
        )
    )
  );

  

  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {}
}
