import React, { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
    const price = `$${props.price.toFixed(2)}`;

    const cartContext = useContext(CartContext)

    const addToCartHandler = amount => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount,
            price: props.price
        });
    }
    
    return (
        <li>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    )           
}

export default MealItem;
