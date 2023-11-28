import { createReducer, on } from "@ngrx/store";
import { findProductByIdFailure, findProductByIdSuccess, findProductsByCategoryFailure, findProductsByCategorySuccess } from "./product.action";

const initialState={
    products: [],
    product: null,
    loading: false,
    error: null,
}

export const productReducer = createReducer(
    initialState,
    on(findProductsByCategorySuccess, (state, { payload }) => ({
      ...state,
      products: payload,
      content: payload.content,
      loading: false,
    })),
    on(findProductByIdSuccess, (state, { payload }) => ({
      ...state,
      product: payload,
      loading: false,
    })),
    on(
      findProductsByCategoryFailure,
      findProductByIdFailure,
      (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
      })
    )
  );