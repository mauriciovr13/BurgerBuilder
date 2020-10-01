import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key]
      })
      .reduce((sum, el) => {
        return el + sum;
      }, 0);

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: oldCount+1
    }
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENTS_PRICE[type]

    this.setState({totalPrice: oldPrice + priceAddition, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: oldCount-1
    }
    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENTS_PRICE[type]

    this.setState({totalPrice: oldPrice - priceDeduction, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }


   render() {
     const disabledInfo = {
       ...this.state.ingredients
     }
     for(let key in disabledInfo) {
       disabledInfo[key] = disabledInfo[key] <= 0
     }
     return (
       <Aux>
         <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients} 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
         </Modal>
         <Burger ingredients={this.state.ingredients}/>
         <BuildControls 
          ingredientAdded={this.addIngredientsHandler} 
          ingredientRemoved={this.removeIngredientsHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
       </Aux>
     )  
   }
}

export default BurgerBuilder;