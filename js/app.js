// Remember that $ is an alias to jQuery.

// $(function(){}) is like $(document).ready(function(){}).
// Here we have $(function(){}()); 
// the purpose is to ensure your code to run before the DOM is ready
// http://stackoverflow.com/questions/12008843/start-javascript-code-with-function-etc

// the anonymous function (function is always an ojbect) has three objects
// defined: data, octopus, and view 
$(function() {

    // data is an object (like a Python dictionary)
    // data.pizzas is an array of objects (see the addPizza in octopus)
    var data = {
        lastID: 0,
        pizzas: []
    };


    var octopus = {
        addPizza: function() {
            var thisID = ++data.lastID;

	    // pop() and push() are two of array's many methods
	    data.pizzas.push({
                id: thisID,
                visible: true
            });

	    // call object view's render() method
            view.render();
        },

	// pizza is an object with property id
        removePizza: function(pizza) {

	    // remember that data.pizzas is an array
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            clickedPizza.visible = false;
            view.render();
        },

        getVisiblePizzas: function() {

	    // filter() is an method of array
	    // The filter() method creates an array filled with all array
	    // elements that pass a test (provided as a function).
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;
            });

	    // return an array of pizzas that are visible
            return visiblePizzas;
        },

        init: function() {
            view.init();
        }
    };


    var view = {
        init: function() {
            var addPizzaBtn = $('.add-pizza');
            addPizzaBtn.click(function() {
                octopus.addPizza();
            });

            // grab elements and html for using in the render function
	    // this keyword is used in the object view so this is view itself

	    // here we are defining the object view's property $pizzaList and
	    // pizzaTemplate
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            // Delegated event to listen for removal clicks
	    // on() is a jQuery method to attache one or more events handlers for
	    // the selected elements and child elements
	    // '.remove-pizza' is a childSelector
            this.$pizzaList.on('click', '.remove-pizza', function(e) {

		// $() is a selector. $(this) here will be <a> tag
		// jQuery parents() method return all ancestor elements of the
		// selected element. It's parameter is a filter
		// the selected element here is the <a> tag with
		// class="remove-pizza"
		// jQuery data() method attaches data to, or gets data from,
		// selected elements. It's parameter can be (name) if gets data
		// or (name, value) if attaches data
                var pizza = $(this).parents('.pizza').data();
                octopus.removePizza(pizza);
                return false;
            });

            this.render();
        },

	// render visible pizzas
	render: function() {
            // Cache vars for use in forEach() callback (performance)
	    // define $pizzaList as view's $pizzaList property
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear and render
	    // Get the HTML contents of the first element in the set of matched
	    // elements or set the HTML contents of every matched element.
            $pizzaList.html('');

	    // The forEach() method calls a provided function once for each
	    // element in an array, in order.
            octopus.getVisiblePizzas().forEach(function(pizza) {
                // Replace template markers with data
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);

		// Get the HTML contents of the first element in the set of
		// matched elements or set the HTML contents of every matched
		// element.
                $pizzaList.append(thisTemplate);
            });
        }
    };

    octopus.init();
}());
