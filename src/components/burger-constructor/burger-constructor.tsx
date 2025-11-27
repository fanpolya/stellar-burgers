import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  newOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/order-slice';
import { selectisAuthenticated } from '../../services/slices/user-slice';
import {
  clearConstructor,
  selectBun,
  selectConstructorIngredients
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(selectBun) || null;
  const ingredients = useSelector(selectConstructorIngredients) || [];
  const constructorItems = { bun, ingredients };
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectisAuthenticated);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    if (!isAuth) {
      return navigate('/login');
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(newOrder(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
