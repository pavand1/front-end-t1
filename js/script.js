$(function(){
	var model = new TaskModel(),
	vew = new TaskView(),
	controller =new TaskController();
});


var Event = function(sender){
	this._sender = sender;
	this._listeners = [];
}
Event.prototype = {
	attach: function(listener){
		this._listeners.push(listener);
	},
	notify: function(arguments){
		for (var i = this._listeners.length - 1; i >= 0; i--) {
			this._listeners[i](this._sender, arguments)
		}
	}
}


var TaskModel = function(){
	this.tasks = [];
	this.selectedTasks = [];
	this.addTaskEvent = new Event(this);
	this.removeTaskEvent = new Event(this);
	this.setTaskAsCompletedTask = new Event(this);
	this.deleteTaskEvent = new Event(this);
};
TaskModel.prototype = {
	addTask: function(task){
		this.tasks.push({
			taskName: task,
			taskStatus: 'uncompleted'
		});
	},
	getTask: function(){
		return this.tasks;
	},
	setSelectedTask: function(taskIndex){
		this.selectedTasks.push(taskIndex);
	},
	unselectdTask: function(taskIndex){
		return this.selectedTasks.splice(taskIndex, 1);
	},
	setTaskAsCompleted: function(){
		var selectedTasks = this.selectedTasks;
		for(var index in selectedTasks) {
			this.tasks[selectedTasks[index]].taskStatus = 'completed';
		}
		this.setTaskAsCompletedTask.notify();
		this.selectedTasks = [];
	},
	deletedTasks: function(){
		var selectedTasks =this.selectedTasks.sort();
		for (var i = 0; i < selectedTasks.length-1; i>=0) {
			this.tasks.splice(this.selectedTasks[i],1);
		}
		this.selectedTasks = [];
		this.deletedTasksEvent.notify();
	}
};







