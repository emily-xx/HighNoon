(function(){
    angular.module('highnoon', []);

    angular.module('highnoon').controller('IndexController', ['$timeout', 'Tardis', function($timeout, Tardis) {
        var vm = this;

        vm.whereIsHighNoon = '';

        var audioTag = document.querySelector('#highnoonSound');

        function whereIsHighNoon() {
            var origWhereIsHighNoon = vm.whereIsHighNoon.toString();
            vm.whereIsHighNoon = '';

            var highNoonCities = Tardis.whereIsHighNoon();
            highNoonCities.forEach(function(highNoonCity, i) {
                vm.whereIsHighNoon += (highNoonCity + ((i !== highNoonCities.length-1) ? ', ' : '.'));
            });

            if (vm.whereIsHighNoon !== origWhereIsHighNoon) {
                audioTag.currentTime = 0;
                audioTag.play();
            }
        }

        whereIsHighNoon();

        var pollHighnoon = function(){
            $timeout(function () {
                whereIsHighNoon();
                pollHighnoon();
            }, 3000);
        };

        pollHighnoon();
    }]);
}());
