const express = require("express");
const FruitService = require("./fruit-service");
const CartService = require("./cart-service");
const app = express();

class FruitRoutes {

  /**
   * Setups the routes for fruit related REST api calls
   */ 
  static setup(root) {
    const fruitRouter = express.Router();

    /**
     * TODO-2 - need to expose an api that allows a caller to get a list of all fruits in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @notes remember all methods are @see async on the FruitService
     */ 
     fruitRouter.route('/getAllFruits').get((req, res, next) => {
       FruitService.getAllFruits().then(data=>{
         res.json(data)
       }).catch(err=>{
         next(err);
       });
     });

    /**
     * TODO-3 - need to expose an api that allows a caller to get a specific fruit in the system
     *  @requirements use the @FruitService methods to interact with the fruit inventory
     *  @requirements take consideration when fruit does not exist
     *  @notes remember all methods are @see async on the FruitService
     * 
     */ 

     fruitRouter.route('/getFruit/:name').get((req, res, next) => {
      FruitService.getFruit(req.params.name).then(data=>{
        res.json(data);
      }).catch(err=>{
        next(err);
      });
    });

    fruitRouter.route('/purchase').post((req, res, next) => {
      CartService.purchase(req.body).then(data=>{
        res.json(data);
      }).catch(err=>{
        next(err);
      });
    });

    root.use(fruitRouter);
    
  }
  
}

module.exports = FruitRoutes;
