var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoActions = module.exports={
	create:function(text){
		AppDispatcher.dispatch({
      		actionType: TodoConstants.TODO_CREATE,
     		text: text
   		});
	}
}

